import { findMonorepoRoot } from '@tabi/utils'
import { sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const PROJECT_ROOT = pathToFileURL(findMonorepoRoot(process.cwd()) + sep)

export const POSTS_DIR = new URL("./content/posts/", PROJECT_ROOT);
export const MEMOS_DIR = new URL("./content/memos/", PROJECT_ROOT);
