export enum Mode {
  Light = 'light',
  System = 'system',
  Dark = 'dark'
}

const storgeKey = import.meta.env.PUBLIC_COLOR_MODE

type ModeChangeEvent = (mode: Mode.Dark | Mode.Light) => void

const events: Set<ModeChangeEvent> = new Set()
export function colorModeEffect() {
  function appendToDocument(value: Mode, save = true) {
    if (!globalThis?.document) {
      return
    }

    document.documentElement.classList.remove('light', 'dark')

    save && localStorage.setItem(storgeKey, value)
    if (value === Mode.System) {
      const media = globalThis.matchMedia('(prefers-color-scheme: dark)')
      value = media.matches ? Mode.Dark : Mode.Light
    }

    document.documentElement.classList.add(value)
    document.documentElement.style.colorScheme = value
    events.forEach(event => event(value as Mode.Dark | Mode.Light))
  }

  function onFollowSystem() {
    if (!globalThis?.matchMedia) {
      return
    }
    
    const media = globalThis.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', () => {
      if (localStorage.getItem(storgeKey) === Mode.System) {
        appendToDocument(media.matches ? Mode.Dark : Mode.Light, false)
      }
    })
  }

  const initial = (globalThis.localStorage?.getItem?.(storgeKey) ?? Mode.System) as Mode

  function addEventListener(action: ModeChangeEvent) {
    events.add(action)
  }

  function removeEventLister(action: ModeChangeEvent) {
    events.delete(action)
  }

  function getCurrentMode(): Mode {
    if (initial === Mode.System && globalThis.matchMedia) {
      const media = globalThis.matchMedia('(prefers-color-scheme: dark)')
      return media.matches ? Mode.Dark : Mode.Light
    }
    return initial
  }

  return { initial, appendToDocument, onFollowSystem, addEventListener, removeEventLister, getCurrentMode }
}
