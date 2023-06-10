import { useEffect, useState } from 'react'

export function useWindowScroll() {
  const [scrollY, setScrollY] = useState(() => window.scrollY)

  useEffect(() => {
    const handler = () => {
      if (scrollY !== window.scrollY) {
        setScrollY(window.scrollY)
      }
    }
    const abort = new AbortController()

    window.addEventListener('scroll', handler, { signal: abort.signal })
    return () => abort.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return scrollY
}
