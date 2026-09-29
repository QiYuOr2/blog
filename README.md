# 个人博客

基于 Astro 制作的静态博客

## TODO

- 分页

## 数据同步

微信读书阅读数据由 `.github/workflows/sync-weread.yml` 每天自动同步：拉取最新数据写入 `content/weread/weread.json` 并提交，推送后 Vercel 会自动重新部署。

首次使用需要在仓库 Settings → Secrets and variables → Actions 里配置 `WEREAD_API_KEY`（微信读书 Agent API Key）。也可以随时在该 workflow 的 Actions 页面手动触发（Run workflow）。

脚本都在 `packages/scripts`，命令有 `pnpm weread:sync` / `pnpm bangumi:sync` / `pnpm summary:gen`，目录结构、环境变量与覆盖表说明见 [packages/scripts/README.md](./packages/scripts/README.md)。

本地执行时会自动读取仓库根目录的 `.env.local` / `.env`（优先级：shell 环境变量 > `.env.local` > `.env`），把 `WEREAD_API_KEY`、`AI_API_KEY` 填进 `.env.local`（已被 gitignore，模板见 `.env.example`）即可，不必再手动 `export`。
