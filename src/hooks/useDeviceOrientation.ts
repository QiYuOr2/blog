import { useEffect, useState, useRef } from "react";

export function useDeviceOrientation(maxRotate = 20, sensitivity = 3) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const betaOffset = useRef<number | null>(null);
  const gammaOffset = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    if (!enabled) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setRotate({ x: 0, y: 0 });
      betaOffset.current = null;
      gammaOffset.current = null;
      return;
    }

    if (e.beta == null || e.gamma == null) return;

    const deltaBeta = e.beta - (betaOffset.current ?? e.beta);
    const deltaGamma = e.gamma - (gammaOffset.current ?? e.gamma);

    const rotateX = (-deltaBeta / 90) * maxRotate * sensitivity;
    const rotateY = (deltaGamma / 90) * maxRotate * sensitivity;

    animationRef.current = requestAnimationFrame(() => setRotate({ x: rotateX, y: rotateY }));
  };

  // 设置零位 + 添加事件监听
  const initListener = () => {
    const setZero = (e: DeviceOrientationEvent) => {
      betaOffset.current = e.beta ?? 0;
      gammaOffset.current = e.gamma ?? 0;
    };
    setEnabled(true);
    window.addEventListener("deviceorientation", setZero, { once: true });
    window.addEventListener("deviceorientation", handleOrientation, true);
  };

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const state = await (DeviceOrientationEvent as any).requestPermission();
        return state === "granted";
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    return true;
  };

  const toggleOrientation = (value?: boolean) => {
    if (typeof value === 'undefined') {
      value = !enabled
    }

    if (enabled) {
      setEnabled(false)
      return
    }
    
    requestPermission()
      .then(hasPermission => hasPermission && initListener())
  }

  // Android / 非iOS自动初始化
  useEffect(() => {
    toggleOrientation(true)

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return { rotate, enabled, toggleOrientation };
}
