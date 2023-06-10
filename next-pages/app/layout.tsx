import { Navbar } from './components'
import './global.css'
import Link from 'next/link'

export const runtime = 'edge'

export const metadata = {
  title: 'Index',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main>
          <Navbar>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link href="about">About</Link>
                </li>
                <li>
                  <Link href="shop/item">Shop - Item</Link>
                </li>
              </ul>
            </div>
          </Navbar>
          {children}
        </main>
      </body>
    </html>
  )
}
