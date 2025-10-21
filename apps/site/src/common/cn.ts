import { unique } from './array.ts'

function toClassList(className?: string): string[] {
  return unique(
    (className || '')
      .split(' ')
      .map(c => c.trim())
      .filter(c => c.length > 0),
  )
}

export function cn(...classes: (string | undefined)[]) {
  const classList = classes.map(toClassList).flat().filter(Boolean)

  const map = new Map<string, string>()
  for (const cls of classList) {
    const lastHyphenIndex = cls.lastIndexOf('-')
    if (lastHyphenIndex === -1) {
      map.set(cls, cls)
      continue
    }
    const key = cls.slice(0, lastHyphenIndex)
    map.set(key, cls)
  }
  return Array.from(map.values()).join(' ')
}
