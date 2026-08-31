import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import type { Dayjs } from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };
export type { Dayjs };

/** 微信读书数据以 Asia/Shanghai 的午夜作为每日边界（UTC+8，无夏令时）。 */
export const SHANGHAI_TZ = "Asia/Shanghai";

/** 把微信读书返回的“上海当日 00:00”时间戳（秒）转成上海日历日 key（YYYY-MM-DD）。 */
export function tsToDayKey(ts: number) {
  return dayjs.unix(ts).tz(SHANGHAI_TZ).format("YYYY-MM-DD");
}

/** 把上海日历日 key（YYYY-MM-DD）转成上海时区的 dayjs。 */
export function dayFromKey(key: string) {
  return dayjs(key).tz(SHANGHAI_TZ);
}

/** 上海时区的“今天”（dayjs）。 */
export function shanghaiNow() {
  return dayjs().tz(SHANGHAI_TZ);
}

/**
 * 计算“最近 N 个月”的窗口起点：当前月往前推 (N - 1) 个月的第 1 天（上海时区）。
 * 返回一个可比较的 dayjs。
 */
export function recentWindowStart(months: number) {
  return shanghaiNow().startOf("month").subtract(months - 1, "month");
}

/**
 * 把某天阅读秒数（displayMinutes 级别）映射为 0 - 4 档颜色等级。
 * 不足 1 分钟按 0 档（不上色），颜色随时间递增。
 */
export function heatLevel(minutes: number, maxMinutes: number) {
  if (minutes <= 0 || maxMinutes <= 0) return 0;
  const ratio = minutes / maxMinutes;
  if (ratio > 0.8) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}
