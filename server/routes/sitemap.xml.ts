import type { TCategory } from '~/types/category'
import type { TSeries } from '~/types/series'
import type { TReview } from '~/types/review'
import { capitalize } from '~/utilities/string'

export default defineEventHandler(async (event) => {
  const {
    public: { API_URL },
  } = useRuntimeConfig()

  const categories: TCategory[] = await $fetch(`${API_URL}/categories`)
  const { series }: Record<'series', TSeries[]> = await $fetch(`${API_URL}/series?count=100`)
  const { reviews }: Record<'reviews', TReview[]> = await $fetch(
    `${API_URL}/reviews?count=100&fields=title,slug,created_at`
  )

  event.node.res.setHeader('Content-Type', 'text/xml')

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://library.olamileke.dev</loc>
            <title>Olamileke's Library</title>
            <priority>1</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>https://library.olamileke.dev/about</loc>
            <title>Olamileke's Library - About</title>
            <priority>1</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        ${categories.map(({ name, slug }) => {
          return `<url>
            <loc>https://library.olamileke.dev/category${slug}</loc>
            <title>Olamileke's Library - ${capitalize(name)}</title>
            <priority>1</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>`
        })}
        <url>
            <loc>https://library.olamileke.dev/series</loc>
            <title>Olamileke's Library - Series</title>
            <priority>1</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        ${series.map(({ name, slug }) => {
          return `<url>
            <loc>https://library.olamileke.dev/series${slug}</loc>
            <title>Olamileke's Library - ${capitalize(name)}</title>
            <priority>1</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>`
        })}
        ${reviews.map(({ title, slug, created_at }) => {
          return `<url>
            <loc>https://library.olamileke.dev${slug}</loc>
            <title>${capitalize(title)}</title>
            <priority>1</priority>
            <lastmod>${new Date(created_at).toISOString()}</lastmod>
        </url>`
        })}
    </urlset>
    `
})
