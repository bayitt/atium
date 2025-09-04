import { ref } from 'vue'
import type { TReview } from '../types/review'

export const useGetReviews = () => {
  const reviews = ref<TReview[] | undefined>()

  fetch(`${import.meta.env?.VITE_API_URL}/reviews`)
    .then(async (response) => {
      reviews.value = (await response.json())['reviews']
    })
    .catch((error) => {})

  return { reviews }
}
