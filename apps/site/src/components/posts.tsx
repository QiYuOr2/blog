import { cn } from '@/common/utils'
import { date, sortByDate } from "@/collections/posts"
import { isExternalPost, type ExternalPost } from "@/externals"
import type { CollectionEntry } from "astro:content"
import type { ComponentProps } from "react"

interface PostProps {
  title: string
  path: string
  summary?: string
  date: string,
  tags?: string | string[]
  isExternal?: boolean
}

function NoteTag() {
  return (
    <div className={cn(
      'md:(absolute -left-8 top-1/2 transform -translate-y-1/2)',
      '',
      'px-1 py-0.5 rounded',
      'text-[0.6rem] font-bold opacity-65 bg-true-gray-300  text-true-gray-800',
      'dark:bg-true-gray-600 dark:text-true-gray-200'
    )}>
      笔记
    </div>
  )
}

export function Post({ title, path, date, isExternal, tags }: PostProps) {
  return (
    <a href={path} target={isExternal ? '_blank' : '_self'} className="no-underline relative">
      <li className={cn(
        "flex flex-col sm:flex-row gap-2 py-2 px-8 my-2 mx--8",
        "list-none cursor-pointer"
      )}>
        <div className="flex transition-all duration-300 text-[1.1rem] text-true-gray-800 dark:text-true-gray-200 hover:text-warm-gray-900 dark:hover:text-warm-gray-50">
          <div>{ title }</div>
          {isExternal && <div className="i-fluent:arrow-up-right-20-filled text-[0.6rem] ml-[0.3rem] text-true-gray-500 dark:text-true-gray-400 text-opacity-80" />}
        </div>
        <div className="flex items-center time gap-2">
          <div>
            { date.split(' ')[0].split('/').slice(1).join('/') }
          </div>
          {tags?.includes('笔记') && <NoteTag />}
        </div>
      </li>
    </a>
  )
}


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
                (posts[year] as CollectionEntry<'posts'>[])
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