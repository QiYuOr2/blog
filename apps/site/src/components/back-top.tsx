import { useEffect, useState } from "react"

export default function BackTop() {
  const [visible, setVisible] = useState(false)

  function checkVisible() {
    setVisible(window.scrollY > 300)
  }

  useEffect(() => {
    window.addEventListener("scroll", checkVisible)
    return () => {
      window.removeEventListener("scroll", checkVisible)
    }
  }, [])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const fadeInOut = visible ? 'opacity-100' : 'opacity-0'

  return (
    <div className={`${fadeInOut} fixed bottom-8 right-8 text-2xl text-stone cursor-pointer transition-all duration-300 hover:(text-stone-9 transition-all)`} onClick={scrollToTop}>
      <div className="i-mdi:arrow-top-bold w-7 h-7" />
    </div>
  )
}