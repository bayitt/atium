<script setup lang="ts">
import { ref, Suspense, computed, onMounted } from 'vue'
import type { TReview } from '~/types/review'
import type { TPagination } from '~/types/pagination'
import { useNetworkOperation } from '~/store'

const route = useRoute()
const networkOperation = useNetworkOperation()

const REVIEW_COUNT = 10
const {
  public: { API_URL },
} = useRuntimeConfig()
const endpoint = route.params?.slug
  ? `${API_URL}/categories/${route.params.slug}/reviews?page=1&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`
  : `${API_URL}/reviews?page=1&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`
const { data } = useFetch(endpoint, {
  key: endpoint,
  dedupe: 'defer',
  getCachedData: (key, nuxtApp) => {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

const reviews: any = computed({
  get: () => {
    if (!data.value) return []

    return [...data.value?.reviews]
  },
  set: (reviewResponse) => {
    data.value = { ...reviewResponse }
  },
})

const pagination: TPagination = computed({
  get: () => {
    if (!data.value) return { currentPage: 1, totalPages: 1 }

    return data.value?.pagination
  },
  set: (newPagination) => {},
})

const loadReviews = async () => {
  if (!pagination?.value || networkOperation.value === 'get.reviews') return

  const screenHeight = window.screen.height
  const totalHeight = document.body.offsetHeight
  if (totalHeight - (window.scrollY + screenHeight) < 3) {
    if (pagination.value?.totalPages - pagination.value?.currentPage > 0) {
      networkOperation.value = 'get.reviews'
      const endpoint = route.params?.slug
        ? `${API_URL}/categories/${route.params.slug}/reviews?page=${
            pagination.value.currentPage + 1
          }&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`
        : `${API_URL}/reviews?page=${
            pagination.value.currentPage + 1
          }&count=${REVIEW_COUNT}&fields=title,slug,image,created_at,excerpt,author,categories,series`

      const nuxtApp = useNuxtApp()
      const response = nuxtApp.payload.data[endpoint] ?? (await $fetch(endpoint))
      networkOperation.value = ''

      if (!response?.reviews) return

      nuxtApp.payload.data[endpoint] = response

      const newReviews = [...reviews.value, ...response?.reviews]
      reviews.value = { reviews: newReviews, pagination: response?.pagination }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', loadReviews)
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', loadReviews)
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <template v-if="data?.reviews">
      <Review v-for="(review, index) in reviews" :key="index" v-bind="review" />
      <template v-if="networkOperation === 'get.reviews'">
        <ReviewSkeleton v-for="n in 3" :key="n" />
      </template>
    </template>
    <template v-else>
      <ReviewSkeleton v-for="n in 4" :key="n" />
    </template>
  </div>
</template>
