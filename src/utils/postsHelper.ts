export const query = (post: any) => !post.frontmatter.isTalk
export const sortByDate = 
  (pre: any, current:any) => new Date(current.frontmatter.date).getTime() - new Date(pre.frontmatter.date).getTime()