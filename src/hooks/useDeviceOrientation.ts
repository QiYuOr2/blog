import { useEffect, useState } from "react";

export function useDeviceOrientation(maxRotate = 20, sensitivity = 2) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animation: number;
    let betaOffset: number | null = null;   // 前后零位
    let gammaOffset: number | null = null;  // 左右零位

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;

      // 初始化零位
      if (betaOffset === null) betaOffset = e.beta;
      if (gammaOffset === null) gammaOffset = e.gamma;

      const deltaBeta = e.beta - betaOffset;   // 前后偏移
      const deltaGamma = e.gamma - gammaOffset; // 左右偏移

      const rotateX = (-deltaBeta / 90) * maxRotate * sensitivity;
      const rotateY = (deltaGamma / 90) * maxRotate * sensitivity;

      animation = requestAnimationFrame(() => {
        setRotate({ x: rotateX, y: rotateY });
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
      cancelAnimationFrame(animation);
    };
  }, [maxRotate, sensitivity]);

  return rotate;
}
