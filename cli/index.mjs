#!/usr/bin/env zx
import { minimist } from "zx";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import dayjs from 'dayjs';

const dateTime = dayjs().format("YYYY/MM/DD HH:mm:ss");
const POST_PATH = "./posts";

setup({
  actions: [
    createAction("new", (args) => {
      const fileName = args[0] ?? "new-post";

      const year = dayjs().format("YYYY");

      const frontmatter = `---
title: ${fileName}
date: ${dateTime}
pubDate: ${dateTime}
description: description

tags: []
---
`;

      if (!existsSync(join(POST_PATH, year))) {
        mkdirSync(join(POST_PATH, year));
      }

      writeFileSync(join(POST_PATH, year, `${fileName}.md`), frontmatter);
    }),
  ],
});

function setup(options) {
  const { actions } = options;
  const { action, actionArgs } = readArgv();
  const selectedAction = actions.flat().find((a) => a.actionName === action);

  if (!selectedAction) {
    console.log("Action not found");
    return;
  }

  selectedAction.handler(actionArgs);
}

function createAction(actionName, handler) {
  if (Array.isArray(actionName)) {
    return actionName.map((name) => createAction(name, handler));
  }

  return {
    actionName,
    handler,
  };
}

function readArgv() {
  const argv = minimist(process.argv.slice(2));

  return {
    action: argv._[1],
    actionArgs: argv._.slice(2),
  };
}
