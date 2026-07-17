import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'

export const revalidate = 60

type Classement = {
  title: string
  description?: string
  films?: Array<{
    titre?: string
    annee?: number
    commentaire?: string
  }>
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
        description,
        films[] {
          titre,
          annee,
          commentaire
        }
      }
    `,
    { slug }
  )

  if (!classement) {
    notFound()
  }

  return (
    <article className="listing">
      <p className="kicker">SHINEMA / CLASSEMENT</p>
      <h1>{classement.title}</h1>

      {classement.description && (
        <p className="dek">{classement.description}</p>
      )}

      {classement.films?.length ? (
        <div className="list">
          {classement.films.map((film, index) => (
            <div key={`${film.titre}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>

              <div>
                <h2>{film.titre}</h2>
                {film.annee && <p>{film.annee}</p>}
                {film.commentaire && <p>{film.commentaire}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">
          Aucun film n’a encore été ajouté à ce classement.
        </p>
      )}
    </article>
  )
}
