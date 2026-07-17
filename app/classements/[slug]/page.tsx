import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/lib/sanity'

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

type RankingFilm = {
  _key: string
  title: string
  originalTitle?: string
  year?: number
  director?: string
  poster?: unknown
  comment?: string
}

type Classement = {
  title: string
  excerpt?: string
  publishedAt?: string
  body?: PortableTextBlock[]
  films?: RankingFilm[]
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
        body,
        films[] {
          _key,
          title,
          originalTitle,
          year,
          director,
          poster,
          comment
        }
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

      {classement.body?.length ? (
        <div className="article-body">
          <PortableText value={classement.body} />
        </div>
      ) : null}

      {classement.films?.length ? (
        <section className="ranking-films">
          {classement.films.map((film, index) => (
            <article className="ranking-film" key={film._key}>
              <div className="ranking-position">
                {String(index + 1).padStart(2, '0')}
              </div>

              {film.poster ? (
                <div className="ranking-poster">
                  <Image
                    src={urlFor(film.poster)
                      .width(600)
                      .height(900)
                      .url()}
                    alt={`Affiche de ${film.title}`}
                    fill
                    sizes="(max-width: 700px) 120px, 220px"
                  />
                </div>
              ) : (
                <div className="ranking-poster ranking-poster-empty">
                  Sans affiche
                </div>
              )}

              <div className="ranking-film-copy">
                <p className="kicker">
                  {film.year ?? ''}
                  {film.director ? ` — ${film.director}` : ''}
                </p>

                <h2>{film.title}</h2>

                {film.originalTitle && (
                  <p className="ranking-original-title">
                    {film.originalTitle}
                  </p>
                )}

                {film.comment && <p>{film.comment}</p>}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <p className="empty ranking-empty">
          Aucun film structuré n’a encore été ajouté à ce classement.
        </p>
      )}
    </article>
  )
}
