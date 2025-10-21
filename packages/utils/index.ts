import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'

export function findMonorepoRoot(startDir: string): string {
  let current = startDir;
  while (true) {
    if (existsSync(join(current, "pnpm-workspace.yaml"))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) break; // 到达文件系统根
    current = parent;
  }
  throw new Error("Cannot find monorepo root (pnpm-workspace.yaml missing)");
}