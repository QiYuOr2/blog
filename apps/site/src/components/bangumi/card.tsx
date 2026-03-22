interface BangumiCardProps {
  id: number
  image: string
  name: string
  score: number
  rank: number
}


function toBangumi (id: number) {
  open(`https://bgm.tv/subject/${id}`, '_blank')
}

export function Card({ image, name, score, id }: BangumiCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:(shadow-xl translate-y-[-2px]) transition-all transition-duration-150"
      onClick={() => toBangumi(id)}
    >
      <img
        src={image}
        alt={name}
        className="h-full object-cover"
      />
      <div className="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
      <div className="px-2 py-2 absolute bottom-0 text-white text-xs">{name}</div>
      <div className="px-1 py-0.5 text-xs absolute top-1 right-1 bg-[rgba(0,0,0,0.6)] text-white rounded opacity-85">{score}</div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg h-36 md:h-48 lg:h-48 w-full skeleton"></div>
  )
}