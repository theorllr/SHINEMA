import type {MetadataRoute} from 'next'
import {getReviews} from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shinema.fr'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/critiques`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/classements`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/retrospectives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/actualites`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]

  const reviews = await getReviews()

  const reviewPages: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: `${baseUrl}/critiques/${review.slug}`,
    lastModified: review.publishedAt
      ? new Date(review.publishedAt)
      : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...reviewPages]
}
