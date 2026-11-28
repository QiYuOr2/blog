import {
  NAVBAR_ROUTES,
  getActiveNavIndex,
  getSkeletonKind,
  resolvePageTransitionDirection,
  type PageSkeletonKind,
  type PageTransitionDirection,
} from "./navigation";

/** 命中本地缓存/预取时通常 <10ms，留出短暂宽限避免瞬切页面闪一下骨架屏。 */
const SKELETON_DELAY_MS = 80;
const HOVER_PREFETCH_DELAY_MS = 65;
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 30;
const DIRECTION_ATTR = "data-astro-transition";

interface CachedPage {
  html: string;
  mediaType: DOMParserSupportedType;
  finalUrl?: string;
  expiresAt: number;
}

const htmlCache = new Map<string, CachedPage>();
const inflightFetches = new Map<string, Promise<CachedPage | null>>();
let domParser: DOMParser | null = null;

function cacheKeyOf(url: URL): string {
  return `${url.pathname}${url.search}`;
}

function isSlowConnection(): boolean {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const conn = nav.connection;
  return Boolean(conn?.saveData || (conn?.effectiveType && /2g/.test(conn.effectiveType)));
}

function getCachedPage(url: URL): CachedPage | null {
  if (import.meta.env.DEV) return null;
  const key = cacheKeyOf(url);
  const entry = htmlCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    htmlCache.delete(key);
    return null;
  }
  // 刷新 LRU 顺序
  htmlCache.delete(key);
  htmlCache.set(key, entry);
  return entry;
}

function setCachedPage(url: URL, entry: CachedPage) {
  if (import.meta.env.DEV) return;
  const key = cacheKeyOf(url);
  if (htmlCache.has(key)) {
    htmlCache.delete(key);
  } else if (htmlCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = htmlCache.keys().next().value;
    if (oldestKey !== undefined) htmlCache.delete(oldestKey);
  }
  htmlCache.set(key, entry);
}

function fetchPageHtml(
  url: URL,
  options: { priority?: "high" | "low" } = {},
): Promise<CachedPage | null> {
  const cached = getCachedPage(url);
  if (cached) return Promise.resolve(cached);

  const key = cacheKeyOf(url);
  const existing = inflightFetches.get(key);
  if (existing) return existing;

  const task = fetch(url.href, {
    ...(options.priority ? { priority: options.priority } : {}),
    // 预取不绑定某次导航的 abort signal，避免预取被中途打断；实际导航仍由 signal 控制是否应用结果。
  } as RequestInit)
    .then(async (res) => {
      if (!res.ok) return null;
      const contentType = res.headers.get("content-type") ?? "";
      const mediaType = contentType.split(";", 1)[0].trim();
      if (mediaType !== "text/html" && mediaType !== "application/xhtml+xml") {
        return null;
      }
      const html = await res.text();
      const entry: CachedPage = {
        html,
        mediaType: mediaType as DOMParserSupportedType,
        finalUrl: res.redirected ? res.url : undefined,
        expiresAt: Date.now() + CACHE_TTL_MS,
      };
      setCachedPage(url, entry);
      return entry;
    })
    .catch(() => null)
    .finally(() => {
      inflightFetches.delete(key);
    });

  inflightFetches.set(key, task);
  return task;
}

function prefetchUrl(href: string) {
  if (import.meta.env.DEV || !navigator.onLine || isSlowConnection()) return;
  try {
    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    if (getCachedPage(url)) return;
    void fetchPageHtml(url, { priority: "low" });
  } catch {
    // 忽略非法 href
  }
}

