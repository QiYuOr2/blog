import { createAction } from "./internal.mjs";
import dayjs from "dayjs";
import { join } from "node:path";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const dateTime = dayjs().format("YYYY/MM/DD HH:mm:ss");

const POST_PATH = "./posts";

export const createPost = createAction("post", (args) => {
  const fileName = args[0] ?? "new-post";

  const year = dayjs().format("YYYY");

  const frontmatter = `---
title: ${fileName}
date: ${dateTime}
pubDate: ${dateTime}
description: description
category: 技术
tags: []
---
`;

  if (!existsSync(join(POST_PATH, year))) {
    mkdirSync(join(POST_PATH, year));
  }

  writeFileSync(join(POST_PATH, year, `${fileName}.md`), frontmatter);
});
