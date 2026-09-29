# @tabi/scripts

数据拉取与批量处理脚本。所有脚本共用一套 `lib/` 工具和一个 CLI 入口，避免每个脚本各自解析路径、读写 JSON、拼日志。

## 目录结构

```
packages/scripts/
├── src/
│   ├── cli.mjs              # 唯一入口：命令注册 + 分发 + --help
│   ├── commands/            # 一个命令一个文件，导出 { name, describe, usage, run }
│   │   ├── fetch-weread.mjs
│   │   ├── fetch-bangumi.mjs
│   │   └── generate-summaries.mjs
│   └── lib/                 # 可复用工具，不放业务逻辑
│       ├── args.mjs         # 极简参数解析（--flag / --key value / --key=value）
│       ├── async.mjs        # sleep / mapLimit
│       ├── env.mjs          # 加载仓库根目录的 .env.local、.env
│       ├── fs.mjs           # 递归列出指定扩展名的文件
│       ├── http.mjs         # 带代理与重试的 GET JSON 客户端
│       ├── json.mjs         # readJson / writeJson
│       ├── log.mjs          # info / warn / error / task
│       ├── overrides.mjs    # 覆盖表的读取与应用
│       └── paths.mjs        # monorepo 根目录、content 子目录、产物路径
└── overrides/               # 手工维护的数据覆盖表（按数据源分目录）
    └── weread/
        ├── category-overrides.json
        └── title-overrides.json
```

## 命令

| 命令 | 仓库根目录快捷方式 | 说明 |
| --- | --- | --- |
| `fetch-weread` `[--out <file>]` | `pnpm weread:sync` | 拉取微信读书数据 → `content/weread/weread.json` |
| `fetch-bangumi` `[--out <file>]` | `pnpm bangumi:sync` | 拉取 Bangumi 动画收藏 → `content/bangumi/bangumi.json` |
| `generate-summaries` `[--force] [--dry-run] [--limit N]` | `pnpm summary:gen` | 为缺少 `summary` 的文章生成 AI 摘要 |

`--out` 用于把结果写到别的文件（默认覆盖 `content/` 下的产物），调试或对比数据时不会动到仓库里的数据。

```bash
pnpm weread:sync
pnpm summary:gen -- --dry-run --limit 3   # 透传参数给脚本
pnpm --filter @tabi/scripts test         # 单元测试（node --test）
node packages/scripts/src/cli.mjs --help  # 查看命令列表
node packages/scripts/src/cli.mjs generate-summaries --help
```

> pnpm 会先解析自己认识的参数（如 `--dry-run`），透传自定义参数时要加 `--`。

脚本用文件位置向上查找 `pnpm-workspace.yaml` 定位仓库根目录，因此在任意工作目录下执行结果一致。

## 环境变量

命令启动时会依次加载仓库根目录的 `.env.local`、`.env`，优先级为 **shell 环境变量 > `.env.local` > `.env`**（`process.loadEnvFile` 不覆盖已有变量）。模板见根目录 `.env.example`。

| 变量 | 用于 | 默认值 |
| --- | --- | --- |
| `WEREAD_API_KEY` | `fetch-weread` | 必填 |
| `AI_API_KEY` | `generate-summaries` | 必填 |
| `AI_BASE_URL` | `generate-summaries` | `https://api.deepseek.com` |
| `AI_MODEL` | `generate-summaries` | `deepseek-v4-flash` |
| `BGM_USERNAME` | `fetch-bangumi` | `qiyuor2` |
| `BGM_API_BASE` | `fetch-bangumi` | `https://api.bgm.tv` |
| `BGM_LIMIT` / `BGM_TIMEOUT_MS` / `BGM_REQUEST_DELAY_MS` | `fetch-bangumi` | `50` / `30000` / `300` |
| `HTTPS_PROXY`（或 `HTTP_PROXY`）+ `NO_PROXY` | `fetch-bangumi` | 无 |

## 覆盖表

微信读书返回的书名/分类常带版本后缀或运营后缀，且不能改线上数据，所以用覆盖表在生成时改写。两个表都以 `bookId` 为 key，不存在时按空表处理，格式写错会直接报错。

| 文件 | 覆盖字段 | 作用范围 |
| --- | --- | --- |
| `overrides/weread/category-overrides.json` | `category` | 只作用于书架条目 |
| `overrides/weread/title-overrides.json` | `title` | 所有书籍对象（书架、阅读榜单等） |

数据同步 workflow 每天重跑 `fetch-weread`，直接改 `content/weread/weread.json` 会被覆盖——要改分类或书名请改这里的覆盖表。

## 新增一个命令

1. 在 `src/commands/` 新建 `my-task.mjs`，导出 `{ name, describe, usage, run }`，`run` 接收参数数组；
2. 在 `src/cli.mjs` 的 `COMMANDS` 里注册；
3. 在 `package.json` 的 `scripts` 里加一行 `"my-task": "node ./src/cli.mjs my-task"`，需要的话再在仓库根目录 `package.json` 加对应快捷方式。

纯函数抽到 `src/lib/` 后，顺手在 `test/` 加一个 `*.test.mjs`。

## 约定

- 路径统一从 `lib/paths.mjs` 取，不在命令里拼 `../../content`。
- 日志统一走 `lib/log.mjs`（进度用 `task()`，结果用 `info()`）。
- 产物 JSON 一律 `lib/json.mjs` 的 `writeJson`：2 空格缩进、行尾不带换行，避免自动同步产生无意义的格式 diff。
- `generate-summaries` 用 gray-matter 回写会规范化 frontmatter（`date`/`pubDate` 加引号、`tags` 展开成列表、长 `description` 折叠成 `>-`）：值不变，但提交前看一眼 diff。
