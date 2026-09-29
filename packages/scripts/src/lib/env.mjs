import { existsSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "./paths.mjs";

// 优先级：shell 环境变量 > .env.local > .env（loadEnvFile 不会覆盖已存在的变量）。
const DEFAULT_ENV_FILES = [".env.local", ".env"];

/**
 * 加载仓库根目录下的 .env.local / .env，返回实际加载到的文件名。
 * 依赖 process.loadEnvFile（Node ≥ 20.12）；运行时没有该 API 时静默跳过，
 * 退回“只用 shell 环境变量”的行为。
 */
export function loadRepoEnv(files = DEFAULT_ENV_FILES) {
  if (typeof process.loadEnvFile !== "function") {
    return [];
  }

  const loaded = [];
  for (const name of files) {
    const file = path.join(repoRoot, name);
    if (!existsSync(file)) continue;
    process.loadEnvFile(file);
    loaded.push(name);
  }
  return loaded;
}
