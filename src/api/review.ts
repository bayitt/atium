import { useRoute } from 'vue-router'
import type { TReview } from '@/types/review'
import type { TPagination } from '@/types/pagination'
import { store } from '@/store'
import type { TSeries } from '@/types/series'

const REVIEW_COUNT = 10

export const useGetReviews = (
  page: number,
  func: (reviews: TReview[], pagination: TPagination) => void,
  categoryUuid?: string,
) => {
  let reviews: TReview[]
  let totalPages: number
  if (categoryUuid) {
    const storeKey = `category-${categoryUuid}`
    reviews = store[storeKey]?.reviews ?? []
    totalPages = store[storeKey]?.totalPages ?? 0
  } else {
    reviews = store.home.reviews
    totalPages = store.home.totalPages
  }

  const length = (page - 1) * REVIEW_COUNT + 1

  if (reviews.length >= length) {
    const sliceIndex = page * REVIEW_COUNT
    func(reviews.slice(0, sliceIndex), { currentPage: page, totalPages })
    return
  } else if (store.networkOperation === 'get.reviews') return

  store.networkOperation = 'get.reviews'
  fetch(
    categoryUuid
      ? `${import.meta.env?.VITE_API_URL}/categories/${categoryUuid}/reviews?page=${page}&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`
      : `${import.meta.env?.VITE_API_URL}/reviews?page=${page}&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`,
  )
    .then(async (response) => {
      const parsedResponse = await response.json()
      const fetchedReviews = parsedResponse['reviews']
      const pagination = parsedResponse['pagination']
      let reviews

      if (!categoryUuid) {
        reviews = [...store.home.reviews, ...fetchedReviews]
        store.home = { reviews, totalPages: pagination['totalPages'] }
      } else {
        const storeKey = `category-${categoryUuid}`
        reviews = [...(store[storeKey]?.reviews ?? []), ...fetchedReviews]
        store[storeKey] = { reviews, totalPages: pagination['totalPages'] }
      }

      func(reviews, pagination)
      store.networkOperation = ''
    })
    .catch((error) => {})
}

export const useGetSeriesReviews = (func: (series: TSeries, reviews: TReview[]) => void) => {
  const route = useRoute()
  const slug = '/' + route.params.slug
  let series = (store.series.series as TSeries[]).find(
    ({ slug: seriesSlug }) => slug === seriesSlug,
  )

  const getSeriesReviews = (series: TSeries) => {
    const storeKey = `series-${series.uuid}`

    if (store[storeKey]) {
      func(series, store[storeKey])
      return
    }

    store.networkOperation = 'get.series.reviews'

    fetch(
      `${import.meta.env?.VITE_API_URL}/series/${series.uuid}/reviews?fields=author,categories,created_at,excerpt,image,series,slug,title`,
    ).then(async (response) => {
      const reviews = await response.json()
      store[storeKey] = reviews
      func(series, reviews)
      store.networkOperation = ''
    })
  }

  if (series) {
    return getSeriesReviews(series)
  }

  store.networkOperation = 'get.series.reviews'

  fetch(`${import.meta.env?.VITE_API_URL}/series${slug}`).then(async (response) => {
    const series = await response.json()
    return getSeriesReviews(series)
  })
}

export const useGetReview = (slug: string, func: (review: TReview) => void) => {
  const storeKey = `review-${slug}`

  if (store[storeKey]) {
    func(store[storeKey])
    return
  }

  fetch(`${import.meta.env?.VITE_API_URL}/reviews${slug}`)
    .then(async (response) => {
      const review = await response.json()
      store[storeKey] = review
      func(review)
    })
    .catch(() => {})
}

export const useGetRelatedSeriesReviews = (
  review_slug: string,
  series_uuid: string,
  func: (reviews: TReview[]) => void,
) => {
  const storeKey = `review-${review_slug}`
  const review = store[storeKey]

  if (review && review['related_series_reviews']) {
    func(review['related_series_reviews'])
    return
  }

  fetch(
    `${import.meta.env?.VITE_API_URL}/series/${series_uuid}/reviews?fields=author,categories,created_at,excerpt,image,series,slug,title`,
  )
    .then(async (response) => {
      const reviews = await response.json()
      if (!store[storeKey]) {
        store[storeKey] = { related_series_reviews: reviews }
      } else {
        store[storeKey] = { ...store[storeKey], related_series_reviews: reviews }
      }

      func(reviews)
    })
    .catch(() => {})
}

export const useGetRelatedCategoriesReviews = (
  review_slug: string,
  category_uuids: string[],
  func: (reviews: TReview[]) => void,
) => {
  const storeKey = `review-${review_slug}`
  const review = store[storeKey]

  if (review && review['related_categories_reviews']) {
    func(review['related_categories_reviews'])
    return
  }

  fetch(
    `${import.meta.env?.VITE_API_URL}/categories/reviews?category_uuids=${category_uuids.join('.')}&fields=author,categories,created_at,excerpt,image,series,slug,title`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  )
    .then(async (response) => {
      const reviews = await response.json()
      if (!store[storeKey]) {
        store[storeKey] = { related_categories_reviews: reviews }
      } else {
        store[storeKey] = { ...store[storeKey], related_categories_reviews: reviews }
      }

      func(reviews)
    })
    .catch((error) => {
      console.log(error)
    })
}
