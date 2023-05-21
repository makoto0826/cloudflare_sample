'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function MainArea() {
  const KEYS = [...Array(300)].map((_, i) => i + 1)

  const contents = KEYS.map((x) => {
    if (x % 5 === 0) {
      return (
        <div key={x} className="pt-4">
          <ErrorItem value={x} />
        </div>
      )
    }

    return (
      <div key={x} className="pt-4">
        <Link href={`/posts/${x}`} className="btn btn-primary btn-sm btn-wide">
          {x}
        </Link>
      </div>
    )
  })

  return <div>{contents}</div>
}

type ErrorProps = {
  value: any
}

function ErrorItem({ value }: ErrorProps) {
  const rootRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const element = rootRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bg-red-500')
          } else {
            entry.target.classList.remove('bg-red-500')
          }
        })
      },
      {
        threshold: 0.8,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <button ref={rootRef} className="btn btn-wide h-24 transition delay-300">
      Error - {value}
    </button>
  )
}
