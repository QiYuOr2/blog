import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import { useRef, useState, useEffect, useMemo } from "react";

const MAX_ROTATE = 20;

export function Gakuen() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [rotateMouse, setRotateMouse] = useState({ x: 0, y: 0 });
  const rotateDevice = useDeviceOrientation(MAX_ROTATE);

  const rotate = useMemo(() => ({
    x: rotateMouse.x + rotateDevice.x,
    y: rotateMouse.y + rotateDevice.y,
  }), [rotateDevice, rotateMouse])

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
  )
}