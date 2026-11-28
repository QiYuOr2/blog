import fs from "node:fs/promises";
import path from "node:path";

/**
 * 读取 JSON 文件；文件不存在时返回 fallback（默认 undefined）。
 * 其它错误（如格式错误）照常抛出，避免把问题静默吞掉。
 */
export async function readJson(file, { fallback } = {}) {
  try {
    return JSON.parse(await fs.readFile(file, "utf-8"));
  } catch (err) {
    if (err.code === "ENOENT") {
      return fallback;
    }
    throw err;
  }
}

/**
 * 写入 JSON：2 空格缩进、行尾不带换行，与历史产物格式保持一致，
 * 避免自动同步提交里出现无意义的格式 diff。目录不存在时自动创建。
 */
export async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

function stripVolatileKeys(value, volatileKeys) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const copy = { ...value };
  for (const key of volatileKeys) {
    delete copy[key];
  }
  return copy;
}

/**
 * 仅在业务内容发生变化时写入 JSON（对比时忽略 updatedAt 等易变顶层字段）。
 * 内容一致时保留原文件与旧时间戳，避免每日同步触发无意义的 git commit 与站点重建。
 */
export async function writeJsonIfChanged(
  file,
  data,
  { volatileKeys = ["updatedAt"] } = {},
) {
  const existing = await readJson(file, { fallback: undefined });
  if (existing !== undefined) {
    const prevComparable = JSON.stringify(stripVolatileKeys(existing, volatileKeys));
    const nextComparable = JSON.stringify(stripVolatileKeys(data, volatileKeys));
    if (prevComparable === nextComparable) {
      return { written: false, reason: "unchanged" };
    }
  }
  await writeJson(file, data);
  return { written: true, reason: existing === undefined ? "created" : "updated" };
}
