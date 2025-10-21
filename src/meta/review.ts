import type { TCategory } from '@/types/category'
import type { TReview } from '@/types/review'
import { capitalize } from '@/utilities/string'

export const useReviewsMetaInfo = (category: TCategory) => {
  if (category === undefined) return {}

  if (category === null)
    return {
      title: "Olamileke's Library",
      meta: [
        {
          name: 'description',
          content: 'A space for me to pen my feelings, thoughts and opinions about books I read.',
        },
        {
          property: 'type',
          content: 'Website',
        },
        { property: 'og:title', content: "Olamileke's Library" },
        {
          property: 'og:description',
          content: 'A space for me to pen my feelings, thoughts and opinions about books I read.',
        },
        {
          property: 'og:url',
          content: 'https://library.olamileke.dev',
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
          content: "Olamileke's Library",
        },
        {
          property: 'twitter:description',
          content: 'A space for me to pen my feelings, thoughts and opinions about books I read.',
        },
      ],
    }

  return {
    title: `Olamileke's Library - ${capitalize(category.name)}`,
    meta: [
      {
        name: 'description',
        content: `Reviews for ${capitalize(category.name)} books I read.`,
      },
      {
        property: 'type',
        content: 'Website',
      },
      { property: 'og:title', content: `Olamileke's Library - ${capitalize(category.name)}` },
      {
        property: 'og:description',
        content: `Reviews for ${capitalize(category.name)} books I read.`,
      },
      {
        property: 'og:url',
        content: `https://library.olamileke.dev${category.slug}`,
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
        content: `Olamileke's Library - ${capitalize(category.name)}`,
      },
      {
        property: 'twitter:description',
        content: `Reviews for ${capitalize(category.name)} books I read.`,
      },
    ],
  }
}

export const useReviewMetaInfo = (review: TReview) => {
  if (!review) return {}

  const p = window.document.createElement('p')
  p.innerHTML = review.content.slice(0, 200) + '...'
  review.title = capitalize(review.title)

  return {
    title: review.title,
    meta: [
      {
        name: 'description',
        content: p.textContent,
      },
      {
        property: 'type',
        content: 'Website',
      },
      { property: 'og:title', content: review.title },
      {
        property: 'og:description',
        content: p.textContent,
      },
      {
        property: 'og:url',
        content: `https://library.olamileke.dev${review.slug}`,
      },
      {
        property: 'og:site_name',
        content: "Olamileke's Library",
      },
      {
        property: 'og:image',
        content: review.image,
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
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:creator',
        content: '@f_olamileke',
      },
      {
        property: 'twitter:title',
        content: review.title,
      },
      {
        property: 'twitter:description',
        content: p.textContent,
      },
      {
        property: 'twitter:image',
        content: review.image,
      },
    ],
  }
}
