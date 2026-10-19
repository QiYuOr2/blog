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
        ├── title-overrides.json
        └── series-overrides.json
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

微信读书返回的书名/分类常带版本后缀或运营后缀，且不能改线上数据，所以用覆盖表在生成时改写。`category-overrides` 与 `title-overrides` 都以 `bookId` 为 key，不存在时按空表处理，格式写错会直接报错。

| 文件 | 覆盖字段 | 作用范围 |
| --- | --- | --- |
| `overrides/weread/category-overrides.json` | `category` | 只作用于书架条目 |
| `overrides/weread/title-overrides.json` | `title` | 所有书籍对象（书架、阅读榜单等） |
| `overrides/weread/series-overrides.json` | `name` + `books`（bookId → 卷号） | 只被 `apps/site` 读书页读取，不属于同步产物 |

### series-overrides.json

**读书页的系列合并完全由这张白名单决定，不做任何书名推断。** 没登记的书一律按单本展示。

这样做是因为书名规律追不上真实数据的写法——同一系列可能一本带全名前缀、另一本只剩缩写，还有简繁混排、换译名、第 1 部没有卷号等情况：

```
君主·埃尔梅罗二世事件簿1　case.剥离塔阿德拉
事件簿2　case.双貌塔伊泽路玛（上）      ← 缩写掉了系列前缀
沙丘 / 沙丘2：沙丘救世主             ← 第 1 部没有卷号
安达与岛村 / 安達與島村2 / 安達與島村3   ← 简繁混排 + 紧贴数字
```

格式是一个数组，每条一个系列：

```json
[
  {
    "name": "君主·埃尔梅罗二世事件簿",
    "books": {
      "CB_DJAG6aG5IG2H72r71YBUd0Lr": 1,
      "CB_D2iG6eG5IG2H72r71YBclDEe": 2
    }
  }
]
```

- `name`：合并后卡片上显示的系列名；
- `books`：bookId → 卷号（正整数），决定展开后各分册的先后顺序；不同书可以有相同卷号（如同一卷的不同版本），此时按书架顺序稳定排列；
- 同一本书出现在两个系列里、卷号不是正整数、缺少 `name`/`books`，构建时都会直接报错；
- **系列卡始终展示**，不受读书页 10 分钟阅读时长门槛限制（单本卡片仍受限）；
- 只登记了 1 册的系列没有折叠意义，仍按单本展示。

这个表由 `apps/site` 用 Vite 的 `import.meta.glob` 直接读取，修改后重新构建即可生效，不需要跑同步脚本。`fetch-weread` 不读取它。

**新增一本书进某个系列时**：从书架或微信读书详情页拿到 `bookId`，在对应系列的 `books` 里加上「bookId: 卷号」即可。漏登记只会让那本书显示为单本卡片，不会丢书。

数据同步 workflow 每天重跑 `fetch-weread`，直接改 `content/weread/weread.json` 会被覆盖——要改分类、书名或系列，请改这里的覆盖表。

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
