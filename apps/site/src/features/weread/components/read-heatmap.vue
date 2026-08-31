<script setup lang="ts">
import { computed } from "vue";
import { formatDuration } from "../utils/progress-utils";

const props = defineProps<{
  /** key 为每日 00:00 时间戳秒，value 为当日阅读时长（秒） */
  readTimesByDay: Record<string, number>;
}>();

type DayCell = {
  date: Date;
  seconds: number;
  level: number;
  label: string;
};

const DAYS_IN_WEEK = 7;
const WEEKDAY_LABELS = ["一", "二", "三", "四", "五", "六", "日"];
/** 热力图只展示最近 6 个月，避免容器内出现横向滚动。 */
const RECENT_MONTHS = 6;

// 将数据按“本地日”归并（接口返回的是 UTC 凌晨时间戳，需要转换成 Asia/Shanghai 本地日）。
const dayMap = computed<Map<string, number>>(() => {
  const map = new Map<string, number>();
  for (const [key, seconds] of Object.entries(props.readTimesByDay)) {
    const ts = Number(key);
    if (!Number.isFinite(ts)) continue;
    const date = new Date(ts * 1000);
    const localKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    map.set(localKey, (map.get(localKey) ?? 0) + seconds);
  }
  return map;
});

// 只保留最近 RECENT_MONTHS 个月（以前端“今天”为准，跨自然月）。
const recentDayMap = computed<Map<string, number>>(() => {
  const cutoff = new Date();
  cutoff.setDate(1);
  cutoff.setMonth(cutoff.getMonth() - (RECENT_MONTHS - 1));
  const result = new Map<string, number>();
  for (const [key, seconds] of dayMap.value) {
    const [y, m, d] = key.split("-").map(Number);
    if (Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d)) {
      const date = new Date(y, m - 1, d);
      if (date >= cutoff) result.set(key, seconds);
    }
  }
  return result;
});

const maxSeconds = computed<number>(() => {
  let max = 0;
  for (const seconds of recentDayMap.value.values()) {
    if (seconds > max) max = seconds;
  }
  return max;
});

// 以最大值为基准把阅读时长分成 5 档，颜色深度随时间递增。
function levelOf(seconds: number, max: number) {
  if (seconds <= 0) return 0;
  if (max <= 0) return 0;
  const ratio = seconds / max;
  if (ratio > 0.8) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

// 计算最近的周列，先补齐到周一为起点，再补齐到周日为终点。
const weeks = computed<DayCell[][]>(() => {
  if (!recentDayMap.value.size) return [];

  const dates = [...recentDayMap.value.keys()].map((key) => new Date(`${key}T00:00:00`));
  const min = new Date(Math.min(...dates.map((d) => d.getTime())));
  const max = new Date(Math.max(...dates.map((d) => d.getTime())));

  const start = new Date(min);
  const day = start.getDay();
  start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));

  const end = new Date(max);
  const endDay = end.getDay();
  end.setDate(end.getDate() + (endDay === 0 ? 0 : 7 - endDay));

  const result: DayCell[][] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const week: DayCell[] = [];
    for (let i = 0; i < DAYS_IN_WEEK; i += 1) {
      const date = new Date(cursor);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const seconds = recentDayMap.value.get(key) ?? 0;
      week.push({
        date,
        seconds,
        level: levelOf(seconds, maxSeconds.value),
        label: `${key} 阅读 ${formatDuration(seconds)}`,
      });
      cursor.setDate(cursor.getDate() + 1);
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
    const monthKey = `${first.getFullYear()}-${first.getMonth()}`;
    if (monthKey !== lastKey) {
      labels.push({
        start: index,
        span: 1,
        month: first.getMonth() + 1,
        year: first.getFullYear(),
        showYear: !firstKey || first.getMonth() === 0,
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

        <template v-for="(week, col) in weeks" :key="col">
          <span
            v-for="(cell, row) in week"
            :key="row"
            :title="cell.label"
            :style="{
              gridColumn: col + 2,
              gridRow: row + 1,
              backgroundColor: `var(--heat-${cell.level}, var(--heat-0))`,
            }"
            class="aspect-square rounded-[2px] transition-transform duration-100 hover:scale-110"
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
