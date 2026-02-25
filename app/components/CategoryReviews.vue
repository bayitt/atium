<script setup lang="ts">
import { ref, Suspense, watchEffect, computed, onMounted } from 'vue'
import { useGetReviews } from '~/api/review'
import type { TReview } from '~/types/review'
import type { TPagination } from '~/types/pagination'
import { useNetworkOperation } from '~/store'

const route = useRoute()
// const reviews = ref<TReview[] | undefined>([])
// const pagination = ref<TPagination | undefined>()
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

const reviews: TReview[] | undefined = computed(() => {
  if (!data.value) return undefined

  return data.value?.reviews
})

// const loadReviews = () => {
//   if (!pagination?.value) return

//   const screenHeight = window.screen.height
//   const totalHeight = document.body.offsetHeight
//   if (totalHeight - (window.scrollY + screenHeight) < 3) {
//     if (pagination.value?.totalPages - pagination.value?.currentPage > 0) {
//       let category: TCategory | undefined
//       if (route.params?.slug) {
//         category = (categories?.value ?? []).find(({ slug }) => slug === '/' + route.params.slug)
//       }
//       useGetReviews(pagination.value.currentPage + 1, category?.uuid)
//     }
//   }
// }

// onMounted(() => {
//   window.addEventListener('scroll', loadReviews)
//   window.scrollTo(0, 0)
// })

// onUnmounted(() => {
//   window.removeEventListener('scroll', loadReviews)
// })
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
