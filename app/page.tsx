import Image from 'next/image'
import Link from 'next/link'
import {
  getReviews,
  getRetrospectives,
  getRankings,
} from '@/lib/content'
import {urlFor} from '@/lib/sanity'

export default async function Home() {
  const [reviews, retrospectives, rankings] = await Promise.all([
    getReviews(),
    getRetrospectives(),
    getRankings(),
  ])

  const lead = reviews[0]
  const latestRetrospective = retrospectives[0]
  const latestRanking = rankings[0]

  const leadImage = lead.mainImage
    ? urlFor(lead.mainImage)
        .width(1000)
        .height(1400)
        .quality(90)
        .url()
    : '/new-religion.jpg'

  const tickerItems = [
    ...reviews.map((review) => ({
      title: review.articleTitle,
      href: `/critiques/${review.slug}`,
      publishedAt: review.publishedAt,
    })),

    ...retrospectives.map((article) => ({
      title: article.title,
      href: `/retrospectives/${article.slug}`,
      publishedAt: article.publishedAt,
    })),

    ...rankings.map((ranking) => ({
      title: ranking.title,
      href: `/classements/${ranking.slug}`,
      publishedAt: ranking.publishedAt,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    )
    .slice(0, 8)

  return (
    <>
      <section className="hero">
        <article className="hero-feature">
          <div className="hero-poster">
            <Image
              src={leadImage}
              alt={`Affiche de ${lead.filmTitle}`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 55vw"
            />
          </div>

          <div className="hero-copy">
            <div className="eyebrow">
              <span>CRITIQUE</span>

              <span>
                {new Date(lead.publishedAt).toLocaleDateString(
                  'fr-CH'
                )}
              </span>
            </div>

            <h1>{lead.articleTitle}</h1>

            <p className="dek">
              <em>{lead.filmTitle}</em> — {lead.excerpt}
            </p>

            <div className="hero-footer">
              <Link
                className="read-link"
                href={`/critiques/${lead.slug}`}
              >
                Lire la critique ↗
              </Link>

              <div className="rating">
                <strong>{lead.rating}</strong>
                <span>/10</span>
              </div>
            </div>
          </div>
        </article>

        <aside className="hero-side">
          <p className="manifesto">
            Un journal de cinéma subjectif, sentimental et parfois de
            mauvaise foi.
          </p>

          {latestRetrospective && (
            <Link
              className="side-card"
              href={`/retrospectives/${latestRetrospective.slug}`}
            >
     {latestRetrospective.mainImage != null && (
  <div className="side-card-image">
    <Image
      src={urlFor(latestRetrospective.mainImage as any)
        .width(700)
        .height(420)
        .quality(90)
        .url()}
      alt={latestRetrospective.title}
      fill
      sizes="(max-width: 900px) 100vw, 25vw"
    />
  </div>
)}
              <div>
                <span className="tag">RÉTROSPECTIVE</span>

                <h2>{latestRetrospective.title}</h2>

                {latestRetrospective.excerpt && (
                  <p>{latestRetrospective.excerpt}</p>
                )}
              </div>
            </Link>
          )}
        </aside>
      </section>

      {tickerItems.length > 0 && (
        <section className="ticker">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map(
              (item, index) => (
                <Link
                  href={item.href}
                  key={`${item.href}-${index}`}
                >
                  {item.title}
                  <span aria-hidden="true"> — </span>
                </Link>
              )
            )}
          </div>
        </section>
      )}

      <section className="latest">
        <div className="section-head">
          <div>
            <span>01</span>
            <h2>Dernières critiques</h2>
          </div>

          <Link href="/critiques">
            Toutes les critiques (
            {String(reviews.length).padStart(2, '0')})
          </Link>
        </div>

        <div className="cards">
          {reviews.map((review, index) => (
            <Link
              className="story"
              href={`/critiques/${review.slug}`}
              key={review._id}
            >
              <span className="index">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="story-meta">
                <span>CRITIQUE</span>
                <span>{review.rating}/10</span>
              </div>

              <h3>
                {review.filmTitle} — {review.articleTitle}
              </h3>

              <p>{review.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {latestRanking && (
        <section className="ranking">
          <div className="ranking-title">
            <span>DERNIER CLASSEMENT</span>

            <h2>{latestRanking.title}</h2>

            {latestRanking.excerpt && (
              <p>{latestRanking.excerpt}</p>
            )}

            <Link
              className="read-link"
              href={`/classements/${latestRanking.slug}`}
            >
              Voir le classement ↗
            </Link>
          </div>

          {latestRanking.films &&
            latestRanking.films.length > 0 && (
              <ol>
                {latestRanking.films
                  .slice(0, 5)
                  .map((film, index) => (
                    <li key={film._key}>
                      <span>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <b>{film.title}</b>

                      <span>{film.year ?? '—'}</span>

                      <span>{film.director ?? ''}</span>
                    </li>
                  ))}
              </ol>
            )}
        </section>
      )}
    </>
  )
}
