# AGENTS.md

> 本文件供 AI 编码助手快速建立上下文。接手新任务前先读这里，可大幅减少重复解释。

## 项目概览

- 柒宇的个人技术博客，纯静态站点（SSG）。
- 技术栈：Astro 7 + Vue 3 + UnoCSS；内容走 `astro:content`，markdown/mdx 文章，自定义 remark 插件。
- 包管理：pnpm monorepo（见 `pnpm-workspace.yaml`），`.npmrc` 里 `shamefully-hoist=true`。
- 部署：Vercel（https://blog.qiyuor2.me），使用了 `@vercel/analytics` / `@vercel/speed-insights`；仓库里另有一套 GitHub Pages workflow（`.github/workflows/deploy.yml`，属于 legacy/备用）。

## 目录结构

- `apps/site` — 主站点（Astro 页面/布局 + Vue 交互组件）。
- `apps/cli` — `tabi` 命令行：`tabi post <title>` 新建文章、`tabi memo <content>` 新建碎碎念。
- `packages/config` — 共享路径常量（`POSTS_DIR` / `MEMOS_DIR` / `WEREAD_DIR`）。
- `packages/scripts` — 脚本：`fetch-weread.mjs`、`generate-summaries.mjs`。
- `packages/plugins` — remark 插件：`remark-reading-time`、`remark-image`、`remark-mermaid`。
- `packages/utils` — 通用工具（如 `findMonorepoRoot`）。
- `content/` — 内容数据：`posts/`（md/mdx）、`memos/`（yaml）、`weread/`（json）。

## 常用命令

- `pnpm dev` / `pnpm build` / `pnpm preview` — 开发 / 构建 / 预览（转发到 `@tabi/site`）。
- `pnpm build:cli` — 构建 `tabi` CLI。
- `pnpm weread:sync` — 拉取微信读书数据。
- `pnpm summary:gen` — 为文章生成 AI 摘要（详见下文）。
- 构建产物在 `apps/site/dist`。

## 内容模型

- `apps/site/src/content.config.ts` 用 glob loader 定义三套 collection：`posts` / `memos` / `weread`。
- 文章 schema 在 `apps/site/src/features/posts/schema.ts`：`title`、`description`、`summary`(可选)、`draft`(可选)、`date`、`pubDate`、`lastModified`(可选，目前页面未渲染)、`tags`(可选)、`category`(可选)。
- 文章的 `id` = 相对 `content/posts` 的路径去掉扩展名（正斜杠），例如 `2025/ai_agent_what`。
- 首页/列表通过 `visibleFilter` 过滤 `draft`，`sortByDate` 按 `date` 倒序。
- `remark-reading-time` 会在构建期往 `remarkPluginFrontmatter.minutesRead` 注入阅读时长。
- 文章正文里的图片由 `remark-image` 处理，mermaid 图表由 `remark-mermaid` 处理。

## 样式约定（重要，非标准写法）

- UnoCSS presets：`presetWind3` + `presetTypography` + `presetIcons` + `presetAttributify`。
- **颜色数字色阶是去掉尾零的写法**：`stone-1` = stone-100、`zinc-4` = zinc-400、`stone-9` = stone-900；裸写 `stone` 等于 stone-400。同时存在 Tailwind v2 色名（`true-gray-*`、`warm-gray-*` 等，完整 50–900）。
- 正文排版用 `prose-stone dark:prose-invert`；可用 CSS 变量 `--un-prose-body`、`--un-prose-bg-soft`、`--un-prose-borders`、`--un-prose-invert-*` 等。
- 暗色模式：`<html>` 上加 `.dark` class；CSS 里用 `:root.dark` 或 UnoCSS 的 `dark:` 前缀。
- 图标用 `presetIcons`：`i-mingcute:*` / `i-mdi:*` / `i-fluent:*`。
- 路径别名：`@/` → `apps/site/src`。
- 构建期全局变量：`__BUILD_TIME__`（在 `astro.config.mjs` 的 vite define 里注入）。

## AI 摘要功能

- 脚本：`packages/scripts/generate-summaries.mjs`，用 openai SDK 调 DeepSeek（OpenAI 兼容接口）。
- 逻辑：遍历 `content/posts/**/*.md`，用 `gray-matter` 读写 frontmatter；已有 `summary` 就跳过（除非 `--force`）；支持 `--dry-run`、`--limit N`。
- 环境变量（脚本启动时会用 `process.loadEnvFile` 加载根目录 `.env.local` 和 `.env`，要求 Node ≥ 20.12）：
  - `AI_API_KEY`（必填）
  - `AI_BASE_URL`（默认 `https://api.deepseek.com`）
  - `AI_MODEL`（默认 `deepseek-v4-flash`）
- 展示：`apps/site/src/pages/[...slug].astro` 在标题下渲染 `post.data.summary` 卡片（「AI 摘要」+ `i-mingcute:sparkles-line` 图标）。

## 环境变量 / 密钥

- `apps/site/.env`（已提交，只有 `PUBLIC_BASE_URL`、`PUBLIC_COLOR_MODE`）和 `apps/site/.env.development`。
- `.gitignore` 只忽略 `.env.local`、`.env.*.local`；**根目录 `.env` 不会被忽略**，别把密钥放进去。
- 脚本要读的密钥建议放根目录 `.env.local`（已被 gitignore）；模板见 `.env.example`。

## 已知坑 / 约定

- `generate-summaries.mjs` 用 gray-matter 回写会规范化 frontmatter：`date`/`pubDate` 加引号、`tags` 由行内数组变列表、长 `description` 折叠成 `>-` 块。值不变，但提交前要看一眼 diff。
- 交互部分用 Vue 组件（`comments.vue`、`post-list.vue`、`toc.vue`、memo/weread 卡片等）；静态页面/布局用 Astro。
- `[...slug].astro` 里的 `<style lang="less">`（`.action` / `.medium-zoom-image--opened`）是历史遗留；新样式优先用 UnoCSS，不要再引入 Less。
