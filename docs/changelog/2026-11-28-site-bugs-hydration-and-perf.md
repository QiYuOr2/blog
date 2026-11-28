# 站点 Bug、SSR 水合与交互体验修复

## 0. 摘要

修复文章页 View Transitions 切换后图片缩放与 Mermaid 失效及全站无条件加载 Mermaid 的问题，并同步修复多处暗色样式拼写、主题首次跟随系统、SSR Hydration Mismatch、Memo 时区、Bangumi 异步竞态与书摘大列表渲染卡顿。

- 日期：2026-11-28
- 范围：`apps/site`、`packages/plugins`
- 类型：修复 / 性能

## 1. 现象

1. 文章页切换（`<ClientRouter />`）后 `medium-zoom` 与 `mermaid` 不再生效，且 57 篇文章中仅 1 篇含 Mermaid，所有文章页却都会无条件下载完整 `mermaid` 包。
2. `[...slug].astro` 上一篇/下一篇链接在暗色模式下仍为 `#000` 黑色；`toc.vue` 存在 `border-warm-gary-400` 拼写错；读书页空状态使用 `--un-prose-border`（少 `s`）导致边框色失效。
3. 首次访问用户（`localStorage` 为空）切换操作系统深浅色时页面不会实时跟随；移动端点击主题切换器常被 `timeLock` 吞掉；`comments.vue` 与 `highlights-list.vue` 在客户端初值读取了浏览器状态导致 SSR 水合不一致。
4. `MemoCard` 未固定上海时区，Vercel（UTC）构建时凌晨碎碎念日期会错前一天；`back-top.vue` 隐藏态无 `pointer-events-none` 仍可误点；`useBangumi` 快速切 tab/翻页存在旧请求覆盖新数据的竞态，且缓存加载失败后会永久缓存 `undefined`。
5. `/weread/highlights` 一次全量渲染 1,922 条 `<article>` 节点，搜索输入与首屏挂载偏重。

## 2. 根因

- Astro `<ClientRouter />` 下模块 `<script>` 仅首次执行，未绑定 `astro:page-load` / `astro:before-swap` 生命周期。
- 部分组件在 `<script setup>` 顶层读取了 `localStorage` / 内存缓存，与 SSR 构建产物初值不一致。
- `remark-image` / `remark-mermaid` 直接拼 HTML 字符串，未对属性与 Mermaid 源码转义，且 `alt` 为空会输出 `alt="null"`。
- 骨架屏导航在慢网切出骨架屏后若导航被 `samePage` 中止，未还原旧 `<main>` DOM。

## 3. 方案取舍

- **Mermaid 按需加载**：仅当页面存在未处理的 `.mermaid` 节点时才动态 `import("mermaid")` 并调用 `mermaid.run({ nodes })`，同时按当前暗色状态选主题，零额外构建配置。
- **书摘分页**：采用每批 80 条 + `IntersectionObserver` 自动增量渲染 + 150ms 搜索防抖，并在命中 `#bookmarkId` 锚点时自动扩展上限至包含目标条目，兼顾首屏性能与锚点直达。
- **去掉文章页 Less**：用 UnoCSS 替代 `[...slug].astro` 末尾 12 行 Less，一并修好暗色模式链接色并为卸载 `less` 铺路。

## 4. 实施步骤

- `apps/site/src/pages/[...slug].astro`：绑定 `astro:page-load` / `astro:before-swap` 管理 `mediumZoom` 生命周期；按需加载 `mermaid`；移除 `<style lang="less">` 与重复的 `summary` 条件。
- `packages/plugins/remark/remark-image.mjs` & `remark-mermaid.mjs`：补充 HTML 转义，图片增加 `loading="lazy" decoding="async"`。
- `apps/site/src/features/theme/color-mode.ts`、`apps/site/src/layouts/head.astro`、`page.astro`、`color-mode-switch.vue`、`comments.vue`：统一 `PUBLIC_COLOR_MODE` key，修正 `readStoredMode() === Mode.System` 监听与清理函数，重构移动端指针交互，延迟客户端状态同步至 `onMounted`，补齐 `canonical` / `og:url` / `og:type`。
- `apps/site/src/features/memo/components/card.vue` & `pages/memo/[...timestamp].astro`：固定 `Asia/Shanghai` 时区；静态路由直接通过 `props` 传 `memo` 避免重复扫表。
- `apps/site/src/features/bangumi/useBangumi.ts`、`components/back-top.vue`、`lib/skeleton-navigation.ts`、`features/posts/components/toc.vue`、`post-list.vue`、`features/weread/components/highlights-list.vue`、`index.vue`、`shelf-grid.vue`、`highlights-url.ts`、`pages/rss.xml.ts`：依次修复竞态、可访问性、HTML 嵌套语义、CSS 变量名、骨架屏中止还原、书摘分批渲染与哈希口径统一。

## 5. 验证

- `pnpm test`：32/32 通过（`@tabi/scripts` 13 个 + `@tabi/site` 19 个，零警告）。
- `pnpm typecheck`：`astro check` 与 `@tabi/cli` `tsc --noEmit` 0 error。
- `pnpm build`：84 个静态页面与 JSON/RSS 路由构建成功。

## 6. 影响面与回滚

- 影响范围：仅 `apps/site` 与 `packages/plugins`，不改内容数据格式。
- 回滚方式：直接 `git revert` 对应提交即可恢复。

## 7. 遗留 / 后续

- 书摘页的 `highlights-list.vue` 后续如数据继续增长至万级，可再评估是否切换虚拟列表。
