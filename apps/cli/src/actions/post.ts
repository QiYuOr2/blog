import dayjs from "dayjs";
import { join } from "node:path";
import { log } from "@clack/prompts";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import yaml from "js-yaml";
import { POSTS_DIR } from "@tabi/config/paths";
import { fileURLToPath } from "node:url";

const POST_PATH = fileURLToPath(POSTS_DIR);

export const createPost = async (fileName = "new-post") => {
  log.info(`Posts 目录: ${POST_PATH}`);
  const now = dayjs();
  const year = now.format("YYYY");
  const dateTime = now.format("YYYY/MM/DD HH:mm:ss");

  const yearDir = join(POST_PATH, year);
  const filePath = join(yearDir, `${fileName}.md`);

  if (existsSync(filePath)) {
    throw new Error(`文章已存在，已取消覆盖：${filePath}`);
  }

  const frontmatterBody = yaml.dump(
    {
      title: fileName,
      date: dateTime,
      pubDate: dateTime,
      description: "_description_",
      category: "技术",
      tags: [],
    },
    { lineWidth: -1 },
  );
  const frontmatter = `---\n${frontmatterBody}---\n`;

  mkdirSync(yearDir, { recursive: true });
  writeFileSync(filePath, frontmatter, "utf-8");

  log.success(`已创建：${filePath}`);
};
