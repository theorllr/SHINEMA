import Link from 'next/link'
import {client} from '@/lib/sanity'

export const revalidate = 60

type Classement = {
  _id: string
  title: string
  slug?: {
    current: string
  }
  date?: string
  summary?: string
}

export default async function Page() {
  const classements = await client.fetch<Classement[]>(`
    *[_type == "ranking"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      summary
    }
  `)

  return (
    <section className="listing">
      <p className="kicker">SHINEMA / ARCHIVES</p>
      <h1>Classements</h1>

      {classements.length === 0 ? (
        <p className="empty">Aucun classement publié pour le moment.</p>
      ) : (
        <div className="list">
          {classements.map((classement, index) => (
            <Link
              key={classement._id}
              href={
                classement.slug?.current
                  ? `/classements/${classement.slug.current}`
                  : '/classements'
              }
            >
              <span>{String(index + 1).padStart(2, '0')}</span>

              <div>
                <h2>{classement.title}</h2>

                {classement.summary && (
                  <p>{classement.summary}</p>
                )}
              </div>

              <span>↗</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
