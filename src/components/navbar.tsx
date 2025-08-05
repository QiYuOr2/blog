const routes = [
  {
    path: '/',
    label: '文章'
  },
  // {
  //   path: '/note',
  //   label: '笔记'
  // },
  {
    path: '/memo',
    label: '碎碎念'
  }
]

interface NavbarProps {
  currentPath: string
}

function isEqPath(path1: string, path2: string) {
  if (path1 === path2) {
    return true
  }
  if (path1.at(-1) === '/') {
    return path1.slice(0, path1.length - 1) === path2
  }
  if (path2.at(-1) === '/') {
    return path2.slice(0, path1.length - 1) === path1
  }
}

export default function Navbar({ currentPath }: NavbarProps) {

  const isActive = (path: string) => {
    if (currentPath.includes('/memo/')) {
      currentPath = '/memo'
    }
    else if (currentPath.match(/\/\d+\//)) {
      currentPath = '/'
    }

    if (isEqPath(currentPath, path)) {
      return true
    }
  }

  return (
    <nav className="mx-auto max-w-[65ch] px-7 mb-6 h-9 xl:(px-0)" data-current-path={currentPath}>
      <div className="flex shadow-inner bg-cool-gray-100 dark:bg-true-gray-700 rounded-full">
        <ul className="flex gap-1 px-2 py-1 bg-cool-gray-100 dark:bg-true-gray-700 rounded-full text-sm text-true-gray-400 relative">
          {routes.map(route => (
            <li key={route.path} className={`px-2 py-1 relative ${isActive(route.path) ? `text-black dark:text-light-50 before:(content-[""] absolute z-10 top-0 bottom-0 left--1 right--1 bg-light-50 dark:bg-dark rounded-full shadow)` : ''}`}><a className="relative z-20" href={route.path}>{route.label}</a></li>
          ))}
        </ul>
        <div className="flex-1 m-1 relative">
          <div className="custom-bg-radial from-transparent to-white dark:to-dark rounded-full drop-shadow absolute right-0 bottom-0 top-0 left--5"></div>
        </div>
      </div>
    </nav>
  )
}