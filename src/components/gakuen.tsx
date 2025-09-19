import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import { useRef, useState, useEffect, useMemo } from "react";

const MAX_ROTATE = 20;

export function Gakuen() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [rotateMouse, setRotateMouse] = useState({ x: 0, y: 0 });
  const { rotate: rotateDevice, enabled, toggleOrientation } = useDeviceOrientation(MAX_ROTATE);

  const rotate = useMemo(() => {
    if (rotateMouse.x !== 0 || rotateMouse.y !== 0) {
      return rotateMouse
    }
    return {
      x: rotateMouse.x + rotateDevice.x,
      y: rotateMouse.y + rotateDevice.y,
    }
  }, [rotateDevice, rotateMouse])

  useEffect(() => {
    let animation: number;
    const target = parallaxRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!target) {
        return;
      }
      const rect = target.getBoundingClientRect();

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      animation = requestAnimationFrame(() => {
        setRotateMouse({
          x: MAX_ROTATE * (centerY - offsetY) / centerY,
          y: MAX_ROTATE * (centerX - offsetX) / centerX,
        })
      })
    }

    const handleMouseLeave = () => {
      setTimeout(() => {
        setRotateMouse({ x: 0, y: 0 })
      }, 300);
    }

    target?.addEventListener('mousemove', handleMouseMove);
    target?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      target?.removeEventListener('mousemove', handleMouseMove);
      target?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animation);
    }
  }, [])

  return (
    <>
      <div
        ref={parallaxRef}
        style={{
          '--parallax-offset': 1,
          '--parallax-rotateX': rotate.x,
          '--parallax-rotateY': rotate.y,
          '--max-rotate': MAX_ROTATE
        }}
        className="bg-[#7A99CF] p-[4%] parallax-card shadow-2xl duration-100"
      >
        <div className="bg-white p-[5%] pt-[2%] rounded-tr-xl rounded-bl-xl relative">
          <div className="flex justify-between">
            <div className="flex-1 flex flex-col  pt-[4%]">
              <img className="w-[80%]" src="/assets/info.svg" alt="秦谷美鈴担当　柒宇P" />
              <img
                className="w-[24%] mt-[4%] ml-[2%]"
                src="/assets/stars.svg"
                alt="装饰图标"
              />
              <img 
                className="w-[18%] mt-auto"
                src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/gakuen_card_lingdang.png"
                alt="秦谷美铃签名中的铃铛"
              />
            </div>
            <div 
              className="relative w-[48%] pt-[8%] ml-[6%] parallax-items"
              style={{ '--parallax-offset': 1 * 1.5 }}
            >
              <img className="z-0 bottom-0 right-0 w-full shadow-lg rounded-[20px]" src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/gakuen_card_rect_bg.png" alt="方形背景" />
              <div className="absolute z-1 bottom-0 right-0 transform scale-109 origin-bottom-right">
                <img
                  className="parallax-items"
                  style={{ '--parallax-offset': 2 * 1.5 }}
                  src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/gakuen_card_misuzu.png"
                  alt="秦谷美铃无背景人物" 
                />
              </div>
            </div>
          </div>
          <img className="absolute bottom-[6%] w-[40%]" src="/assets/misuzu_hataya.svg" alt="Misuzu Hataya" />
        </div>
      </div>
      <label className="inline-flex items-center cursor-pointer mt-5">
        <input type="checkbox" value="" className="sr-only peer" checked={enabled} onChange={() => toggleOrientation()} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-[rgb(59,105,61)] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[rgb(59,105,61)] dark:peer-checked:bg-[rgb(59,105,61)]"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">陀螺仪</span>
      </label>
    </>
  )
}