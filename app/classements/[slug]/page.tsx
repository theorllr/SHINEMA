import {notFound} from 'next/navigation'
import {client} from '@/lib/sanity'

export const revalidate = 60

type Classement = {
  title: string
  date?: string
  summary?: string
  entries?: Array<{
    title?: string
    year?: number
    note?: number
    comment?: string
  }>
}

export default async function ClassementPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params

  const classement = await client.fetch<Classement | null>(
    `
      *[_type == "ranking" && slug.current == $slug][0] {
        title,
        date,
        summary,
        entries[] {
          title,
          year,
          note,
          comment
        }
      }
    `,
    {slug}
  )

  if (!classement) {
    notFound()
  }

  return (
    <article className="listing">
      <p className="kicker">SHINEMA / CLASSEMENT</p>

      <h1>{classement.title}</h1>

      {classement.summary && (
        <p className="dek">{classement.summary}</p>
      )}

      {classement.entries?.length ? (
        <div className="list">
          {classement.entries.map((entry, index) => (
            <div key={`${entry.title}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>

              <div>
                <h2>{entry.title}</h2>

                {entry.year && <p>{entry.year}</p>}

                {entry.comment && <p>{entry.comment}</p>}
              </div>

              {entry.note !== undefined && (
                <span>{entry.note}/10</span>
              )}
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
