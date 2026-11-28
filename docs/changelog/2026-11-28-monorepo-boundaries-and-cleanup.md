# Monorepo 包边界收拢、测试与类型检查补齐及冗余清理

## 0. 摘要

将手工覆盖表归口到 `@tabi/config` 消除跨包相对路径穿透，合并站点单元测试并新增 `pnpm typecheck`，加固 CLI 生成逻辑，同时清理过期配置、冗余依赖与未引用死代码。

- 日期：2026-11-28
- 范围：根配置、`apps/site`、`apps/cli`、`packages/config`、`packages/utils`、`packages/plugins`、`packages/scripts`、`.github/workflows/deploy.yml`
- 类型：重构 / 工程化

## 1. 现象

1. `apps/site/src/features/weread/model.ts` 通过 5 层相对路径 `../../../../../packages/scripts/overrides/...` 读取未声明依赖的 `@tabi/scripts` 内部文件；`packages/plugins` 将运行时依赖 `unist-util-visit` 误放在 `devDependencies`。
2. `pnpm test` 只跑了 `@tabi/scripts`，漏掉了 `apps/site` 已有的 3 个单测文件；缺少 `typecheck` 命令。
3. 存在多项历史遗留：失效的 Nuxt `.eslintrc`、在 `push: main` 上触发但按旧单包目录编写的 `deploy.yml`、被 git 追踪的空根 `.env`、未引用的 `playwright`/`remark-toc`/`@rollup/plugin-yaml`/`clsx`/`less` 依赖及多个死文件。
4. `apps/cli` 在模块顶层求值时间戳，`tabi post` 同名会直接覆盖已有文章且未转义 YAML 标题。

## 2. 根因

- 仓库从早期单包 Nuxt/Astro 站点演进为 pnpm monorepo 后，部分共享配置边界、依赖声明与辅助工具未及时收口。

## 3. 方案取舍

- **覆盖表归口 `@tabi/config`**：三张 `weread` 覆盖表继续放在同一目录（`packages/config/overrides/weread/`）便于人工维护，`@tabi/config` 显式导出 `series-overrides.json` 给 `apps/site`，`@tabi/scripts` 的 `overridesDir` 同步指向该目录。
- **收拢 `vercel.json`**：核实 Vercel 后台 `Root Directory` 为空（仓库根目录 `./`），`Output Directory` 为 `apps/site/dist`，因此真正生效的是根 `vercel.json`，直接删除冗余的 `apps/site/vercel.json`。
- **移除废弃实验页**：删除不可用的 `/lab/map` 实验页（`apps/site/src/pages/lab/map.astro`、`components/map.vue`）及 `mapbox-gl` / `@types/mapbox-gl` 依赖。

## 4. 实施步骤

- 移动 `packages/scripts/overrides` → `packages/config/overrides`，规范 `@tabi/config`、`@tabi/utils`、`@tabi/plugins`、`@tabi/site` 的 `type` / `exports` / `dependencies`；更新 `weread/model.ts` 改用 `@tabi/config/overrides/weread/series-overrides.json`。
- 根 `package.json` 合并 `@tabi/site` 测试进 `pnpm test`，新增 `pnpm typecheck`（安装 `@astrojs/check` 与 `apps/site` 侧 `typescript`）。
- 移除 `playwright`、`remark-toc`、`@rollup/plugin-yaml`、`clsx`、`less`、`mapbox-gl`、`@types/mapbox-gl`，删除 `apps/site/vercel.json`、`/lab/map`、`.eslintrc`、`.eslintignore`、空根 `.env`（加入 `.gitignore`）及未引用的 `lib/{cn,utils,array,get}.ts`、`styles/animation.css`、`weread/types.ts` 和多余 UnoCSS shortcuts / polyfill。
- 更新 `.github/workflows/deploy.yml` 改为 `workflow_dispatch` 手动触发并适配当前 monorepo 构建路径。
- 加固 `apps/cli/src/actions/{post,memo}.ts`：函数内取当前时间、`createPost` 防重名覆盖并用 `js-yaml` 输出 frontmatter。
- 同步更新 `AGENTS.md` 与 `packages/scripts/README.md`。

## 5. 验证

- `pnpm test`：32/32 通过（`@tabi/scripts` 13 + `@tabi/site` 19）。
- `pnpm typecheck`：`astro check` 与 `@tabi/cli` `tsc --noEmit` 全部通过，0 error。
- `pnpm build` & `pnpm build:cli`：全部构建成功。

## 6. 影响面与回滚

- 影响范围：覆盖表维护路径由 `packages/scripts/overrides/weread/` 调整为 `packages/config/overrides/weread/`，并下线废弃的 `/lab/map` 实验页；其余均为工程与内部清理。
- 回滚方式：`git revert` 对应提交后重新 `pnpm install` 即可。

## 7. 遗留 / 后续

- 无。
