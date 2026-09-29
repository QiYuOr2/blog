import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import fetchWeread from "../src/commands/fetch-weread.mjs";
import { readJson } from "../src/lib/json.mjs";
import { wereadDataFile } from "../src/lib/paths.mjs";

/**
 * 用仓库里已提交的 weread.json 反过来造接口响应，验证
 * 「拉取 → 合并 → 套覆盖表 → 落盘」这条链路仍能复现同一份数据（updatedAt 除外），
 * 不需要真实 API Key，也不会访问网络。
 */
function createFetchStub(fixture) {
  const reply = (payload) => ({
    ok: true,
    status: 200,
    json: async () => payload,
  });

  const monthFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
  });
  const monthOf = (unixSeconds) => monthFormatter.format(new Date(unixSeconds * 1000));

  /** monthly 接口返回当月日级时长，合并 6 次即得整份热力图数据。 */
  const readTimesForMonth = (baseTime) =>
    Object.fromEntries(
      Object.entries(fixture.readTimesByDay).filter(
        ([ts]) => monthOf(Number(ts)) === monthOf(baseTime),
      ),
    );

  return async (_url, init) => {
    const { api_name: apiName, mode, bookId, baseTime } = JSON.parse(init.body);

    if (apiName === "/readdata/detail" && mode) {
      return reply(
        mode === "monthly"
          ? {
              ...fixture.modes.monthly,
              // 不带 baseTime 的那次是 mode 循环里的“当月”，按已提交数据的当月复现。
              readTimes: readTimesForMonth(baseTime ?? fixture.modes.monthly.baseTime),
            }
          : fixture.modes[mode],
      );
    }
    if (apiName === "/shelf/sync") {
      return reply(fixture.shelf);
    }
    if (apiName === "/book/info") {
      // 书架条目本身已含详情字段，返回空详情让它原样保留。
      return reply({ book: {} });
    }
    if (apiName === "/book/getprogress") {
      return reply({ book: fixture.progressMap[bookId] ?? {} });
    }
    throw new Error(`未预期的接口调用：${apiName}`);
  };
}

test("fetch-weread 复现已提交的数据（含覆盖表效果）", async () => {
  const fixture = await readJson(wereadDataFile, { fallback: null });
  assert.ok(fixture, "缺少 content/weread/weread.json，无法对照");

  const originalFetch = globalThis.fetch;
  const originalWrite = process.stdout.write;
  const originalKey = process.env.WEREAD_API_KEY;
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tabi-weread-"));
  const outFile = path.join(tmpDir, "weread.json");

  let generatedRaw = "";
  try {
    globalThis.fetch = createFetchStub(fixture);
    process.env.WEREAD_API_KEY = "test-key";
    process.stdout.write = () => true; // 同步过程会打印上百行进度，测试里静音
    await fetchWeread.run(["--out", outFile]);
    generatedRaw = await fs.readFile(outFile, "utf-8");
  } finally {
    globalThis.fetch = originalFetch;
    process.stdout.write = originalWrite;
    if (originalKey === undefined) delete process.env.WEREAD_API_KEY;
    else process.env.WEREAD_API_KEY = originalKey;
    await fs.rm(tmpDir, { recursive: true, force: true });
  }

  const generated = JSON.parse(generatedRaw);
  const expected = { ...fixture, updatedAt: generated.updatedAt };

  assert.deepEqual(generated, expected);
  // 产物格式固定：2 空格缩进、行尾无换行，避免同步提交出现格式 diff。
  assert.equal(generatedRaw, JSON.stringify(expected, null, 2));
  assert.ok(!generatedRaw.endsWith("\n"));
});
