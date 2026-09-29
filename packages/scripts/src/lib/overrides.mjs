import path from "node:path";
import { readJson } from "./json.mjs";
import { overridesDir } from "./paths.mjs";

/**
 * 覆盖表文件路径：`overrides/<segments...>`。
 */
export function overrideTableFile(...segments) {
  return path.join(overridesDir, ...segments);
}

/**
 * 读取覆盖表。表不存在时返回空对象，格式错误则抛出——覆盖表写坏了要立刻发现。
 */
export async function loadOverrideTable(file) {
  return (await readJson(file, { fallback: {} })) ?? {};
}

/**
 * 递归替换书名：覆盖表按 bookId 索引，命中任意层级的书籍对象
 * （书架条目、阅读榜单里的 book 都算）。
 */
export function applyTitleOverrides(value, table) {
  if (Array.isArray(value)) {
    for (const item of value) applyTitleOverrides(item, table);
    return;
  }
  if (!value || typeof value !== "object") return;

  if (value.bookId && table[value.bookId]) {
    value.title = table[value.bookId];
  }
  for (const key of Object.keys(value)) {
    applyTitleOverrides(value[key], table);
  }
}

/** 套用分类覆盖表（分类只由书架条目承载）。 */
export function applyCategoryOverrides(books, table) {
  for (const book of books) {
    const override = book?.bookId ? table[book.bookId] : undefined;
    if (override) {
      book.category = override;
    }
  }
}
