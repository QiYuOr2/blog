import dayjs from "dayjs";
import { join } from "node:path";
import { log } from "@clack/prompts";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import yaml from "js-yaml";
import { MEMOS_DIR } from "@tabi/config/paths";
import { fileURLToPath } from "node:url";

const MEMO_PATH = fileURLToPath(MEMOS_DIR);

export const createMemo = async (content = "") => {
  log.info(`Memos 目录: ${MEMO_PATH}`);
  const currentTime = new Date();
  const now = dayjs(currentTime);
  const year = now.format("YYYY");
  const month = now.format("MM");

  const yearDir = join(MEMO_PATH, year);
  mkdirSync(yearDir, { recursive: true });

  const filePath = join(yearDir, `${month}.yaml`);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, yaml.dump([]), "utf-8");
  }

  const memos = (yaml.load(readFileSync(filePath, "utf-8")) as Array<unknown>) || [];

  memos.unshift({
    timestamp: currentTime.getTime(),
    type: "text",
    content: content || "",
    create_at: currentTime.toISOString(),
  });

  writeFileSync(filePath, yaml.dump(memos), "utf-8");

  log.success(content ? `已创建：${filePath} - ${content}` : `已创建：${filePath}`);
};