function preloadNewStylesheets(newDocument: Document, signal: AbortSignal): Promise<void[]> {
  const tasks: Promise<void>[] = [];
  for (const el of newDocument.querySelectorAll("head link[rel=stylesheet]")) {
    const href = el.getAttribute("href");
    if (!href) continue;
    const escapedHref = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(href) : href.replaceAll('"', '\\"');
    if (
      document.querySelector(
        `link[rel="stylesheet"][href="${escapedHref}"], link[rel="preload"][as="style"][href="${escapedHref}"]`,
      )
    ) {
      continue;
    }
    const link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("as", "style");
    link.setAttribute("href", href);
    tasks.push(
      new Promise<void>((resolve) => {
        const done = () => {
          link.remove();
          resolve();
        };
        link.addEventListener("load", done, { once: true });
        link.addEventListener("error", done, { once: true });
        document.head.append(link);
      }),
    );
  }
  if (!tasks.length || signal.aborted) return Promise.resolve([]);
  return Promise.all(tasks);
}

async function applyCachedPageToEvent(
  event: {
    to: URL;
    newDocument: Document;
    signal: AbortSignal;
    formData?: FormData;
    preventDefault: () => void;
  },
  entry: CachedPage,
) {
  if (entry.finalUrl) {
    const redirected = new URL(entry.finalUrl);
    if (redirected.origin !== event.to.origin) {
      event.preventDefault();
      return;
    }
    const hash = event.to.hash;
    event.to = redirected;
    event.to.hash = hash;
  }

  domParser ??= new DOMParser();
  const parsed = domParser.parseFromString(entry.html, entry.mediaType);
  parsed.querySelectorAll("noscript").forEach((el) => el.remove());
  if (!parsed.querySelector('[name="astro-view-transitions-enabled"]') && !event.formData) {
    event.preventDefault();
    return;
  }

  event.newDocument = parsed;
  await preloadNewStylesheets(parsed, event.signal);
}

function renderSkeletonMarkup(kind: PageSkeletonKind): string {
  switch (kind) {
    case "posts":
      return `
        <div class="page-skeleton" role="status" aria-busy="true" aria-label="页面加载中">
          <div class="page-skeleton__section">
            <div class="page-skeleton__bar page-skeleton__heading"></div>
            <div class="page-skeleton__row"><div class="page-skeleton__bar" style="width:62%"></div><div class="page-skeleton__bar page-skeleton__meta"></div></div>
            <div class="page-skeleton__row"><div class="page-skeleton__bar" style="width:78%"></div><div class="page-skeleton__bar page-skeleton__meta"></div></div>
            <div class="page-skeleton__row"><div class="page-skeleton__bar" style="width:54%"></div><div class="page-skeleton__bar page-skeleton__meta"></div></div>
          </div>
          <div class="page-skeleton__section">
            <div class="page-skeleton__bar page-skeleton__heading"></div>
            <div class="page-skeleton__row"><div class="page-skeleton__bar" style="width:70%"></div><div class="page-skeleton__bar page-skeleton__meta"></div></div>
            <div class="page-skeleton__row"><div class="page-skeleton__bar" style="width:48%"></div><div class="page-skeleton__bar page-skeleton__meta"></div></div>
            <div class="page-skeleton__row"><div class="page-skeleton__bar" style="width:66%"></div><div class="page-skeleton__bar page-skeleton__meta"></div></div>
          </div>
        </div>
      `;
    case "memo":
      return `
        <div class="page-skeleton" role="status" aria-busy="true" aria-label="页面加载中">
          ${Array.from(
            { length: 4 },
            (_, i) => `
            <div class="page-skeleton__memo">
              <div class="page-skeleton__bar" style="width:${120 + (i % 2) * 32}px;height:0.85rem"></div>
              <div class="page-skeleton__bubble" style="width:${72 - (i % 3) * 10}%"></div>
            </div>
          `,
          ).join("")}
        </div>
      `;
    case "grid":
      return `
        <div class="page-skeleton" role="status" aria-busy="true" aria-label="页面加载中">
          <div class="page-skeleton__pills">
            <div class="page-skeleton__bar page-skeleton__pill"></div>
            <div class="page-skeleton__bar page-skeleton__pill"></div>
            <div class="page-skeleton__bar page-skeleton__pill"></div>
            <div class="page-skeleton__bar page-skeleton__pill"></div>
          </div>
          <div class="page-skeleton__grid">
            ${Array.from({ length: 8 }, () => '<div class="page-skeleton__card"></div>').join("")}
          </div>
        </div>
      `;
    case "highlights":
      return `
        <div class="page-skeleton" role="status" aria-busy="true" aria-label="页面加载中">
          <div class="page-skeleton__bar page-skeleton__heading"></div>
          ${Array.from(
            { length: 4 },
            () => `
            <div class="page-skeleton__quote">
              <div class="page-skeleton__bar" style="width:100%"></div>
              <div class="page-skeleton__bar" style="width:92%"></div>
              <div class="page-skeleton__bar" style="width:64%"></div>
              <div class="page-skeleton__bar page-skeleton__meta" style="width:36%;margin-top:0.5rem"></div>
            </div>
          `,
          ).join("")}
        </div>
      `;
    case "article":
    default:
      return `
        <div class="page-skeleton" role="status" aria-busy="true" aria-label="页面加载中">
          <div class="page-skeleton__bar page-skeleton__title"></div>
          <div class="page-skeleton__bar page-skeleton__meta" style="width:8rem;margin-bottom:1.75rem"></div>
          <div class="page-skeleton__paragraph">
            <div class="page-skeleton__bar" style="width:100%"></div>
            <div class="page-skeleton__bar" style="width:95%"></div>
            <div class="page-skeleton__bar" style="width:88%"></div>
            <div class="page-skeleton__bar" style="width:62%"></div>
          </div>
          <div class="page-skeleton__paragraph">
            <div class="page-skeleton__bar" style="width:98%"></div>
            <div class="page-skeleton__bar" style="width:90%"></div>
            <div class="page-skeleton__bar" style="width:74%"></div>
          </div>
          <div class="page-skeleton__paragraph">
            <div class="page-skeleton__bar" style="width:94%"></div>
            <div class="page-skeleton__bar" style="width:82%"></div>
            <div class="page-skeleton__bar" style="width:50%"></div>
          </div>
        </div>
      `;
  }
}

