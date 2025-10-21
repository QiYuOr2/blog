import dayjs from "dayjs";
import { join } from "node:path";
import { log } from '@clack/prompts';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import yaml from 'js-yaml';
import { MEMOS_DIR } from '@tabi/config/paths'
import { fileURLToPath } from "node:url";

const MEMO_PATH = fileURLToPath(MEMOS_DIR);

const year = dayjs().get("year").toString();
const month = (dayjs().get("month") + 1).toString().padStart(2, "0");

const currentPath = `${year}/${month}.yaml`;

const currentTime = new Date();

export const createMemo = async (content = '') => {
  log.info(`Memos 目录: ${MEMO_PATH}`);
  if (!existsSync(join(MEMO_PATH, year))) {
    mkdirSync(join(MEMO_PATH, year));
  }

  const filePath = join(MEMO_PATH, currentPath);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, yaml.dump([]));
  }

  const memos = yaml.load(readFileSync(filePath, 'utf-8')) as Array<any> || [];

  memos.unshift({
    timestamp: currentTime.getTime(),
    type: 'text',
    content: content || "",
    create_at: currentTime.toISOString(),
  });

  writeFileSync(filePath, yaml.dump(memos));

  log.success(content ? `已创建：${filePath} - ${content}` : `已创建：${filePath}`);
};
