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
