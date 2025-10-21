import dayjs from "dayjs";
import { join } from "node:path";
import { log } from '@clack/prompts';
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { POSTS_DIR } from '@tabi/config/paths'
import { fileURLToPath } from "node:url";

const dateTime = dayjs().format("YYYY/MM/DD HH:mm:ss");

const POST_PATH = fileURLToPath(POSTS_DIR)

export const createPost = async (fileName = 'new-post') => {
  log.info(`Posts 目录: ${POST_PATH}`);
  const year = dayjs().format("YYYY");

  const frontmatter = [
    `---`,
    `title: ${fileName}`,
    `date: ${dateTime}`,
    `pubDate: ${dateTime}`,
    `description: _description_`,
    `category: 技术`,
    `tags: []`,
    `---`
  ].join("\n");

  if (!existsSync(join(POST_PATH, year))) {
    mkdirSync(join(POST_PATH, year));
  }

  writeFileSync(join(POST_PATH, year, `${fileName}.md`), frontmatter);

  log.success(`已创建：${join(POST_PATH, year, `${fileName}.md`)}`);
};
