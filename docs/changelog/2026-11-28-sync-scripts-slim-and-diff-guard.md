# 数据同步脚本字段裁剪、无变更跳过写入与 CI 提速

## 0. 摘要

为 `fetch-bangumi` 与 `fetch-weread` 补齐落盘字段白名单裁剪、无实质变更跳过写入（保留旧 `updatedAt`）、微信读书接口超时重试与限流并发，并将同步 workflow 的依赖安装收敛到 `@tabi/scripts`。

- 日期：2026-11-28
- 范围：`packages/scripts`、`apps/site/src/features/bangumi`、`.github/workflows/sync-*.yml`
- 类型：优化 / 重构

## 1. 现象

1. `content/weread/weread.json`（1.8 MB）与 `content/bangumi/bangumi.json`（1.1 MB）合计近 3 MB，仓库 431 个提交中已有 104 个（约 24%）为自动同步提交。
2. `git log --stat` 显示 `bangumi.json` 每天无故改动 9,000–12,000 行、`weread.json` 每天改动 1,000–1,700 行，且即便无新阅读或追番记录，每天也会因为刷新 `updatedAt` 触发 commit 与 Vercel 重建。
3. `fetch-weread.mjs` 使用裸 `fetch`（无超时/重试，网关返 502 HTML 时报错不直观）且全部串行请求；同步 workflow 每次都安装整个 monorepo 依赖。

## 2. 根因

- 同步脚本将上游接口全量字段（如 Bangumi 每日浮动的 `tags[].count`、`short_summary`、5 套封面 URL；WeRead 未消费的 `weekly/monthly/annually` modes、书籍 `intro` 等）直接落盘，且每次无条件覆盖 `updatedAt`。
- 同步 workflow 执行全仓 `pnpm install --frozen-lockfile`，将前端框架与工具链一并拉取。

## 3. 方案取舍

- **前端 schema 向后兼容**：在 `apps/site/src/features/bangumi/schema.ts` 与 `types.ts` 中将 `date`、`rank`、`images.{grid,large,medium,common}` 调整为可选，既兼容现有历史 JSON，又允许新产物大幅瘦身。
- **语义比较忽略 `updatedAt`**：在 `packages/scripts/src/lib/json.mjs` 提供 `writeJsonIfChanged`，比较剔除 `updatedAt` 后的 JSON 文本，一致则不改写文件，让 GitHub Action 的 `git status --porcelain` 自然跳过无意义提交。
- **微信读书温和并发**：保留 `globalThis.fetch`（便于单测 mock），补 `AbortSignal.timeout(30_000)` + 429/5xx/网络错误退避重试，并复用 `mapLimit(..., 4)` 加速拉取。

## 4. 实施步骤

- `packages/scripts/src/lib/json.mjs`：新增 `writeJsonIfChanged`。
- `packages/scripts/src/commands/fetch-bangumi.mjs`：新增 `slimCollectionItem`，改用 `writeJsonIfChanged`。
- `packages/scripts/src/commands/fetch-weread.mjs`：新增 `slimShelfBook` / `slimProgressEntry`；仅拉取 `overall` 统计与 6 个月日级热力图；补超时重试与 `mapLimit`（并发度 4）；改用 `writeJsonIfChanged`。
- `apps/site/src/features/bangumi/schema.ts` & `types.ts`：将前端不展示的字段设为可选。
- `.github/workflows/sync-weread.yml` & `sync-bangumi.yml`：安装命令改为 `pnpm install --frozen-lockfile --filter @tabi/scripts...`，移除 `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD`。
- `packages/scripts/test/fetch-weread.test.mjs` & `json-and-bangumi.test.mjs`：更新并补充裁剪与无变更跳过写入单测。

## 5. 验证

- `pnpm --filter @tabi/scripts test`：13/13 通过（含 `fetch-weread` 端到端裁剪与二次运行无变更跳过断言、`slimCollectionItem`、`writeJsonIfChanged`）。
- `pnpm build`：使用现有未裁剪的 `content/*.json` 构建全站 84 页成功，验证向后兼容。

## 6. 影响面与回滚

- 影响范围：下次定时或手动同步后，`content/weread/weread.json` 与 `content/bangumi/bangumi.json` 将按精简结构落盘，体积与后续日常 diff 显著减小。
- 回滚方式：`git revert` 对应提交即可恢复旧落盘逻辑。

## 7. 遗留 / 后续

- 建议手动触发一次 `Sync WeRead` / `Sync Bangumi` 或本地执行 `pnpm weread:sync` / `pnpm bangumi:sync`，让仓库中的两份 JSON 立即切换到精简版。
