import Link from 'next/link'
import { getRetrospectives } from '@/lib/content'

export default async function Page() {
  const retrospectives = await getRetrospectives()

  return (
    <section className="listing">
      <p className="kicker">SHINEMA / ARCHIVES</p>
      <h1>Rétrospectives</h1>

      {retrospectives.length === 0 ? (
        <p className="empty">
          Aucune rétrospective publiée.
        </p>
      ) : (
        <div className="grid">
          {retrospectives.map((article) => (
            <article key={article._id}>
              <Link href={`/retrospectives/${article.slug}`}>
                <h2>{article.title}</h2>
              </Link>

              <p>{article.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
