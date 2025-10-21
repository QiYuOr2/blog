import { useState } from "react"

interface PictureProps {
  src: string
  width?: string
  height?: string
  alt?: string
  round?: boolean
}

export default function Picture({ src, width, height, alt, round }: PictureProps) {
  const [isError, setIsError] = useState(false)

  const rounded = round ? 'rounded-full' : 'rounded-sm'

  return (
    <div className={`bg-stone-1 overflow-hidden flex justify-center items-center border border-stone-2 ${rounded}`}  style={{ width, height }} title="Avatar" aria-label="Avatar">
      {
        isError
          ? <div className="flex flex-col justify-center items-center text-stone" >
              <div className="i-mdi:image-off w-6 h-6"></div>
              <span className="text-xs">{ alt }</span>
            </div>
          : <img src={src} alt={alt} onError={() => setIsError(true)} />
      }
    </div>
  )
}