import { createAction } from "./internal.mjs";
import dayjs from "dayjs";
import { join } from "node:path";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import yaml from 'js-yaml';

const MEMO_PATH = "./memos";

const year = dayjs().get("year").toString();
const month = (dayjs().get("month") + 1).toString().padStart(2, "0");

const currentPath = `${year}/${month}.yaml`;

const currentTime = new Date();

export const createMemo = createAction("memo", (args) => {
  if (!existsSync(join(MEMO_PATH, year))) {
    mkdirSync(join(MEMO_PATH, year));
  }

  const filePath = join(MEMO_PATH, currentPath);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, yaml.dump([]));
  }

  const memos = yaml.load(readFileSync(filePath, 'utf-8')) || [];

  memos.unshift({
    timestamp: currentTime.getTime(),
    type: 'text',
    content: args[0] || "",
    create_at: currentTime.toISOString(),
  });

  writeFileSync(filePath, yaml.dump(memos));
});
