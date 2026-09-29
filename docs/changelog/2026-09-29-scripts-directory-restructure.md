# 2026-09-29 · packages/scripts 目录工程化重构（行为等价）

> 范围：`packages/scripts`（CLI 入口、命令、共享工具、覆盖表、测试）
> 类型：重构
> 状态：已完成（单元测试与命令实测通过；站点构建受既有环境问题阻塞，与本改动无关）
> 影响：`pnpm weread:sync` / `pnpm bangumi:sync` / `pnpm summary:gen` 用法不变，脚本入口与文件路径变化

## 0. 摘要

原来 `packages/scripts` 是 3 个平铺的 `.mjs`，各自用 `path.resolve("../../content")` 找数据目录、各自写 JSON、各自拼进度日志，覆盖表直接躺在包根目录。现在改成「一个 CLI 入口 + `commands/` 一命令一文件 + `lib/` 共享工具 + `overrides/` 数据覆盖表 + `test/` 单元测试」，命令名、对外行为与产物格式保持不变；顺手补了 `--out`（把产物写到别处，便于调试对比）和统一的 `.env.local` / `.env` 加载。

## 1. 现象

不是线上故障，是维护成本：

- 三个脚本都重复了「定位仓库根目录 → 拼 content 路径 → `JSON.stringify(data, null, 2)` 落盘 → `main().catch(console.error)`」这套骨架；
- 只有 `generate-summaries` 会读 `.env.local`，`fetch-weread` 得手动 `export WEREAD_API_KEY`（README 里专门写了这条限制）；
- `category-overrides.json` 和 `title-overrides.json` 与 3 个脚本平铺在同一层，看不出哪个脚本在用；
- 没有任何测试；`fetch-weread` 的覆盖表逻辑只能靠「真的同步一次」验证。

## 2. 根因

缺少共享层：路径、环境变量、日志、JSON 读写、参数解析这些横切关注点，在每个脚本里各实现一遍。新增第 4 个脚本时只能复制粘贴，容易漏（例如漏掉 `mkdir`、漏掉覆盖表应用）。

## 3. 方案取舍

| 方案 | 思路 | 代价 | 结论 |
| --- | --- | --- | --- |
| A：保持平铺，只补 README | 改动最小 | 重复代码与不可测试的问题仍在 | 未采用 |
| B：`src/cli.mjs` + `commands/` + `lib/` + `overrides/` + `test/` | 分层清晰，零新增依赖，可直接 `node --test` | 一次性移动文件、更新文档 | **采用** |
| C：改用 TypeScript + 引入 commander / tsx | 类型与参数解析更规范 | 要给 CI 与本地都加编译步骤，脚本包目前无构建流程 | 未采用（见第 7 节） |

## 4. 实施步骤

1. 新增 `src/lib/`：`paths.mjs`（向上查找 `pnpm-workspace.yaml` 定位仓库根目录）、`env.mjs`、`log.mjs`（`info/warn/error/task`）、`json.mjs`（`readJson/writeJson`）、`args.mjs`、`async.mjs`（`sleep/mapLimit`）、`fs.mjs`（`listFiles`）、`http.mjs`（带代理与重试的 GET JSON 客户端）、`overrides.mjs`。
2. 三个脚本按原逻辑搬进 `src/commands/`，导出 `{ name, describe, usage, run }`；只改接线，不改算法与文案。
3. 新增 `src/cli.mjs` 作为唯一入口：注册命令、`--help`、未知命令报错、统一错误处理与退出码。
4. 覆盖表移到 `overrides/weread/`，`package.json` 的 scripts 指向新入口，补 `test` 与 `help`。
5. 新增 `test/`（Node 内置 runner）与 `packages/scripts/README.md`；同步更新 `AGENTS.md`、根 `README.md`。

## 5. 验证

- `node --check`：`src/` 下 13 个 `.mjs` 全部通过。
- `node packages/scripts/src/cli.mjs --help` → 列出 3 个命令，退出码 0；无参数 / 未知命令 → 退出码 1 并打印用法。
- `node --test` 单文件直跑（`packages/scripts` 下）全绿：
  - `test/args.test.mjs`（含 pnpm 透传时插入的裸 `--`）、`test/overrides.test.mjs`（递归覆盖 / 缺失表 / 坏表抛错）、`test/paths.test.mjs`；
  - `test/fetch-weread.test.mjs`：用**已提交的 `content/weread/weread.json`** 反向造接口响应（stub 掉 `globalThis.fetch`），跑完整 `run(["--out", …])` 后断言产物与提交内容深度相等，且字符串等于 `JSON.stringify(expected, null, 2)`（即 2 空格缩进、无行尾换行）——证明重构后的「拉取 → 合并 → 套覆盖表 → 落盘」链路与旧实现等价，覆盖表（分类 / 书名）照旧生效。
- `pnpm summary:gen -- --limit 1` → 走「已有 summary 跳过」分支，退出码 0，未修改任何文章文件（`git status` 无 content/posts 变更）。
- 未覆盖：真实 API 拉取（需要 Key 与网络）、`fetch-bangumi` 的代理分支。

注：本机沙箱里 `pnpm test`（`node --test test/`）会因 Node 测试运行器 spawn 子进程被限制而报 `EPERM`；直接 `node test/*.test.mjs` 正常，CI / 本地常规环境不受影响。

## 6. 影响面与回滚

- 行为变化：只有两处新增——所有命令都会读根目录 `.env.local` / `.env`（优先级：shell > `.env.local` > `.env`），`fetch-weread` / `fetch-bangumi` 新增 `--out <file>`；拉取与写盘的数据格式、字段、命令名、npm script 名全部不变。
- 站点无影响：页面只读 `content/**/*.json`，不 import 脚本。
- CI 无影响：`.github/workflows/sync-weread.yml` 调用的 `pnpm weread:sync` 保持不变。
- 回滚：revert 这次改动即可；注意 `overrides/` 需要移回包根目录并同步 `fetch-weread` 的取表路径（`overrideTableFile`）。

## 7. 遗留 / 后续

- `.github/workflows/sync-weread.yml` 里的「Verify data」仍是内联 `node -e`，可以后续收成一个命令（如 `verify-weread`）复用。
- 脚本包没有接入 lint / typecheck：仓库根没有统一 lint 流水线，且脚本目前是纯 JS（方案 C 的代价）；若要上类型，先想清楚 `.mjs` 是否换成 `.ts` + 构建。
- `http.mjs` 的代理实现只覆盖 `http://` 代理与 GET JSON，够 `fetch-bangumi` 用；要复用到别的接口时再抽。
