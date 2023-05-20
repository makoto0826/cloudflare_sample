import Link from 'next/link'

type NavbarProps = {
  children?: React.ReactNode
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <div className="navbar bg-base-100 sticky top-0">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <Link className="btn btn-ghost normal-case text-xl" href="/">
        Sample
      </Link>
      {children}
    </div>
  )
}
