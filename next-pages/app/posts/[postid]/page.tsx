import { getCustomers, wait } from '../../../lib'
import { Container } from '../../components'
import Link from 'next/link'
import { Suspense } from 'react'

type PageProps = {
  params: {
    postid: string
  }
}

export function generateMetadata({ params }: PageProps) {
  return {
    title: `Posts ${params.postid}`,
  }
}

export default function Page({ params }: PageProps) {
  const KEYS = [...Array(25)].map((_, i) => i + 1)

  const contents = KEYS.map((x) => {
    return (
      <div key={x} className="pt-4">
        <Link
          href={`/posts/${params.postid}/details/${x}`}
          className="btn btn-primary btn-wide btn-sm"
        >
          {x}
        </Link>
        <div className="pt-4">
          <Suspense fallback={<div>Loading... Customers</div>}>
            {/* @ts-expect-error */}
            <Customers />
          </Suspense>
        </div>
      </div>
    )
  })

  return (
    <Container>
      <h1>Posts {params.postid}</h1>
      {contents}
    </Container>
  )
}

async function Customers() {
  try {
    const customers = await getCustomers()

    return <div>{JSON.stringify(customers)}</div>
  } catch (e) {
    return <div>Error</div>
  }
}
