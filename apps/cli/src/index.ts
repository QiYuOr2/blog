import { cac } from "cac";
import { log } from "@clack/prompts";
import { version } from "../package.json";
import { createPost } from './actions/post'
import { createMemo } from './actions/memo'

const cli = cac("tabi");

cli.help().version(version);

cli.command("post <title>", "Create a new blog post").action(createPost)
cli.command("memo <content>", "Create a new memo").action(createMemo)

export async function run() {
  if (process.argv.length <= 2) {
    cli.outputHelp();
    process.exit(0);
  }

  cli.parse(process.argv, { run: false });

  try {
    await cli.runMatchedCommand();
  } catch (error) {
    log.error(String(error));
    process.exit(1);
  }
}
