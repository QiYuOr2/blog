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
