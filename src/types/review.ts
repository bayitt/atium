export type TReview = {
  title: string
  slug: string
  author: string
  image: string
  content: string
  created_at: string
  categories: { name: string; slug: string }[]
  series?: { name: string; slug: string }
}
