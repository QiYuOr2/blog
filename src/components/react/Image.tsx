import { useState } from "react"

interface ImageProps {
  src: string
  width?: string
  height?: string
  alt?: string
  round?: boolean
}

export default function Image({ src, width, height, alt, round }: ImageProps) {
  const [isError, setIsError] = useState(false)

  const rounded = round ? 'full' : 'sm'

  return (
    <div className={`bg-stone-1 overflow-hidden flex justify-center items-center border border-stone-2 ${rounded}`}  style={{ width, height }}>
      {
        isError
          ? <img src={src} alt={alt} onError={() => setIsError(false)} />
          : <div className="flex flex-col justify-center items-center text-stone" >
              <div className="i-mdi:image-off w-6 h-6"></div>
              <span className="text-xs">{ alt }</span>
            </div>
      }
    </div>
  )
}