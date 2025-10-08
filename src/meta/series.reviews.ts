import type { TSeries } from '@/types/series'
import { capitalize } from '@/utilities/string'

export const useSeriesReviewsMetaInfo = (series: TSeries) => {
  if (!series) return {}

  const title = `${capitalize(series.name)} by ${capitalize(series.author)}`

  return {
    title,
    meta: [
      { name: 'description', content: series.description },
      {
        property: 'type',
        content: 'Website',
      },
      { property: 'og:title', content: title },
      {
        property: 'og:description',
        content: series.description,
      },
      {
        property: 'og:url',
        content: `https://library.olamileke.dev${series.slug}`,
      },
      {
        property: 'og:image',
        content: series?.images?.[0],
      },
      {
        property: 'og:image:width',
        content: 800,
      },
      {
        property: 'og:image:height',
        content: 600,
      },
      {
        property: 'og:site_name',
        content: "Olamileke's Library",
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:creator',
        content: '@f_olamileke',
      },
      {
        property: 'twitter:title',
        content: title,
      },
      {
        property: 'twitter:description',
        content: series.description,
      },
      {
        property: 'twitter:image',
        content: series?.images?.[0],
      },
    ],
  }
}
