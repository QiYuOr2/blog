# 2026-10-19 · 读书页同系列多册折叠成一张「系列卡」

> 范围：`apps/site` —— 读书页书架网格（`features/weread/components/`、`features/weread/utils/series-utils.ts`）
> 类型：功能 + 修复（顺带修掉卡片的键盘可达性问题）
> 状态：已修复（已验证）
> 影响：`/weread` 书架区；任意视口、明暗两种主题
> 关联：2026-09-28 的两条热力图记录与本次改动互不影响

## 0. 摘要

书架原来「一本一个条目」平铺，`魔女之旅` 占 17 张卡、`败犬` 系列占 8 张卡，视觉上把单本好书挤到很后面。现在同系列的多册折成**一张和单本同样大小（2:3 书籍比例）的卡片**，右上角一枚「N 册」标记、底缘一条系列读完进度条；点开后在卡片下方**下沉展开**全部分册，不挤压后面的书。

**分组完全由 `series-overrides.json` 白名单决定，不做任何书名推断。** 书名规律追不上真实写法（缩写、简繁、缺卷号、换译名），白名单则逐本可确认、可复查。当前登记 14 个系列。

## 1. 现象

- 书架平铺展示，`魔女之旅 1`～`17`、`败北女角太多了！第一卷`～`第六卷`、`Fate strange fake` 六卷等连续占满多行；
- 系列里的单册常常只有几十秒阅读时长，却和精读过的书占同样一格；
- 读得最深的书（按阅读时长倒序）被这些零碎的册子稀释，首屏几乎全是「0%」的轻小说分册。

## 2. 根因

1. `shelf-grid.vue` 直接 `v-for` 渲染 `shelf.books`，没有任何「这本属于哪一系列」的概念；
2. 微信读书 `shelf.books` 每条只有 `bookId/title/category/cover/deepLink/finishReading/...`，**没有系列字段**，系列信息只隐含在书名里（`魔女之旅 14`、`丰饶之海（第二卷）：奔马`、`Fate strange fake_第一卷`）；
3. `content/weread/weread.json` 每天由 `pnpm weread:sync` 整份覆盖写入，任何往数据里加字段的做法都会在下次同步时被冲掉。

## 3. 方案取舍

| 方案 | 思路 | 代价 | 结论 |
| --- | --- | --- | --- |
| A | 在 `fetch-weread` 里算好 `seriesId` 写进 JSON | 数据自带系列信息 | 未采用：JSON 每天被覆盖，且改写产物会让同步提交出现大面积 diff |
| B | **维护白名单 `series-overrides.json`，逐本登记** | 书架新增一册要手工登记 | **采用**：结果可预期、可复查，不受书名写法影响 |
| C | 读取侧按书名规律推断 | 零维护 | 未采用（曾实现后又移除，见下） |

### 3.1 为什么放弃书名推断，改用白名单

第一版按书名规律自动分组，能处理 `魔女之旅 14`、`丰饶之海（第二卷）：奔马` 这类标准写法，但真实数据里几乎每个系列都有例外，最终都需要人工兜底：

| 情况 | 例子 |
| --- | --- |
| 简称掉了系列前缀 | `事件簿2` vs `君主·埃尔梅罗二世事件簿1` |
| 第 1 部没有卷号 | `沙丘` vs `沙丘2：沙丘救世主` |
| 简繁 + 紧贴数字 | `安達與島村2` vs `安达与岛村 11` |
| 换译名 | `败犬女主太多了！7` vs `败北女角太多了！ 第五卷` |
| 前缀混排 | `冒险 4 炼金术师的遗产（上）` vs `君主·埃尔梅罗二世的冒险 Vol.2 …` |
| 完全不同的书名 | `冬季限定法式巧克力事件` vs `小市民系列` |

规则每补一种写法都要加正则、冒误伤风险，且结果难以预测。既然例外占多数，**干脆全部走白名单**：书名解析相关代码（`parseShelfTitle` / `seriesKey` / `getBundleSize` / 简繁归一表等）已全部删除，`series-utils.ts` 从 493 行降到约 190 行。

白名单（`packages/scripts/overrides/weread/series-overrides.json`）与 `category-overrides.json` / `title-overrides.json` 同一套约定：

```json
[{ "name": "君主·埃尔梅罗二世事件簿", "books": { "<bookId>": 1, "<bookId>": 2 } }]
```

- `name` 是卡片上显示的系列名，`books` 是 `bookId → 卷号`，卷号决定展开后的分册顺序；
- 不同书可以共用同一卷号（如 `败犬女主太多了！ 07` 与 `败犬女主太多了！7` 都是第 7 卷），排序时按书架顺序稳定排列；
- 校验在构建期完成：`name` 缺失、`books` 不是对象、卷号不是正整数、同一本书被登记进两个系列，都会直接抛错；
- 只登记 1 册的系列没有折叠意义，仍按单本展示；
- **系列卡始终展示**：单本仍受 10 分钟阅读时长门槛限制，但系列是逐本人工确认过的，`君主·埃尔梅罗二世事件簿` 10 册合计只有 30 秒，不该因此整组消失。

