import type { TReview } from '../types/review'

export const useGetReviews = (func: (reviews: TReview[]) => void, categoryUuid?: string) => {
  fetch(
    categoryUuid
      ? `${import.meta.env?.VITE_API_URL}/categories/${categoryUuid}/reviews?fields=title,slug,image,created_at,excerpt,author,categories,series`
      : `${import.meta.env?.VITE_API_URL}/reviews?fields=title,slug,image,created_at,excerpt,author,categories,series`,
  )
    .then(async (response) => {
      const reviews = (await response.json())['reviews']
      func(reviews)
    })
    .catch((error) => {})
}
