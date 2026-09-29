#!/usr/bin/env node
import fetchBangumi from "./commands/fetch-bangumi.mjs";
import fetchWeread from "./commands/fetch-weread.mjs";
import generateSummaries from "./commands/generate-summaries.mjs";
import { error, info } from "./lib/log.mjs";

/**
 * 所有脚本统一从这里进入：`node src/cli.mjs <command> [options]`。
 * 新增脚本时只要在 COMMANDS 里注册一个模块即可（模块导出 { name, describe, usage, run }）。
 */
const COMMANDS = [fetchWeread, fetchBangumi, generateSummaries];
const COMMAND_BY_NAME = new Map(COMMANDS.map((command) => [command.name, command]));

const NAME_COLUMN_WIDTH = 22;

function formatCommandLine(command) {
  return `  ${command.name.padEnd(NAME_COLUMN_WIDTH)}${command.describe}`;
}

function formatCommandHelp(command) {
  const usage = command.usage ? ` ${command.usage}` : "";
  return `node packages/scripts/src/cli.mjs ${command.name}${usage}\n  ${command.describe}`;
}

function printUsage(write = info) {
  write("用法：pnpm <script> [-- <options>]");
  write("      node packages/scripts/src/cli.mjs <command> [options]");
  write("");
  write("可用命令：");
  for (const command of COMMANDS) {
    write(formatCommandLine(command));
  }
  write("");
  write("查看单个命令的参数：<command> --help");
  write("仓库根目录下的快捷方式：pnpm weread:sync / pnpm bangumi:sync / pnpm summary:gen");
}

async function main() {
  const [commandName, ...args] = process.argv.slice(2);

  if (!commandName) {
    printUsage(error);
    process.exitCode = 1;
    return;
  }

  if (commandName === "help" || commandName === "--help" || commandName === "-h") {
    printUsage();
    return;
  }

  const command = COMMAND_BY_NAME.get(commandName);
  if (!command) {
    error(`未知命令：${commandName}`);
    printUsage(error);
    process.exitCode = 1;
    return;
  }

  if (args.includes("--help") || args.includes("-h")) {
    info(formatCommandHelp(command));
    return;
  }

  try {
    await command.run(args);
  } catch (err) {
    error(`[${command.name}] ${err?.stack || err?.message || String(err)}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  error(err?.stack || String(err));
  process.exitCode = 1;
});
