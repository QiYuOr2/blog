/**
 * 极简参数解析，够用即止（不值得为此引入 commander 之类的依赖）：
 *   --force / -f           → flags
 *   --limit 5 / --limit=5  → options
 *   其它                    → positionals
 *
 * 注意：`--key` 后面跟的第一个非 `-` 开头的值会被当作它的值，
 * 因此布尔开关后面不要再跟位置参数。
 */
export function parseArgs(argv = []) {
  const flags = new Set();
  const options = new Map();
  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    // pnpm 透传参数时会塞一个裸 `--`，直接跳过。
    if (arg === "--") continue;
    if (arg.startsWith("--")) {
      const [key, inlineValue] = arg.slice(2).split("=", 2);
      if (inlineValue !== undefined) {
        options.set(key, inlineValue);
        continue;
      }
      const next = argv[index + 1];
      if (next !== undefined && !next.startsWith("-")) {
        options.set(key, next);
        index += 1;
      } else {
        flags.add(key);
      }
    } else if (arg.startsWith("-") && arg.length > 1) {
      flags.add(arg.slice(1));
    } else {
      positionals.push(arg);
    }
  }

  return { flags, options, positionals };
}

/** 解析正整数选项（如 `--limit 5`）；缺失或非法时返回 null，交给调用方决定默认值。 */
export function parsePositiveInt(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}
