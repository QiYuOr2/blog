import assert from "node:assert/strict";
import test from "node:test";
import { parseArgs, parsePositiveInt } from "../src/lib/args.mjs";

test("parseArgs 区分 flag、带值选项与位置参数", () => {
  const { flags, options, positionals } = parseArgs([
    "--force",
    "--limit",
    "5",
    "--out=tmp/x.json",
    "-d",
    "extra",
  ]);

  assert.deepEqual([...flags], ["force", "d"]);
  assert.equal(options.get("limit"), "5");
  assert.equal(options.get("out"), "tmp/x.json");
  assert.deepEqual(positionals, ["extra"]);
});

test("parseArgs 不会把紧跟开关的参数当成它的值", () => {
  const { flags, options } = parseArgs(["--dry-run", "--force"]);

  assert.deepEqual([...flags], ["dry-run", "force"]);
  assert.equal(options.size, 0);
});

test("parseArgs 跳过 pnpm 透传时插入的裸 --", () => {
  const { flags, options } = parseArgs(["--", "--limit", "2"]);

  assert.equal(flags.size, 0);
  assert.equal(options.get("limit"), "2");
});

test("parsePositiveInt 只接受正整数", () => {
  assert.equal(parsePositiveInt("3"), 3);
  assert.equal(parsePositiveInt(7), 7);
  assert.equal(parsePositiveInt("0"), null);
  assert.equal(parsePositiveInt("-2"), null);
  assert.equal(parsePositiveInt("abc"), null);
  assert.equal(parsePositiveInt(undefined), null);
});
