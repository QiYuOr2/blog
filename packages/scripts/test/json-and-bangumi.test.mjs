import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { slimCollectionItem } from "../src/commands/fetch-bangumi.mjs";
import { writeJsonIfChanged } from "../src/lib/json.mjs";

test("slimCollectionItem 只保留前端渲染字段，剔除 short_summary 与 tags", () => {
  const raw = {
    updated_at: "2026-11-25T09:58:56+08:00",
    comment: "不错",
    tags: [{ name: "原创", count: 25, total_count: 100 }],
    type: 2,
    subject: {
      id: 12345,
      date: "2026-01-01",
      name: "Original Name",
      name_cn: "中文名",
      short_summary: "很长的简介...",
      score: 8.5,
      rank: 42,
      images: {
        small: "https://lain.bgm.tv/small.jpg",
        large: "https://lain.bgm.tv/large.jpg",
      },
    },
  };

  assert.deepEqual(slimCollectionItem(raw), {
    updated_at: "2026-11-25T09:58:56+08:00",
    type: 2,
    subject: {
      id: 12345,
      name: "Original Name",
      name_cn: "中文名",
      score: 8.5,
      images: {
        small: "https://lain.bgm.tv/small.jpg",
      },
    },
  });
});

test("writeJsonIfChanged 仅在业务字段变化时更新文件，忽略 updatedAt", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tabi-json-"));
  const file = path.join(tmpDir, "data.json");

  try {
    const first = await writeJsonIfChanged(file, {
      updatedAt: "2026-11-28T00:00:00.000Z",
      items: [1, 2],
    });
    assert.deepEqual(first, { written: true, reason: "created" });

    const second = await writeJsonIfChanged(file, {
      updatedAt: "2026-11-29T00:00:00.000Z",
      items: [1, 2],
    });
    assert.deepEqual(second, { written: false, reason: "unchanged" });
    const afterSkip = JSON.parse(await fs.readFile(file, "utf-8"));
    assert.equal(afterSkip.updatedAt, "2026-11-28T00:00:00.000Z");

    const third = await writeJsonIfChanged(file, {
      updatedAt: "2026-11-30T00:00:00.000Z",
      items: [1, 2, 3],
    });
    assert.deepEqual(third, { written: true, reason: "updated" });
    const afterUpdate = JSON.parse(await fs.readFile(file, "utf-8"));
    assert.equal(afterUpdate.updatedAt, "2026-11-30T00:00:00.000Z");
    assert.deepEqual(afterUpdate.items, [1, 2, 3]);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});
