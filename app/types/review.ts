export type TReview = {
  title: string
  slug: string
  author: string
  image: string
  content: string
  created_at: string
  categories: { uuid: string; name: string; slug: string }[]
  series?: { uuid: string; name: string; slug: string }
  excerpt?: string
}
