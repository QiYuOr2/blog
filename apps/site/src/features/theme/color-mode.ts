export enum Mode {
  Light = "light",
  System = "system",
  Dark = "dark",
}

const storageKey = import.meta.env.PUBLIC_COLOR_MODE || "@qiyuor2/color-mode";

type ModeChangeEvent = (mode: Mode.Dark | Mode.Light) => void;

function readStoredMode(): Mode {
  if (typeof window === "undefined") return Mode.System;
  const value = window.localStorage?.getItem?.(storageKey);
  if (value === Mode.Light || value === Mode.Dark || value === Mode.System) return value;
  return Mode.System;
}

const events: Set<ModeChangeEvent> = new Set();

export function colorModeEffect() {
  function appendToDocument(value: Mode, save = true) {
    if (!globalThis?.document) {
      return;
    }

    document.documentElement.classList.remove("light", "dark");

    if (save) {
      localStorage.setItem(storageKey, value);
    }

    const resolved: Mode.Dark | Mode.Light =
      value === Mode.System
        ? globalThis.matchMedia("(prefers-color-scheme: dark)").matches
          ? Mode.Dark
          : Mode.Light
        : value;

    document.documentElement.classList.add(resolved);
    document.documentElement.style.colorScheme = resolved;
    events.forEach((event) => event(resolved));
  }

  function onFollowSystem(): () => void {
    if (!globalThis?.matchMedia) {
      return () => {};
    }

    const media = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (readStoredMode() === Mode.System) {
        appendToDocument(media.matches ? Mode.Dark : Mode.Light, false);
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }

  const initial = readStoredMode();

  function addEventListener(action: ModeChangeEvent) {
    events.add(action);
  }

  function removeEventListener(action: ModeChangeEvent) {
    events.delete(action);
  }

  function getCurrentMode(): Mode.Dark | Mode.Light {
    const stored = readStoredMode();
    if (stored === Mode.Dark || stored === Mode.Light) return stored;

    const prefersDark = globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? Mode.Dark : Mode.Light;
  }

  return {
    initial,
    appendToDocument,
    onFollowSystem,
    addEventListener,
    removeEventListener,
    getCurrentMode,
  };
}
