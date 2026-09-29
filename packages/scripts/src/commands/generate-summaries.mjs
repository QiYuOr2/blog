import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import OpenAI from "openai";
import { parseArgs, parsePositiveInt } from "../lib/args.mjs";
import { mapLimit } from "../lib/async.mjs";
import { loadRepoEnv } from "../lib/env.mjs";
import { listFiles } from "../lib/fs.mjs";
import { info } from "../lib/log.mjs";
import { postsDir } from "../lib/paths.mjs";

const CONCURRENCY = 3;
const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-v4-flash";
const POST_EXTENSIONS = [".md", ".mdx"];

const SYSTEM_PROMPT =
  "你是中文技术博客的摘要助手。请用 2~4 句话概括文章的核心内容与结论，语言简洁、客观，不要复述标题，不要使用 Markdown 列表或标题，直接输出纯文本摘要。";

function toPostId(file) {
  const rel = path.relative(postsDir, file);
  return rel.replace(/\.(md|mdx)$/i, "").split(path.sep).join("/");
}

function createClient() {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "AI_API_KEY 未设置，请写入仓库根目录 .env.local（模板见 .env.example）。",
    );
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.AI_BASE_URL || DEFAULT_BASE_URL,
    timeout: 120000,
    maxRetries: 2,
  });
}

async function summarize(client, model, content) {
  const res = await client.chat.completions.create({
    model,
    temperature: 0.3,
    max_tokens: 600,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content },
    ],
  });

  const text = res.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("模型返回了空摘要");
  }
  return text;
}

async function processFile(file, { client, model, force, dryRun }) {
  const raw = await fs.readFile(file, "utf-8");
  const parsed = matter(raw);
  const id = toPostId(file);

  if (!force && typeof parsed.data.summary === "string" && parsed.data.summary.trim()) {
    return { id, status: "skipped" };
  }

  const summary = await summarize(client, model, parsed.content);
  if (dryRun) {
    return { id, status: "dry-run", summary };
  }

  const output = matter.stringify(parsed.content, { ...parsed.data, summary });
  await fs.writeFile(file, output, "utf-8");
  return { id, status: "updated" };
}

function report(results) {
  const counts = { updated: 0, skipped: 0, dryRun: 0, error: 0 };

  for (const result of results) {
    if (result.status === "updated") {
      counts.updated += 1;
      info(`✔ ${result.id}`);
    } else if (result.status === "skipped") {
      counts.skipped += 1;
      info(`- ${result.id} (已有 summary，跳过)`);
    } else if (result.status === "dry-run") {
      counts.dryRun += 1;
      info(`? ${result.id}\n  ${result.summary}`);
    } else {
      counts.error += 1;
      info(`✘ ${result.id}: ${result.error}`);
    }
  }

  info(
    `\n完成：更新 ${counts.updated}，跳过 ${counts.skipped}，dry-run ${counts.dryRun}，失败 ${counts.error}`,
  );
  if (counts.error > 0) {
    process.exitCode = 1;
  }
}

async function run(argv) {
  // 读取仓库根目录的 .env.local / .env，让脚本能直接拿到 AI_API_KEY 等配置。
  loadRepoEnv();

  const { flags, options } = parseArgs(argv);
  const force = flags.has("force");
  const dryRun = flags.has("dry-run");
  const limit = parsePositiveInt(options.get("limit"));

  const files = (await listFiles(postsDir, POST_EXTENSIONS)).sort();
  const targets = limit ? files.slice(0, limit) : files;

  if (targets.length === 0) {
    info("未找到可处理的文章。");
    return;
  }

  const client = createClient();
  const model = process.env.AI_MODEL || DEFAULT_MODEL;
  const mode = dryRun ? "dry-run" : force ? "force" : "incremental";

  info(
    `共 ${targets.length} 篇文章，model=${model}，mode=${mode}，concurrency=${CONCURRENCY}`,
  );

  const results = await mapLimit(targets, CONCURRENCY, (file) =>
    processFile(file, { client, model, force, dryRun }).catch((err) => ({
      id: toPostId(file),
      status: "error",
      error: err?.message || String(err),
    })),
  );

  report(results);
}

export default {
  name: "generate-summaries",
  describe: "用 AI 为缺少 summary 的文章生成摘要（frontmatter 回写）",
  usage: "[--force] [--dry-run] [--limit N]",
  run,
};
