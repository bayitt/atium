import { ref } from 'vue'
import type { TReview } from '../types/review'

export const useGetReviews = (func: (reviews: TReview[]) => void, categoryUuid?: string) => {
  fetch(
    categoryUuid
      ? `${import.meta.env?.VITE_API_URL}/categories/${categoryUuid}/reviews`
      : `${import.meta.env?.VITE_API_URL}/reviews`,
  )
    .then(async (response) => {
      const reviews = (await response.json())['reviews']
      func(reviews)
    })
    .catch((error) => {})
}