function updateNavbarActiveState(targetPathname: string) {
  const activeIndex = getActiveNavIndex(targetPathname, NAVBAR_ROUTES);
  const activePath = activeIndex !== -1 ? NAVBAR_ROUTES[activeIndex]?.path : null;
  document.querySelectorAll<HTMLElement>("nav li[data-nav-path]").forEach((item) => {
    item.classList.toggle("nav-item-active", item.dataset.navPath === activePath);
  });
}

function swapToSkeleton(
  targetPathname: string,
  direction: PageTransitionDirection,
): ViewTransition | null {
  const main = document.querySelector("main");
  if (!main) return null;

  const apply = () => {
    updateNavbarActiveState(targetPathname);
    main.innerHTML = renderSkeletonMarkup(getSkeletonKind(targetPathname));
    window.scrollTo({ left: 0, top: 0, behavior: "instant" });
  };

  if (!document.startViewTransition) {
    apply();
    return null;
  }

  document.documentElement.setAttribute(DIRECTION_ATTR, direction);
  const transition = document.startViewTransition(apply);
  transition.finished.finally(() => {
    if (document.documentElement.getAttribute(DIRECTION_ATTR) === direction) {
      document.documentElement.removeAttribute(DIRECTION_ATTR);
    }
  });
  return transition;
}

function scheduleNavbarPrefetch() {
  const run = () => {
    for (const route of NAVBAR_ROUTES) {
      prefetchUrl(route.path);
    }
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 1500 });
  } else {
    window.setTimeout(run, 300);
  }
}

