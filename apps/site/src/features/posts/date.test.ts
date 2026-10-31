import assert from "node:assert/strict";
import test from "node:test";
import { formatPostDate, parsePostDate } from "./date.ts";

test("slash datetime is Shanghai wall time, not UTC", () => {
  const date = parsePostDate("2026/04/20 12:03:33");
  assert.equal(date.toISOString(), "2026-04-20T04:03:33.000Z");
  assert.equal(formatPostDate(date), "2026/4/20 12:03:33");
});

test("midnight stays on the same Shanghai calendar day", () => {
  const date = parsePostDate("2025/08/27 00:33:28");
  assert.equal(date.toISOString(), "2025-08-26T16:33:28.000Z");
  assert.equal(formatPostDate(date), "2025/8/27 00:33:28");
});

test("unpadded month and day stay unpadded", () => {
  const date = parsePostDate("2023/1/4 18:53:32");
  assert.equal(date.toISOString(), "2023-01-04T10:53:32.000Z");
  assert.equal(formatPostDate(date), "2023/1/4 18:53:32");
});

test("explicit timezone is preserved", () => {
  const date = parsePostDate("2026-04-20T12:03:33Z");
  assert.equal(date.toISOString(), "2026-04-20T12:03:33.000Z");
  assert.equal(formatPostDate(date), "2026/4/20 20:03:33");
});
