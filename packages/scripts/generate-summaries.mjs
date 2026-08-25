import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import OpenAI from "openai";

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptRoot, "../..");
const postsDir = path.join(repoRoot, "content", "posts");

const CONCURRENCY = 3;
const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-v4-flash";

function loadEnvFile(file) {
  if (typeof process.loadEnvFile === "function" && existsSync(file)) {
    process.loadEnvFile(file);
  }
}

// 读取仓库根目录的 .env.local / .env，让脚本能直接拿到 AI_API_KEY 等配置。
// 优先级：shell 环境变量 > .env.local > .env（loadEnvFile 不会覆盖已存在的变量）。
loadEnvFile(path.join(repoRoot, ".env.local"));
loadEnvFile(path.join(repoRoot, ".env"));

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  const limitIndex = argv.findIndex((arg) => arg === "--limit");
  const limitRaw = limitIndex >= 0 ? argv[limitIndex + 1] : null;
  const limit = limitRaw && Number(limitRaw) > 0 ? Number(limitRaw) : null;

  return {
    force: args.has("--force"),
    dryRun: args.has("--dry-run"),
    limit,
  };
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function toPostId(file) {
  const rel = path.relative(postsDir, file);
  return rel.replace(/\.(md|mdx)$/i, "").split(path.sep).join("/");
}

function createClient() {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error("AI_API_KEY 未设置，请先配置环境变量 AI_API_KEY。");
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
      {
        role: "system",
        content:
          "你是中文技术博客的摘要助手。请用 2~4 句话概括文章的核心内容与结论，语言简洁、客观，不要复述标题，不要使用 Markdown 列表或标题，直接输出纯文本摘要。",
      },
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

  if (!force && typeof parsed.data.summary === "string" && parsed.data.summary.trim()) {
    return { id: toPostId(file), status: "skipped" };
  }

  const summary = await summarize(client, model, parsed.content);
  if (dryRun) {
    return { id: toPostId(file), status: "dry-run", summary };
  }

  const output = matter.stringify(parsed.content, { ...parsed.data, summary });
  await fs.writeFile(file, output, "utf-8");
  return { id: toPostId(file), status: "updated" };
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const { force, dryRun, limit } = parseArgs(process.argv);
  const files = (await walk(postsDir)).sort();
  const targets = limit ? files.slice(0, limit) : files;

  if (targets.length === 0) {
    console.log("未找到可处理的文章。");
    return;
  }

  const client = createClient();
  const model = process.env.AI_MODEL || DEFAULT_MODEL;
  const mode = dryRun ? "dry-run" : force ? "force" : "incremental";

  console.log(
    `共 ${targets.length} 篇文章，model=${model}，mode=${mode}，concurrency=${CONCURRENCY}`,
  );

  const results = await mapLimit(targets, CONCURRENCY, (file) =>
    processFile(file, { client, model, force, dryRun }).catch((err) => ({
      id: toPostId(file),
      status: "error",
      error: err?.message || String(err),
    })),
  );

  const counts = { updated: 0, skipped: 0, dryRun: 0, error: 0 };
  for (const result of results) {
    if (result.status === "updated") {
      counts.updated += 1;
      console.log(`✔ ${result.id}`);
    } else if (result.status === "skipped") {
      counts.skipped += 1;
      console.log(`- ${result.id} (已有 summary，跳过)`);
    } else if (result.status === "dry-run") {
      counts.dryRun += 1;
      console.log(`? ${result.id}\n  ${result.summary}`);
    } else {
      counts.error += 1;
      console.log(`✘ ${result.id}: ${result.error}`);
    }
  }

  console.log(
    `\n完成：更新 ${counts.updated}，跳过 ${counts.skipped}，dry-run ${counts.dryRun}，失败 ${counts.error}`,
  );
  if (counts.error > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
