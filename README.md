# 个人博客

基于 Astro 制作的静态博客

## TODO

- 分页

## 数据同步

微信读书阅读数据由 `.github/workflows/sync-weread.yml` 每天自动同步：拉取最新数据写入 `content/weread/weread.json` 并提交，推送后 Vercel 会自动重新部署。

首次使用需要在仓库 Settings → Secrets and variables → Actions 里配置 `WEREAD_API_KEY`（微信读书 Agent API Key）。也可以随时在该 workflow 的 Actions 页面手动触发（Run workflow）。

本地手动执行 `pnpm weread:sync` 时也需要这个 key，但同步脚本不读 `.env` 文件，得先 `export WEREAD_API_KEY=xxx`（PowerShell：`$env:WEREAD_API_KEY="xxx"`）。
