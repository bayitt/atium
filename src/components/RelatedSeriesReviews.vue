<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import { useGetRelatedSeriesReviews } from '@/api/review'
import type { TReview } from '@/types/review'
import type { TSeries } from '@/types/series'
import Review from '@/components/Review.vue'
import ReviewSkeleton from '@/components/ReviewSkeleton.vue'

const emit = defineEmits<{
  displayMore: [more: boolean]
}>()
const { review_slug, series } = defineProps<{
  review_slug: string
  series: Pick<TSeries, 'uuid' | 'name'>
}>()
const reviews = ref<TReview[] | undefined>()

const updateReviews = (fetchedReviews: TReview[]) => {
  const parsedReviews = fetchedReviews.filter(({ slug }) => review_slug != slug)
  parsedReviews.reverse()
  reviews.value = parsedReviews

  emit('displayMore', parsedReviews.length > 0)
}

watchEffect(() => {
  reviews.value = undefined
  useGetRelatedSeriesReviews(review_slug, series.uuid, updateReviews)
})
</script>

<template>
  <section class="bg-[rgba(0,0,0,0.01)] text-[rgba(0,0,0,0.85)] py-10 sm:px-10 md:p-18">
    <div class="max-w-[750px] mx-auto">
      <p class="text-xl sm:text-lg text-center font-semibold mb-8 md:mb-12">
        More from <span class="capitalize">{{ series.name }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="relative left-[6px] animate-bounce size-6 inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
          />
        </svg>
      </p>

      <template v-if="reviews">
        <Review
          v-for="(review, index) in reviews"
          :key="index"
          v-bind="review"
          class="sm:p-10 pr-0 shadow bg-white mb-8 last-of-type:mb-0"
        />
      </template>
      <template v-else>
        <ReviewSkeleton v-for="n in 3" :key="n" class="p-10 pr-0 bg-white mb-8 last-of-type:mb-0" />
      </template>
    </div>
  </section>
</template>
