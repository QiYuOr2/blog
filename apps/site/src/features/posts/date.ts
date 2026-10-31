const SHANGHAI_OFFSET = "+08:00";

/**
 * 文章时间写的是上海墙上时间（`2026/04/20 12:03:33`），没有时区。
 * `new Date()` 会按构建机器的本地时区解析，Vercel 上就是 UTC，RSS 会整段偏 8 小时。
 */
export function parsePostDate(value: unknown): Date {
  if (value instanceof Date) return new Date(value.getTime());
  if (typeof value !== "string") return new Date(NaN);

  const trimmed = value.trim();
  if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(trimmed)) return new Date(trimmed);

  const match = trimmed.match(
    /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/,
  );
  if (!match) return new Date(trimmed);

  const [, year, month, day, hour = "0", minute = "0", second = "0"] = match;
  const iso = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}${SHANGHAI_OFFSET}`;
  return new Date(iso);
}

/** 固定按上海时间格式化，避免展示日期跟着构建机器的时区走。 */
export function formatPostDate(value: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(value)
    .map((part) => part.value)
    .join("");
}