function initHoverPrefetch() {
  let hoverTimer: number | undefined;

  const scheduleFromEvent = (ev: Event) => {
    const target = ev.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest("a");
    if (!(anchor instanceof HTMLAnchorElement)) return;
    if (anchor.dataset.astroReload !== undefined || anchor.hasAttribute("download")) return;
    if (anchor.target && anchor.target !== "_self") return;
    if (!anchor.href) return;

    window.clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(() => {
      prefetchUrl(anchor.href);
    }, HOVER_PREFETCH_DELAY_MS);
  };

  const cancelHover = () => {
    window.clearTimeout(hoverTimer);
    hoverTimer = undefined;
  };

  document.addEventListener("pointerover", scheduleFromEvent, { passive: true });
  document.addEventListener("focusin", scheduleFromEvent, { passive: true });
  document.addEventListener("pointerout", cancelHover, { passive: true });
  document.addEventListener("focusout", cancelHover, { passive: true });
}

let initialized = false;

export function initPageTransitions() {
  if (initialized) return;
  initialized = true;

  let visualPathname = location.pathname;
  let activeNavId = 0;

  scheduleNavbarPrefetch();
  initHoverPrefetch();

  document.addEventListener("astro:after-swap", () => {
    visualPathname = location.pathname;
  });

  document.addEventListener("astro:before-preparation", (event) => {
    const navId = ++activeNavId;
    const resolvedDirection = resolvePageTransitionDirection(
      visualPathname,
      event.to.pathname,
      event.direction,
    );
    event.direction = resolvedDirection;

    const originalLoader = event.loader;
    const canUseHtmlCache = !import.meta.env.DEV && !event.formData;

    event.loader = async () => {
      // 命中内存缓存时直接解析应用，0 网络往返、不闪骨架屏。
      if (canUseHtmlCache) {
        const hit = getCachedPage(event.to);
        if (hit) {
          await applyCachedPageToEvent(event, hit);
          return;
        }
      }

      let skeletonShown = false;
      let skeletonTransition: ViewTransition | null = null;
      let savedMainNodes: Node[] | null = null;
      let savedPathname = visualPathname;
      let savedScroll = { x: window.scrollX, y: window.scrollY };

      const restoreSnapshot = () => {
        if (!savedMainNodes) return;
        const main = document.querySelector("main");
        if (main) {
          main.replaceChildren(...savedMainNodes);
          updateNavbarActiveState(savedPathname);
          window.scrollTo({ left: savedScroll.x, top: savedScroll.y, behavior: "instant" });
        }
        visualPathname = savedPathname;
        savedMainNodes = null;
      };

      const onAbort = () => {
        // 如果新导航走 samePage 短路（不会触发下一次 astro:before-preparation），
        // 且旧导航已展示骨架屏，微任务后恢复原页面内容避免停留在骨架屏。
        queueMicrotask(() => {
          if (skeletonShown && activeNavId === navId) {
            restoreSnapshot();
          }
        });
      };
      event.signal.addEventListener("abort", onAbort, { once: true });

      const timer = window.setTimeout(() => {
        if (event.signal.aborted) return;
        const main = document.querySelector("main");
        if (main) {
          savedMainNodes = Array.from(main.childNodes);
          savedPathname = visualPathname;
          savedScroll = { x: window.scrollX, y: window.scrollY };
        }
        skeletonShown = true;
        visualPathname = event.to.pathname;
        skeletonTransition = swapToSkeleton(event.to.pathname, resolvedDirection);
      }, SKELETON_DELAY_MS);

      try {
        if (canUseHtmlCache) {
          const entry = await fetchPageHtml(event.to, { priority: "high" });
          if (event.signal.aborted) return;
          if (!entry) {
            event.preventDefault();
            return;
          }
          await applyCachedPageToEvent(event, entry);
        } else {
          await originalLoader();
        }
      } finally {
        window.clearTimeout(timer);
        event.signal.removeEventListener("abort", onAbort);
      }

      if (skeletonShown && !event.signal.aborted) {
        const activeTransition = skeletonTransition as ViewTransition | null;
        if (activeTransition) {
          await activeTransition.updateCallbackDone.catch(() => {});
        }
        // 已播放过方向切换动画进入骨架屏，真实内容就绪后只做温和的淡入替换，避免二次滑动。
        event.direction = "skeleton-reveal";
      }
    };
  });
}