数据流：`apps/site/src/features/weread/model.ts` 用 Vite 的 `import.meta.glob` 直接把该 JSON 读进构建产物（已验证内容被内联进 `dist/_astro/*.js`），因此改表后只需重新构建，不用跑 `pnpm weread:sync`；`fetch-weread` 不读取这张表，同步产物也不会被污染。

## 4. 实施步骤

1. 新增 `packages/scripts/overrides/weread/series-overrides.json`，登记 14 个系列；
2. 新增 `apps/site/src/features/weread/utils/series-utils.ts`：`parseSeriesOverrides` / `indexSeriesOverrides` / `groupShelfSeries` / `getSeriesInfo` / `shouldRenderCard` 等**纯白名单驱动**的纯函数；
3. 新增 `series-utils.test.ts`（`node --test`，无需额外依赖）；
4. 新增 `components/series-card.vue`：封面与单本卡同形（复用 `card.vue`），按钮 + **下沉展开**面板；
5. 改 `components/shelf-grid.vue`：接收 `ShelfCard[]`，按 `kind` 分发到单本卡 / 系列卡；
6. 改 `components/index.vue`：分类计数与时长排序都改成按卡片口径；
7. 改 `features/weread/model.ts`：新增 `getSeriesOverrides()` 读取白名单；
8. 改 `components/card.vue`：整卡改为 `<button type="button">`（有 `deepLink` 时点击跳转），加 `focus-visible` 焦点环；标题支持多行并带 `…` 省略。

### 4.1 下沉展开：挤开后面的行，但不动同行的卡片

展开区是**网格的独立一项**（`grid-column: 1 / -1`），紧跟在系列卡之后渲染：

- 系列卡只占 1 格，展开区放不进本行剩余列，于是自动换到**下一行**并占满整行；
- 因此本行其余卡片「纹丝不动」，后面的行整体下移，不会被遮挡；
- 收起时该行消失，布局完全复原。

关键一环是书架网格上的 `grid-flow-row-dense`：展开区插队后，本行剩下的格子由后续卡片**回填**，不会在展开区旁边留出一块空白。

验证方法（三档视口/主题）：
1. 系列卡自身 `x/y` 展开前后不变；
2. 展开前与本行同 `y` 的其它卡片，展开后**全部仍在原坐标**；
3. 出现一个高度明显大于卡片的横跨整行元素（即展开区）；
4. 收起后所有子项坐标与展开前**完全一致**。

> 走过的弯路：①用 `position: absolute` 让展开区浮在内容上——不挤开后面的行；②给单元格加 `padding-bottom` 撑高本行——会把整行拉高，同行卡片虽然不变形但行间出现大块空白；③展开区不加 `col-span-full`——会被塞进本行剩余列，把原本排在那里的书挤走。最终「独立成行 + dense 回填」同时满足三个要求。
>
> 也不能用 `<details>` + `display: contents`：`display: contents` 的元素不生成盒子，其子元素无法成为外层 grid 的网格项。

### 4.1 两个必须记住的坑（初版曾踩中）

**坑 1：卡片整张变淡发灰 —— 因为卡片被渲染成了 `<a>`。**
读书页内容在 `<article class="prose">` 里，`apps/site/uno.config.ts` 的 `presetTypography.cssExtend` 给正文链接统一设了：

```js
"a:not(.toc__archor a)": { "background-color": "var(--un-prose-bg-soft)", opacity: "0.7" }
"a:not(.toc__archor a):hover": { "background-color": "var(--un-prose-borders)", opacity: "1" }
```

初版按无障碍规范把卡片从 `div` 改成了 `<a href=deepLink>`，全部命中这条规则：每张卡片 `opacity: .7` + 浅灰底色，hover 才恢复——这正是「所有卡片都变灰、hover 才正常」的表现。**卡片必须渲染成 `<button>`**，用 `window.open` 跳转；不用 `<a>`，也不去改全局 prose 规则影响正文。

**坑 2：早期用 `<details>` 做折叠，展开区被压成一列宽。**
`display: contents` 的 `<details>` 不生成盒子，其子元素**不会**成为外层 grid 的网格项，展开区被压成 133px。而把 `col-span-full` 加在 `<details>` 上又会让**封面也跟着撑满整行**变成巨图。最终改为按钮 + 绝对定位面板（见 4.1）。

