import Giscus from '@giscus/react'
import { colorModeEffect, Mode } from '../common/colorMode'
import { useEffect, useState } from 'react'

export default function Comments() {
  const colorMode = colorModeEffect()

  function format(value: Mode) {
    return value === Mode.System ? Mode.Light : value
  }

  const [mode, setMode] = useState((format(colorMode.getCurrentMode())))

  function commentColorModeChange(value: Mode) {
    setMode(format(value))
  }

  useEffect(() => {
    colorMode.addEventListener(commentColorModeChange)
    return () => {
      colorMode.removeEventLister(commentColorModeChange)
    }
  }, [])

  return (
    <div className="py-7 sm:w-[95%]">
      <Giscus
        id="comments"
        repo="QiYuOr2/blog"
        repoId="R_kgDOGlnN5w"
        category="Announcements"
        categoryId="DIC_kwDOGlnN584COx7K"
        mapping="url"
        reactions-enabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={mode}
        lang="zh-CN"
      />
    </div>
  )
}