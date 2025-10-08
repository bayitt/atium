const title = "Olamileke's Library - Series"
const description = 'A rundown of the different series containing reviews on the platform'

export const seriesMetaInfo = {
  title,
  meta: [
    { name: 'description', content: description },
    {
      property: 'type',
      content: 'Website',
    },
    { property: 'og:title', content: title },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:url',
      content: 'https://library.olamileke.dev/series',
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
      content: description,
    },
  ],
}
