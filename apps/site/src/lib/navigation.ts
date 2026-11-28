export interface NavRoute {
  path: string;
  label: string;
}

export const NAVBAR_ROUTES: readonly NavRoute[] = [
  {
    path: "/",
    label: "文章",
  },
  {
    path: "/memo",
    label: "碎碎念",
  },
  {
    path: "/bgm",
    label: "追番",
  },
  {
    path: "/weread",
    label: "读书",
  },
  {
    path: "/about",
    label: "关于",
  },
];

export type PageTransitionDirection = "forward" | "back" | "vertical-up" | "vertical-down";

export function normalizePathname(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "");
  return clean.length > 0 ? clean : "/";
}

function isNonRootRouteMatch(normalizedPath: string, routePath: string): boolean {
  const normalizedRoute = normalizePathname(routePath);
  return normalizedPath === normalizedRoute || normalizedPath.startsWith(`${normalizedRoute}/`);
}

export function getActiveNavIndex(
  pathname: string,
  routes: readonly NavRoute[] = NAVBAR_ROUTES,
): number {
  const normalizedPath = normalizePathname(pathname);
  const nonRootIndex = routes.findIndex(
    (route) =>
      normalizePathname(route.path) !== "/" && isNonRootRouteMatch(normalizedPath, route.path),
  );
  if (nonRootIndex !== -1) {
    return nonRootIndex;
  }
  return routes.findIndex((route) => normalizePathname(route.path) === "/");
}

export function isRouteActive(
  pathname: string,
  route: NavRoute,
  routes: readonly NavRoute[] = NAVBAR_ROUTES,
): boolean {
  const activeIndex = getActiveNavIndex(pathname, routes);
  return activeIndex !== -1 && routes[activeIndex]?.path === route.path;
}

function getPathDepth(pathname: string): number {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") {
    return 0;
  }
  return normalized.split("/").filter(Boolean).length;
}

/**
 * 根据 navbar 顺序与页面层级决定 View Transition 方向：
 * - 跨 navbar 切换：向右移动用 forward（旧页向左退出、新页从右进入），向左移动用 back（旧页向右退出、新页从左进入）
 * - 同 navbar 内二级页切换：用上下交叉淡入淡出（进入更深层 vertical-up，返回更浅层 vertical-down，同层按导航方向）
 */
export function resolvePageTransitionDirection(
  fromPathname: string,
  toPathname: string,
  fallbackDirection: string = "forward",
  routes: readonly NavRoute[] = NAVBAR_ROUTES,
): PageTransitionDirection {
  const fromIndex = getActiveNavIndex(fromPathname, routes);
  const toIndex = getActiveNavIndex(toPathname, routes);

  if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
    return toIndex > fromIndex ? "forward" : "back";
  }

  const fromDepth = getPathDepth(fromPathname);
  const toDepth = getPathDepth(toPathname);
  if (toDepth > fromDepth) {
    return "vertical-up";
  }
  if (toDepth < fromDepth) {
    return "vertical-down";
  }
  return fallbackDirection === "back" ? "vertical-down" : "vertical-up";
}
