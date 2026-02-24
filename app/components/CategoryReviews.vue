<script setup lang="ts">
import { ref, Suspense, watchEffect, onMounted } from 'vue'
import { useGetReviews } from '~/api/review'
import type { TReview } from '~/types/review'
import type { TPagination } from '~/types/pagination'
import { useNetworkOperation } from '~/store'

const route = useRoute()
const reviews = ref<TReview[] | undefined>()
const pagination = ref<TPagination | undefined>()
const networkOperation = useNetworkOperation()

// watchEffect(() => {
if (route.params?.slug) {
  const category = (categories?.value ?? []).find(({ slug }) => slug === '/' + route.params.slug)
  if (category) {
    reviews.value = undefined
    useGetReviews(1, category.uuid)
  }
} else {
  reviews.value = undefined
  useGetReviews(1)
}
// })

const loadReviews = () => {
  if (!pagination?.value) return

  const screenHeight = window.screen.height
  const totalHeight = document.body.offsetHeight

  if (totalHeight - (window.scrollY + screenHeight) < 3) {
    if (pagination.value?.totalPages - pagination.value?.currentPage > 0) {
      let category: TCategory | undefined
      if (route.params?.slug) {
        category = (categories?.value ?? []).find(({ slug }) => slug === '/' + route.params.slug)
      }
      useGetReviews(pagination.value.currentPage + 1, category?.uuid)
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
    <template v-if="reviews">
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
