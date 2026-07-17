import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity'

export const revalidate = 60

type PortableTextBlock = {
  _key: string
  _type: string
  children?: Array<{
    _key: string
    _type: string
    text: string
    marks?: string[]
  }>
  markDefs?: unknown[]
  style?: string
  listItem?: string
  level?: number
}

type Classement = {
  title: string
  excerpt?: string
  publishedAt?: string
  body?: PortableTextBlock[]
}

export default async function ClassementPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const classement = await client.fetch<Classement | null>(
    `
      *[_type == "ranking" && slug.current == $slug][0] {
        title,
        excerpt,
        publishedAt,
        body
      }
    `,
    { slug }
  )

  if (!classement) {
    notFound()
  }

  return (
    <article className="review-page">
      <header>
        <p className="kicker">SHINEMA / CLASSEMENT</p>

        <h1>{classement.title}</h1>

        <div className="review-meta">
          {classement.excerpt && <p>{classement.excerpt}</p>}

          {classement.publishedAt && (
            <time dateTime={classement.publishedAt}>
              {new Date(classement.publishedAt).toLocaleDateString('fr-CH')}
            </time>
          )}
        </div>
      </header>

      <div className="article-body">
        {classement.body?.length ? (
          <PortableText value={classement.body} />
        ) : (
          <p className="empty">
            Aucun film n’a encore été ajouté au classement.
          </p>
        )}
      </div>
    </article>
  )
}
