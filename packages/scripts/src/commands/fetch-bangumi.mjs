import path from "node:path";
import { parseArgs, parsePositiveInt } from "../lib/args.mjs";
import { sleep } from "../lib/async.mjs";
import { loadRepoEnv } from "../lib/env.mjs";
import { createJsonClient } from "../lib/http.mjs";
import { writeJson } from "../lib/json.mjs";
import { info, task } from "../lib/log.mjs";
import { bangumiDataFile, repoRelative } from "../lib/paths.mjs";

const DEFAULT_USERNAME = "qiyuor2";
const DEFAULT_API_BASE = "https://api.bgm.tv";
const DEFAULT_LIMIT = 50;
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_REQUEST_DELAY_MS = 300;

/** 2 = 动画。 */
const SUBJECT_TYPE = 2;
/** bgm 的收藏类型：1 想看 / 2 看过 / 3 在看 / 4 搁置 / 5 抛弃。 */
const COLLECTION_TYPES = [1, 2, 3, 4, 5];
const USER_AGENT = "Mozilla/5.0 (compatible; qiyuor2-blog-bangumi-cache/1.0)";

/** 环境变量在 shell / .env.local / .env 里都算数，这里统一解析一次。 */
function resolveConfig() {
  return {
    username: process.env.BGM_USERNAME || DEFAULT_USERNAME,
    apiBase: (process.env.BGM_API_BASE || DEFAULT_API_BASE).replace(/\/+$/, ""),
    limit: parsePositiveInt(process.env.BGM_LIMIT) ?? DEFAULT_LIMIT,
    timeoutMs: parsePositiveInt(process.env.BGM_TIMEOUT_MS) ?? DEFAULT_TIMEOUT_MS,
    requestDelayMs:
      parsePositiveInt(process.env.BGM_REQUEST_DELAY_MS) ??
      DEFAULT_REQUEST_DELAY_MS,
  };
}

function collectionUrl(config, type, offset) {
  return (
    `${config.apiBase}/v0/users/${config.username}/collections` +
    `?subject_type=${SUBJECT_TYPE}&type=${type}&offset=${offset}&limit=${config.limit}`
  );
}

async function fetchCollection({ requestJson, config, type }) {
  const items = [];
  let offset = 0;
  let total = 0;

  do {
    const dto = await requestJson(collectionUrl(config, type, offset));
    total = Number(dto.total ?? 0);
    const pageItems = Array.isArray(dto.data) ? dto.data : [];
    items.push(...pageItems);
    offset += config.limit;
    process.stdout.write(
      `type=${type} offset=${offset} loaded=${items.length}/${total}... `,
    );
    if (pageItems.length === 0) break;
    if (items.length < total) await sleep(config.requestDelayMs);
  } while (items.length < total);

  process.stdout.write("done\n");
  return { total, items };
}

async function run(argv) {
  loadRepoEnv();
  const { options } = parseArgs(argv);
  const out = options.get("out");
  const outputFile = out ? path.resolve(process.cwd(), out) : bangumiDataFile;
  const config = resolveConfig();
  const { requestJson } = createJsonClient({
    userAgent: USER_AGENT,
    timeoutMs: config.timeoutMs,
    retryDelayMs: config.requestDelayMs,
  });

  const result = {
    updatedAt: new Date().toISOString(),
    username: config.username,
    subjectType: SUBJECT_TYPE,
    types: {},
  };

  for (const type of COLLECTION_TYPES) {
    const done = task(`Fetching bangumi collection type=${type}`);
    const { total, items } = await fetchCollection({ requestJson, config, type });
    // 保留原始条数，便于前端在回退时继续做分页。
    result.types[String(type)] = { total, items };
    done(`${items.length} items`);
  }

  await writeJson(outputFile, result);
  info(`Saved bangumi data to ${repoRelative(outputFile)}`);
}

export default {
  name: "fetch-bangumi",
  describe: "拉取 Bangumi 动画收藏并写入 content/bangumi",
  usage: "[--out <file>]",
  run,
};
