import Image from 'next/image'
import Link from 'next/link'
import {getRetrospectives} from '@/lib/content'
import {urlFor} from '@/lib/sanity'

export default async function Page() {
  const retrospectives = await getRetrospectives()

  return (
    <section className="listing">
      <p className="kicker">SHINEMA / ARCHIVES</p>
      <h1>Rétrospectives</h1>

      {retrospectives.length === 0 ? (
        <p className="empty">Aucune rétrospective publiée.</p>
      ) : (
        <div className="retrospective-list">
          {retrospectives.map((article) => (
            <Link
              key={article._id}
              href={`/retrospectives/${article.slug}`}
              className="retrospective-card"
            >
              {article.mainImage != null && (
                <div className="retrospective-image">
                  <Image
                    src={urlFor(article.mainImage as any)
                      .width(1200)
                      .height(700)
                      .url()}
                    alt={article.title}
                    width={1200}
                    height={700}
                  />
                </div>
              )}

              <div className="retrospective-content">
                <p className="retrospective-label">
                  RÉTROSPECTIVE
                </p>

                <h2>{article.title}</h2>

                {article.excerpt && (
                  <p>{article.excerpt}</p>
                )}

                <span className="retrospective-link">
                  Lire l’article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
