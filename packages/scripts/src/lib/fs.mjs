import fs from "node:fs/promises";
import path from "node:path";

/**
 * 递归列出目录下指定扩展名的文件（深度优先，保持目录顺序）。
 * extensions 形如 [".md", ".mdx"]，大小写不敏感。
 */
export async function listFiles(dir, extensions) {
  const wanted = extensions.map((extension) => extension.toLowerCase());
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(full, extensions)));
    } else if (wanted.includes(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }

  return files;
}
