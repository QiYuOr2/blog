<script setup lang="ts">
import { computed } from "vue";
import {
  tsToDayKey,
  dayFromKey,
  shanghaiNow,
  heatLevel,
  type Dayjs,
} from "../date";
import { formatDuration } from "../utils/progress-utils";

const props = defineProps<{
  /** key 为每日 00:00 时间戳秒，value 为当日阅读时长（秒） */
  readTimesByDay: Record<string, number>;
}>();

type DayCell = {
  date: Dayjs;
  seconds: number;
  level: number;
  label: string;
};

const DAYS_IN_WEEK = 7;
const WEEKDAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];
/** 热力图只展示最近 6 个月，避免容器内出现横向滚动。 */
const RECENT_MONTHS = 6;

// 将数据按“上海日历日”归并。
const dayMap = computed<Map<string, number>>(() => {
  const map = new Map<string, number>();
  for (const [key, seconds] of Object.entries(props.readTimesByDay)) {
    const ts = Number(key);
    if (!Number.isFinite(ts)) continue;
    const dayKey = tsToDayKey(ts);
    map.set(dayKey, (map.get(dayKey) ?? 0) + seconds);
  }
  return map;
});

// 参考日取自数据里最新的阅读日，而不是访问时的“今天”。
// 本页是静态构建 + client:load 水合：若参考日取 shanghaiNow()，构建期(SSR)与
// 客户端会在跨月时算出不同的 6 个月窗口，导致页面“先闪完整、再缺一截”。
// 锚定到数据最新日，可让构建期与客户端计算结果完全一致。
const referenceDay = computed<Dayjs>(() => {
  let maxTs = 0;
  for (const key of Object.keys(props.readTimesByDay)) {
    const ts = Number(key);
    if (Number.isFinite(ts) && ts > maxTs) maxTs = ts;
  }
  // 无数据时回退到“上海今天”（此时网格为空，仅用于避免计算报错）。
  return maxTs ? dayFromKey(tsToDayKey(maxTs)) : shanghaiNow();
});

// 只保留最近 RECENT_MONTHS 个月（以“数据最新阅读日”为准）。
const recentDayMap = computed<Map<string, number>>(() => {
  const cutoff = referenceDay.value
    .startOf("month")
    .subtract(RECENT_MONTHS - 1, "month");
  const result = new Map<string, number>();
  for (const [key, seconds] of dayMap.value) {
    const date = dayFromKey(key);
    if (!date.isBefore(cutoff, "day")) result.set(key, seconds);
  }
  return result;
});

// 颜色与悬浮提示共用“分钟”口径，避免出现“显示绿色但提示 0 分钟”的不一致。
// 不足 1 分钟的天（如 2s/53s）按 0 分钟处理，不再上色。
const maxMinutes = computed<number>(() => {
  let max = 0;
  for (const seconds of recentDayMap.value.values()) {
    const minutes = Math.floor(seconds / 60);
    if (minutes > max) max = minutes;
  }
  return max;
});

// 计算最近的周列，先补齐到周一为起点，再补齐到周日为终点。
const weeks = computed<DayCell[][]>(() => {
  if (!recentDayMap.value.size) return [];

  const dates = [...recentDayMap.value.keys()].map(dayFromKey);
  const min = dates.reduce((a, b) => (b.isBefore(a) ? b : a));
  const max = dates.reduce((a, b) => (b.isAfter(a) ? b : a));

  // 把周日作为每周第一行（日、一、…、六）。dayjs 的 startOf("week") 会随 locale
  // 在周日/周一之间漂移（服务端按周日、浏览器按周一），这里用 .day() 显式求周日，
  // 保证服务端与浏览器渲染出的格网完全一致，避免 hydration 时颜色/时间错位。
  const weekday = min.day(); // 0 = 周日, ... 6 = 周六
  const start = min.subtract(weekday, "day");

  let end = max;
  const endDay = end.day();
  if (endDay !== 6) end = end.add(6 - endDay, "day");

  const result: DayCell[][] = [];
  let cursor = start.clone();
  while (!cursor.isAfter(end, "day")) {
    const week: DayCell[] = [];
    for (let i = 0; i < DAYS_IN_WEEK; i += 1) {
      const key = cursor.format("YYYY-MM-DD");
      const seconds = recentDayMap.value.get(key) ?? 0;
      const minutes = Math.floor(seconds / 60);
      week.push({
        date: cursor,
        seconds,
        level: heatLevel(minutes, maxMinutes.value),
        label: `${key} 阅读 ${formatDuration(seconds)}`,
      });
      cursor = cursor.add(1, "day");
    }
    result.push(week);
  }
  return result;
});

