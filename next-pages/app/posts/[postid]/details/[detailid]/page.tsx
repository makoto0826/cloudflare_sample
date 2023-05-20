import { Container } from '../../../../components'
import AddArea from './AddArea'
import Link from 'next/link'

type PageProps = {
  params: {
    postid: string
    detailid: string
  }
}

export function generateMetadata({ params }: PageProps) {
  return {
    title: `Details ${params.postid}-${params.detailid}`,
  }
}

export default function Page({ params }: PageProps) {
  return (
    <Container>
      <Link href={`/posts/${params.postid}`} className="btn btn-info btn-sm">
        Back
      </Link>
      <AddArea />
    </Container>
  )
}
