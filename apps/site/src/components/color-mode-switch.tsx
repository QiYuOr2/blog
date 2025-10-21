import { useRef, useState } from "react"
import { colorModeEffect, Mode } from "@/common/color-mode"

const modes = [
  {
    icon: 'i-mingcute:sun-line',
    mode: Mode.Light
  },
  {
    icon: 'i-mingcute:computer-line',
    mode: Mode.System
  },
  {
    icon: 'i-mingcute:moon-line',
    mode: Mode.Dark
  }
]

const colorMode = colorModeEffect()

colorMode.onFollowSystem()


export default function colorModeSwitch() {
  const switchWrapper = useRef<HTMLDivElement>(null)
  const buttons = useRef<HTMLButtonElement[]>([])

  const [mode, setMode] = useState(colorMode.initial)

  const [isActive, setIsActive] = useState(false)
  const [sliderX, setSliderX] = useState(4)

  let timeLock = false
  function timeoutTimeLock() {
    timeLock = true
    setTimeout(() => {
      timeLock = false
    }, 200);
  }

  function setActive(value: boolean) {
    if (isActive === value) {
      return
    }

    if (true) {
      const matchIndex = modes.findIndex(item => item.mode === mode)
      const targetButton = buttons.current[matchIndex]
      const parent = targetButton.parentElement!
      const x = targetButton.getBoundingClientRect().left - parent.getBoundingClientRect().left
      setSliderX(x)
    }

    timeoutTimeLock()
    setIsActive(value)
  }

  function handleSwitchClick(buttonIndex: number, targetMode: Mode) {
    if (timeLock) {
      return
    }

    const targetElement = buttons.current[buttonIndex]
    const wrapperRect = switchWrapper.current!.getBoundingClientRect()
    const rect = targetElement.getBoundingClientRect()

    setSliderX(rect.left - wrapperRect.left)
    setMode(targetMode)
    colorMode.appendToDocument(targetMode)
  }


  const textOpacity = isActive ? 'text-opacity-100' : 'text-opacity-0'
  const iconSize = 'w-4 h-4'

  return (
    <div
      ref={switchWrapper}
      className="w-8 hover:w-23 overflow-hidden transition-x duration-200 transform-gpu rounded-full"
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div 
        className={`box-border w-23 bg-cool-gray-100 dark:bg-true-gray-700 p-1 flex justify-center items-center gap-1 shadow-inner text-xs text-true-gray-400  transform relative  ${textOpacity}`}
        style={{ '--status-x': `${sliderX}px` }}
      >
        <div 
          className={`w-6 h-6 flex items-center justify-center bg-light-50 dark:(bg-dark text-light-50) rounded-full shadow absolute text-black ${isActive ? 'left-$status-x' : 'left-1'} z-99 translate-x duration-100`}
        >
          {modes.map((item) => (
            item.mode === mode && <div key={item.mode} className={`${item.icon} ${iconSize}`}></div>
          ))}
        </div>

        {modes.map((item, index) => (
          <button
            ref={(el) => { (buttons.current[index] = el!) }}
            key={item.mode}
            className="w-6 h-6 flex items-center justify-center relative before:content-[''] before:(absolute top-0 left-0 right-0 bottom-0)"
            onClick={() => handleSwitchClick(index, item.mode)}
          >
            <div className={`${item.icon} ${iconSize}`}></div>
          </button>
        ))}
      </div>
    </div>
  )
}