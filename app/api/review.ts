import type { TReview } from '~/types/review'
import type { TPagination } from '~/types/pagination'
import { useNetworkOperation } from '~/store'

const REVIEW_COUNT = 10

export const useGetReviews = async (page: number, categoryUuid?: string) => {
  const { API_URL } = useRuntimeConfig()
  const endpoint = categoryUuid
    ? `${API_URL}/categories/${categoryUuid}/reviews?page=${page}&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`
    : `${API_URL}/reviews?page=${page}&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`

  const networkOperation = useNetworkOperation()

  networkOperation.value = 'get.reviews'
  const { data } = await useAsyncData(endpoint, async (_nuxtApp, { signal }) => {
    const response: { reviews: TReview[]; pagination: TPagination } = await $fetch(endpoint, {
      signal,
    })
    return { ...response }
  })

  networkOperation.value = ''
  return { ...data.value }
}
