#!/usr/bin/env zx
import { minimist } from "zx";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dateTime = new Date().toLocaleString();
const POST_PATH = "./src/pages/posts";

setup({
  actions: [
    createAction("new", (args) => {
      const fileName = args[0] ?? "new-post";

      const year = new Date(dateTime).getFullYear().toString();

      const frontmatter = `---
title: "Hello"
date: ${dateTime}
pubDate: ${dateTime}
description: description
layout: ../../../layouts/Post.astro
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

/**
 * @param {string | string[]} actionName
 * @param {(args: string[]) => void} handler
 * @returns {Action | Action[]}
 */
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
