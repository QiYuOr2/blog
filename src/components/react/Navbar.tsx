const routes = [
  {
    path: '/',
    label: '文章'
  },
  {
    path: '/memo',
    label: '动态'
  }
]

export default function Navbar() {
  return (
    <ul className="flex gap-1 px-2 py-1 mb-6 mx-auto max-w-[calc(65ch-1.7rem)] rounded-full border-1 border-solid border-light-800">
      {routes.map(route => (
        <li className="px-2 py-1"><a href={route.path}>{route.label}</a></li>
      ))}
    </ul>
  )
}