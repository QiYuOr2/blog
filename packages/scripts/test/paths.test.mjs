import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  contentDir,
  overridesDir,
  repoRelative,
  repoRoot,
  wereadDataFile,
} from "../src/lib/paths.mjs";

test("paths 指向真实的仓库结构", () => {
  assert.ok(existsSync(path.join(repoRoot, "pnpm-workspace.yaml")));
  assert.ok(existsSync(contentDir));
  assert.ok(existsSync(overridesDir));
  assert.equal(wereadDataFile, path.join(contentDir, "weread", "weread.json"));
});

test("repoRelative 输出正斜杠，仓库外路径保持绝对", () => {
  assert.equal(repoRelative(wereadDataFile), "content/weread/weread.json");
  assert.ok(path.isAbsolute(repoRelative(path.join(repoRoot, "..", "outside.json"))));
});
