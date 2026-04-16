import { useMemo } from "react"

export interface Route {
  path: string
  label: string
}

function normalizePath(path: string) {
  return (path.length > 1 ? path.replace(/\/$/, '') : path);
}



interface NavbarProps {
  currentPath: string
  routes: Route[]
}

export function Navbar({ currentPath, routes }: NavbarProps) {
  const normalizedCurrentPath = useMemo(() => normalizePath(currentPath), [currentPath]);
  const nonRootRoutes = routes.filter(route => route.path !== '/')

  function isRouteActive(path: string, route: Route): boolean {
    if (route.path === '/') {
      return !nonRootRoutes.some(candidate =>
        path === candidate.path || path.startsWith(`${candidate.path}/`)
      )
    }

    return path === route.path || path.startsWith(`${route.path}/`)
  }

  return (
    <nav className="mx-auto max-w-[65ch] px-7 mb-6 h-9 xl:(px-0)" data-current-path={currentPath}>
      <div className="flex shadow-inner bg-cool-gray-100 dark:bg-true-gray-700 rounded-full">
        <ul className="flex gap-1 px-2 py-1 bg-cool-gray-100 dark:bg-true-gray-700 rounded-full text-sm text-true-gray-400 relative">
          {routes.map(route => (
            <li key={route.path} className={`px-2 py-1 relative ${isRouteActive(normalizedCurrentPath, route) ? `text-black dark:text-light-50 before:(content-[""] absolute z-10 top-0 bottom-0 left--1 right--1 bg-light-50 dark:bg-dark rounded-full shadow)` : ''}`}><a className="relative z-20" href={route.path}>{route.label}</a></li>
          ))}
        </ul>
        <div className="flex-1 m-1 relative">
          <div className="custom-bg-radial from-transparent to-white dark:to-dark rounded-full drop-shadow absolute right-0 bottom-0 top-0 left--5"></div>
        </div>
      </div>
    </nav>
  )
}
