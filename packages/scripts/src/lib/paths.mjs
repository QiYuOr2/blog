import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const libDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * 从给定目录向上查找 pnpm-workspace.yaml，定位 monorepo 根目录。
 * 以文件位置为基准而不是 process.cwd()，保证脚本在任意工作目录下结果一致。
 */
function findRepoRoot(startDir) {
  let current = startDir;
  while (true) {
    if (existsSync(path.join(current, "pnpm-workspace.yaml"))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error(`未找到 monorepo 根目录（缺少 pnpm-workspace.yaml）：${startDir}`);
    }
    current = parent;
  }
}

/** monorepo 根目录。 */
export const repoRoot = findRepoRoot(libDir);
/** packages/scripts 目录。 */
export const scriptsRoot = path.resolve(libDir, "..", "..");

/** content/ 下的数据目录。 */
export const contentDir = path.join(repoRoot, "content");
export const postsDir = path.join(contentDir, "posts");
export const wereadDir = path.join(contentDir, "weread");
export const bangumiDir = path.join(contentDir, "bangumi");

/** 脚本产物文件。 */
export const wereadDataFile = path.join(wereadDir, "weread.json");
export const bangumiDataFile = path.join(bangumiDir, "bangumi.json");

/** 手工维护的覆盖表根目录。 */
export const overridesDir = path.join(scriptsRoot, "overrides");

/**
 * 日志里用的仓库相对路径（统一用正斜杠，跨平台输出稳定）。
 * 仓库外的路径（例如 --out 指向临时目录）直接返回绝对路径。
 */
export function repoRelative(target) {
  const relative = path.relative(repoRoot, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return target;
  }
  return relative.split(path.sep).join("/");
}
