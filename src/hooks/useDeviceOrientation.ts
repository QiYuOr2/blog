import { useEffect, useState, useRef } from "react";

export function useDeviceOrientation(maxRotate = 20, sensitivity = 3) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const betaOffset = useRef<number | null>(null);
  const gammaOffset = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    if (!enabled) return;

    if (e.beta == null || e.gamma == null) return;

    if (betaOffset.current === null) betaOffset.current = e.beta;
    if (gammaOffset.current === null) gammaOffset.current = e.gamma;

    const deltaBeta = e.beta - betaOffset.current;
    const deltaGamma = e.gamma - gammaOffset.current;

    const rotateX = (-deltaBeta / 90) * maxRotate * sensitivity;
    const rotateY = (deltaGamma / 90) * maxRotate * sensitivity;

    animationRef.current = requestAnimationFrame(() => setRotate({ x: rotateX, y: rotateY }));
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
  
  const clear = () => {
    betaOffset.current = null;
    gammaOffset.current = null;
    setRotate({ x: 0, y: 0 });
    window.removeEventListener("deviceorientation", handleOrientation);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }

  const toggleOrientation = async (value?: boolean) => {
    if (typeof value === "undefined") value = !enabled;

    if (!value) {
      setEnabled(false);
      clear();
      return;
    }

    const hasPermission = await requestPermission();
    if (hasPermission) {
      setEnabled(true);
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
  };

  useEffect(() => {
    return () => {
      clear()
    };
  }, []);

  return { rotate, enabled, toggleOrientation };
}
