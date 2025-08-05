import { date, sortByDate } from "@/collections/posts"
import { isExternalPost, type ExternalPost } from "@/externals"
import Post from "./post"
import type { CollectionEntry } from "astro:content"
import type { ComponentProps } from "react"

interface PostListProps extends ComponentProps<'div'> {
  posts: Partial<Record<string, (CollectionEntry<'posts'> | ExternalPost)[]>>
}

export function PostList({ posts, ...rest }: PostListProps) {

  const PostRender = (post: ExternalPost | CollectionEntry<"posts">) => (
    isExternalPost(post) 
    ?
      <Post
        key={post.link}
        title={post.title}
        path={post.link}
        summary={post.description}
        date={date(post as any)}
        tags={post.tags}
        isExternal
      />
    :
      <Post
        key={post.id}
        title={post.data.title}
        path={`/${post.id}`}
        summary={post.data.description}
        date={date(post)}
        tags={post.data.tags}
      />
  )

  return (
    <div {...rest}>
    {
      Object.keys(posts)
        .sort((a, b) => Number(b) - Number(a))
        .map(year => 
          <div className="mb-8">
            <div className="text-2xl font-bold">{year}</div>
            <div>
              {
                posts[year]
                  ?.sort(sortByDate)
                  .map(PostRender)
              }
            </div>
          </div>
        )
    }
    </div>
  )
}