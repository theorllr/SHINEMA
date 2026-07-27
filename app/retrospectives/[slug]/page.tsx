import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getRetrospective } from '@/lib/content'
import { urlFor } from '@/lib/sanity'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function RetrospectivePage({
  params,
}: PageProps) {
  const { slug } = await params
  const article = await getRetrospective(slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="article-page">
      <header>
        <p className="kicker">SHINEMA / RÉTROSPECTIVE</p>

        <h1>{article.title}</h1>

        {article.excerpt && (
          <p className="excerpt">{article.excerpt}</p>
        )}

        {article.publishedAt && (
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString(
              'fr-FR',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }
            )}
          </time>
        )}
      </header>

      {article.mainImage != null && (
        <Image
          src={urlFor(article.mainImage as any).width(1600).url()}
          alt={article.title}
          width={1600}
          height={900}
          priority
        />
      )}

      {article.body && (
        <div className="article-body">
          <PortableText value={article.body as never} />
        </div>
      )}
    </article>
  )
}