// 月份标签：标注每个月的起始周，并跨过该月占用的周数，保证文字完整渲染。
// 年份只在第一个月份和一月出现一次，其余月份只显示月号。
const monthLabels = computed<{ start: number; span: number; month: number; year: number; showYear: boolean }[]>(() => {
  const labels: { start: number; span: number; month: number; year: number; showYear: boolean; monthKey: string }[] = [];
  let lastKey = "";
  let firstKey = "";
  weeks.value.forEach((week, index) => {
    const first = week[0].date;
    const monthKey = `${first.year()}-${first.month()}`;
    if (monthKey !== lastKey) {
      labels.push({
        start: index,
        span: 1,
        month: first.month() + 1,
        year: first.year(),
        showYear: !firstKey || first.month() === 0,
        monthKey,
      });
      if (!firstKey) firstKey = monthKey;
      lastKey = monthKey;
    } else if (labels.length) {
      // 当前月份跨到本列，增加当前首列的 span。
      labels[labels.length - 1].span += 1;
    }
  });
  return labels.map(({ start, span, month, year, showYear }) => ({
    start,
    span,
    month,
    year,
    showYear,
  }));
});

const cellLevels = [0, 1, 2, 3, 4];

/** 首列留给星期标签的固定宽度，其余列用等分填充，保证任意宽度都不出横向滚动。 */
const WEEKDAY_COL_WIDTH = 14;
const GAP = 3;
const gridColumns = computed(() => {
  return `${WEEKDAY_COL_WIDTH}px repeat(${weeks.value.length}, minmax(0, 1fr))`;
});
/** 星期列 + 首列间隔，向左偏移后让真正的格子左缘与容器左缘对齐。 */
const gridLeftOffset = computed(() => `-${WEEKDAY_COL_WIDTH + GAP}px`);
</script>

<template>
  <div class="select-none">
    <div class="mb-3 flex items-center justify-between text-xs text-[var(--un-prose-body)] dark:text-[var(--un-prose-invert-body)]">
      <span>近半年阅读热力图</span>
      <span class="text-[var(--un-prose-captions)] dark:text-[var(--un-prose-invert-captions)]">
        {{ weeks.length }} 周 · {{ recentDayMap.size }} 天
      </span>
    </div>

    <div>
      <!-- 月份标签：与热力图网格同列对齐，位置由 item.col 决定 -->
      <div
        class="mb-1 grid text-[0.7rem] leading-none text-[var(--un-prose-captions)] dark:text-[var(--un-prose-invert-captions)]"
        :style="{
          gridTemplateColumns: gridColumns,
          columnGap: `${GAP}px`,
          marginLeft: gridLeftOffset,
        }"
      >
        <span
          v-for="item in monthLabels"
          :key="item.start"
          :style="{ gridColumn: `${item.start + 2} / span ${item.span}` }"
          class="whitespace-nowrap"
        >{{ item.showYear ? `${item.year}年` : "" }}{{ item.month }}月</span>
      </div>

      <!-- 热力图网格：首列为星期标签，其余列为每周 -->
      <div
        class="grid text-[0.7rem] leading-none text-[var(--un-prose-captions)] dark:text-[var(--un-prose-invert-captions)]"
        :style="{
          gridTemplateColumns: gridColumns,
          gridTemplateRows: `repeat(7, minmax(0, 1fr))`,
          columnGap: `${GAP}px`,
          rowGap: `${GAP}px`,
          marginLeft: gridLeftOffset,
        }"
      >
        <span
          v-for="(label, row) in WEEKDAY_LABELS"
          :key="label"
          :style="{ gridColumn: 1, gridRow: row + 1 }"
          class="flex items-center justify-end"
        >{{ label }}</span>

        <template v-for="(week, col) in weeks" :key="week[0].date.format('YYYY-MM-DD')">
          <span
            v-for="(cell, row) in week"
            :key="cell.date.format('YYYY-MM-DD')"
            :title="cell.label"
            :style="{
              gridColumn: col + 2,
              gridRow: row + 1,
              aspectRatio: '1 / 1',
              backgroundColor: `var(--heat-${cell.level}, var(--heat-0))`,
            }"
            class="rounded-[2px] transition-transform duration-100 hover:scale-110"
          />
        </template>
      </div>

      <!-- 图例 -->
      <div class="mt-3 flex items-center justify-end gap-1 text-[0.7rem] text-[var(--un-prose-captions)] dark:text-[var(--un-prose-invert-captions)]">
        <span>少</span>
        <span
          v-for="level in cellLevels"
          :key="level"
          class="h-[10px] w-[10px] rounded-[2px]"
          :style="{ backgroundColor: `var(--heat-${level})` }"
        />
        <span>多</span>
      </div>
    </div>
  </div>
</template>

<style>
  :root {
    --heat-0: var(--un-prose-bg-soft, rgb(241 245 249));
    --heat-1: rgb(213 230 217);
    --heat-2: rgb(168 205 179);
    --heat-3: rgb(108 169 128);
    --heat-4: rgb(59 105 61);
  }

  :root.dark {
    --heat-0: var(--un-prose-invert-bg-soft, rgb(39 44 41));
    --heat-1: rgb(45 70 52);
    --heat-2: rgb(54 92 64);
    --heat-3: rgb(66 121 79);
    --heat-4: rgb(76 145 90);
  }
</style>
