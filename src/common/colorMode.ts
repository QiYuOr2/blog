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
    console.log(events)
    if (!globalThis?.document) {
      return
    }

    document.documentElement.classList.remove('light', 'dark')

    if (value !== Mode.System) {
      document.documentElement.classList.add(value)
      document.documentElement.style.colorScheme = value
      events.forEach(event => event(value))
    } else {
      const media = globalThis.matchMedia('(prefers-color-scheme: dark)')
      const value = media.matches ? Mode.Dark : Mode.Light
      appendToDocument(value, false)
      events.forEach(event => event(value))
    }

    save && localStorage.setItem(storgeKey, value)
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

  const initial = globalThis.localStorage?.getItem?.(storgeKey) ?? Mode.System

  function addEventListener(action: ModeChangeEvent) {
    events.add(action)
  }

  function removeEventLister(action: ModeChangeEvent) {
    events.delete(action)
  }

  return { initial, appendToDocument, onFollowSystem, addEventListener, removeEventLister }
}