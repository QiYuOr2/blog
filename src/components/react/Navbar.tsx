import { useEffect } from "react"

const routes = [
  {
    path: '/',
    label: '文章'
  },
  // {
  //   path: '/lab',
  //   label: '实验室'
  // },
  {
    path: '/memo',
    label: '动态'
  }
]

interface NavbarProps {
  currentPath: string
}

export default function Navbar({ currentPath }: NavbarProps) {

  return (
    <nav className="mx-auto max-w-[65ch] px-7 mb-6 h-9 xl:(px-0)" data-current-path={currentPath}>
      <div className="flex shadow-inner bg-cool-gray-100 dark:bg-true-gray-700 rounded-full">
        <ul className="flex gap-1 px-2 py-1 bg-cool-gray-100 dark:bg-true-gray-700 rounded-full text-sm text-true-gray-400 relative">
          {routes.map(route => (
            <li className={`px-2 py-1 relative ${currentPath === route.path ? `text-black dark:text-light-50 before:(content-[""] absolute z-10 top-0 bottom-0 left--1 right--1 bg-light-50 dark:bg-dark rounded-full shadow)` : ''}`}><a className="relative z-20" href={route.path}>{route.label}</a></li>
          ))}
        </ul>
        <div className="flex-1 m-1 relative">
          <div className="custom-bg-radial from-transparent to-white dark:to-dark rounded-full drop-shadow absolute right-0 bottom-0 top-0 left--5"></div>
        </div>
      </div>
    </nav>
  )
}