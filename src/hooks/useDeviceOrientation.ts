import { useEffect, useState } from "react";

const MAX_ROTATE = 20;

export function useDeviceOrientation(maxRotate = MAX_ROTATE) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animation: number;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;

      const rotateY = (e.gamma / 90) * maxRotate;
      const rotateX = (-e.beta / 180) * maxRotate;

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
  }, [maxRotate]);

  return rotate;
}
