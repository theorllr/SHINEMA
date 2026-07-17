import Image from 'next/image'; import type {Metadata} from 'next'; import {notFound} from 'next/navigation'; import {PortableText} from '@portabletext/react'; import {getReview} from '@/lib/content'; import {urlFor} from '@/lib/sanity'
const fallbackParagraphs=[
"New Religion est un premier long-métrage qui ne cherche jamais à faire peur de manière conventionnelle. Keishi Kondo s'intéresse davantage au deuil, à la mémoire et à la manière dont une société entière semble incapable de tourner la page. Dans ce Japon presque irréel, les personnages avancent comme des fantômes, prisonniers d'un passé qui refuse de disparaître.",
"On ressent immédiatement les influences du réalisateur. Impossible de ne pas penser au J-Horror des années 90 et 2000, notamment Kairo de Kiyoshi Kurosawa, mais aussi à David Lynch dans cette façon de mêler le corps, le spirituel et l'étrange. Pourtant, New Religion ne donne jamais l'impression d'être une simple imitation.",
"Visuellement, c'est probablement ce qui impressionne le plus. Le travail sur les couleurs est superbe, avec des teintes rouges et bleues qui donnent au film une atmosphère presque irréelle. La photographie est constamment inspirée et chaque plan semble avoir été composé avec beaucoup de soin.",
"Ce qui m'a particulièrement plu, c'est la manière dont le film utilise le corps comme élément central de son récit. Il devient à la fois un moyen de conserver les souvenirs, une prison dont on cherche à s'échapper, mais aussi le seul lien possible avec les disparus.",
"Là où New Religion m'a davantage perdu, c'est dans son rythme. Le film prend énormément son temps et certaines séquences s'étirent tellement que la tension finit par retomber.",
"Quand on découvre que le film a été tourné avec un micro-budget, sur seulement quelques week-ends, le résultat force encore davantage le respect.",
"New Religion est un film imparfait, parfois trop lent et un peu hermétique, mais il déborde de personnalité. Plus qu'un simple premier film réussi, c'est surtout la preuve que Keishi Kondo possède déjà une vraie identité de cinéaste."
]
type ReviewPageProps = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(
  {params}: ReviewPageProps
): Promise<Metadata> {
  const {slug} = await params
  const review = await getReview(slug)

  if (!review) {
    return {
      title: 'Critique introuvable | SHINEMA',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `${review.articleTitle} | Critique de ${review.filmTitle} (${review.year})`
  const description =
    review.excerpt ||
    `Découvrez notre critique de ${review.filmTitle}, réalisé par ${review.director}.`

  const pageUrl = `https://shinema.fr/critiques/${review.slug}`

  const imageUrl = review.mainImage
    ? urlFor(review.mainImage).width(1200).height(630).url()
    : 'https://shinema.fr/new-religion.jpg'

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'SHINEMA',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: review.publishedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Image de ${review.filmTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}
export default async function ReviewPage({params}: ReviewPageProps) {const {slug}=await params;const r=await getReview(slug);if(!r)notFound();const image=r.mainImage?urlFor(r.mainImage).width(1200).height(1600).url():'/new-religion.jpg';return <article className="review-page"><header><p className="kicker">CRITIQUE / {r.director.toUpperCase()} / {r.year}</p><h1>{r.articleTitle}</h1><div className="review-meta"><div><em>{r.filmTitle}</em><br/>{r.director}, {r.year}</div><div className="rating"><strong>{r.rating}</strong><span>/10</span></div></div></header><div className="review-hero"><Image src={image} alt={`Affiche de ${r.filmTitle}`} fill priority sizes="100vw"/></div><div className="article-body">{r.body ? <PortableText value={r.body as never}/> : fallbackParagraphs.map((p,i)=><p key={i}>{p}</p>)}</div></article>}
