import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'],
    },
    sitemap: 'https://shinema.fr/sitemap.xml',
    host: 'https://shinema.fr',
  }
}
