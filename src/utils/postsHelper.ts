import type { MarkdownInstance } from "astro";

export function sortByDate(pre: MarkdownInstance<Frontmatter>, current: MarkdownInstance<Frontmatter>) {
  return new Date(current.frontmatter.date).getTime() - new Date(pre.frontmatter.date).getTime();
}

export function query(post: MarkdownInstance<Frontmatter>) {
  return !post.frontmatter.isTalk && !post.frontmatter.draft;
}
