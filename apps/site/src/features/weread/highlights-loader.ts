import type { WereadHighlight } from "./schema";

const inflight = new Map<string, Promise<WereadHighlight[]>>();
const resolved = new Map<string, WereadHighlight[]>();

export function getCachedHighlights(url?: string): WereadHighlight[] | null {
  if (!url) return null;
  return resolved.get(url) ?? null;
}

export function loadHighlights(url: string): Promise<WereadHighlight[]> {
  const hit = resolved.get(url);
  if (hit) return Promise.resolve(hit);

  const existing = inflight.get(url);
  if (existing) return existing;

  const task = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load highlights: ${res.status}`);
      return res.json() as Promise<WereadHighlight[]>;
    })
    .then((list) => {
      resolved.set(url, list);
      return list;
    })
    .finally(() => {
      inflight.delete(url);
    });

  inflight.set(url, task);
  return task;
}
