import {client} from './sanity'

export type Review = {
  _id: string
  filmTitle: string
  articleTitle: string
  slug: string
  director: string
  year: number
  rating: number
  excerpt: string
  publishedAt: string
  mainImage?: unknown
  body?: unknown[]
}

export const fallbackReview: Review = {
  _id: 'fallback-new-religion',
  filmTitle: 'New Religion',
  articleTitle: 'La mémoire ne meurt jamais',
  slug: 'new-religion-la-memoire-ne-meurt-jamais',
  director: 'Keishi Kondo',
  year: 2022,
  rating: 6.5,
  excerpt: "Un premier film hypnotique où le deuil, le corps et les souvenirs refusent de disparaître.",
  publishedAt: '2026-07-16',
}

export async function getReviews(): Promise<Review[]> {
  try {
    const reviews = await client.fetch<Review[]>(`*[_type == "review"] | order(publishedAt desc){
      _id, filmTitle, articleTitle, "slug": slug.current, director, year, rating, excerpt, publishedAt, mainImage, body
    }`)
    return reviews.length ? reviews : [fallbackReview]
  } catch { return [fallbackReview] }
}

export async function getReview(slug: string): Promise<Review | null> {
  try {
    const review = await client.fetch<Review | null>(`*[_type == "review" && slug.current == $slug][0]{
      _id, filmTitle, articleTitle, "slug": slug.current, director, year, rating, excerpt, publishedAt, mainImage, body
    }`, {slug})
    return review || (slug === fallbackReview.slug ? fallbackReview : null)
  } catch { return slug === fallbackReview.slug ? fallbackReview : null }
}
export type Retrospective = {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  mainImage?: unknown
  body?: unknown[]
}

export async function getRetrospectives(): Promise<Retrospective[]> {
  try {
    return await client.fetch<Retrospective[]>(`
      *[_type == "retrospective"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        mainImage,
        body
      }
    `)
  } catch {
    return []
  }
}

export async function getRetrospective(
  slug: string
): Promise<Retrospective | null> {
  try {
    return await client.fetch<Retrospective | null>(
      `
        *[
          _type == "retrospective" &&
          slug.current == $slug
        ][0] {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          publishedAt,
          mainImage,
          body
        }
      `,
      {slug}
    )
  } catch {
    return null
  }
}
export async function getRankings(): Promise<Ranking[]> {
  try {
    return await client.fetch<Ranking[]>(`
      *[_type == "ranking"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        mainImage,
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
    `)
  } catch {
    return []
  }
}

export async function getRanking(
  slug: string
): Promise<Ranking | null> {
  try {
    return await client.fetch<Ranking | null>(
      `
        *[
          _type == "ranking" &&
          slug.current == $slug
        ][0] {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          publishedAt,
          mainImage,
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
      {slug}
    )
  } catch {
    return null
  }
}
export function getReadingTime(body?: unknown[]): number {
  if (!body) return 1

  const text = body
    .filter(
      (block): block is {
        _type: string
        children?: {text?: string}[]
      } =>
        typeof block === 'object' &&
        block !== null &&
        '_type' in block
    )
    .filter((block) => block._type === 'block')
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? '')
    .join(' ')

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / 200))
}
export type RankingFilm = {
  _key: string
  title: string
  originalTitle?: string
  year?: number
  director?: string
  poster?: unknown
  comment?: string
}

export type Ranking = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  mainImage?: unknown
  body?: unknown[]
  films?: RankingFilm[]
}