**坑 3：标题截断——最后放弃截断，改成完整展示。**
标题最初用 `line-clamp-N` 想做「最多 N 行 + `…`」，但在本项目的实际渲染环境里**完全失效**：`-webkit-line-clamp` 需要 `display: -webkit-box` 作为前提，而 Chrome 155 已不支持该显示类型（`CSS.supports('display','-webkit-box')` 虽返回 `true`，但计算值一律归一化成 `flow-root`），`line-clamp`、`-webkit-line-clamp`、标准属性三种写法实测都不裁剪（`scrollHeight === clientHeight`）。结果就是超过 N 行时被外层 `overflow: hidden` 硬切，而不是显示 `…`。

中间还试过按行数给容器设固定高度、`max-height`、嵌套内外层等，都是治标。既然无法可靠地在任意行数处画省略号，**最终去掉截断**：标题完整展示，有多少行排多少行。

现在的结构：卡片固定 2:3（封面 `aspect-[2/3]` 决定高度），标题 `absolute` 贴在卡片底边、向上生长，完整展示并在需要时覆盖封面下部——这是刻意的设计，卡片尺寸不随书名变化。

实测：`无职转生`、`世界观` 这两条 3 行长标题的卡片尺寸仍为 `133 × 200`（比例 1.5），`scrollHeight === clientHeight`（无裁切）。

## 5. 验证

```bash
node --test apps/site/src/features/weread/utils/series-utils.test.ts   # 9/9 通过
pnpm --filter @tabi/site build                                        # 80 页构建成功
node_modules/.bin/tsc --noEmit -p apps/site/tsconfig.json             # 0 error
```

- **颜色回归（针对坑 1）**：把封面替换成纯红 `#e00000` 后取像素，修复前为 `rgb(225,76,76)`（说明有白色半透明覆盖），修复后为 `rgb(213,0,0)`（仅受底部黑色渐变影响）；1280 明/暗、393 移动端三档下，卡片 `opacity` 全部为 `1`；
- **下沉展开挤开下一行、同行不动**：三项断言在 1280 明/暗、393 移动端全部通过——系列卡自身坐标不变；展开前与本行同 `y` 的卡片展开后仍在原坐标；收起后所有子项坐标与展开前完全一致；
- **标题完整展示（针对坑 3）**：`无职转生 ～到了异世界就拿出真本事～ 完全收录版`、`世界观：现代人必须要懂的科学哲学和科学史（原书第2版）` 等 3 行长标题均完整显示（`scrollHeight === clientHeight`，无裁切），卡片尺寸保持 `133 × 200`（比例 1.5），标题向上覆盖封面下部；
- **尺寸一致**：系列卡与单本卡实测均为 `133 × 200`（2:3）；「N 册」在右上角（原「读完 x/x」位置）；
- **分组正确性**：197 本书 → 卡片内书籍总数 197、去重后仍 197（不丢不重）；
- **白名单效果**：渲染出 **13 张系列卡**，覆盖全部六项合并需求——
  `君主·埃尔梅罗二世事件簿` 10 册、`君主·埃尔梅罗二世的冒险` 5 册、`败犬女主太多了！` 9 册（含 `败北女角` 六卷 + `07` + `7` + `08`）、`安达与岛村` 11 册（含 `安達與島村2`…`7`）、`我和女友的妹妹接吻了` 4 册（含无卷号那册）、`小市民系列` 2 册（含 `冬季限定法式巧克力事件`）、`ddd` 2 册；`魔法使之夜` 只登记 1 册，按单本展示；
- **不丢书**：没有任何系列被过滤——平铺 197 本里，未登记的书全部以单本卡出现；
- **键盘/无障碍**：系列卡封面是 `<button aria-expanded>`，Enter 可展开；面板 `aria-hidden` 同步切换；`motion-reduce:transition-none` 尊重减少动效设置。

## 6. 影响面与回滚

- 行为变化：书架同系列多册合并为一张卡；分类计数改按卡片计；系列卡始终展示，单本仍受 10 分钟门槛限制；
- 视觉：系列卡与单本卡同尺寸，「N 册」在右上角，底缘有系列读完进度条；标题最多 3 行并带 `…`；
- 布局：系列卡展开后在**下一行**插入分册区，后面的行整体下移，同行卡片保持原位；本行空位由后续卡片 dense 回填；收起后完全复原；
- 回滚：删掉 `series-overrides.json` 里的条目即可让对应系列退回单本；彻底回滚则 revert `series-utils.ts`、`series-card.vue`、三个组件与本记录。`content/weread/weread.json` 全程未被触碰。

## 7. 遗留 / 后续

- 新增系列或往系列里加册，需要手工改 `series-overrides.json`（见 `packages/scripts/README.md`）；漏登记只会退化为单本卡片，不会丢书；
- 白名单按 `bookId` 登记，书架移除某册后表里会残留无效条目——目前不报错，如需严格可加一次「表内 bookId 必须在书架上」的构建期校验；
- 系列展开状态没有写进 URL，刷新后回到收起态。
