<script setup lang="ts">
import { computed } from 'vue'
import { TSeries } from '~/types/series'
import { TReview } from '~/types/review'

definePageMeta({
  layout: 'index-layout',
})

const route = useRoute()
const {
  public: { API_URL },
} = useRuntimeConfig()
const { data: seriesResponse } = useFetch(`${API_URL}/series/${route.params.slug}`)
const { data: reviewResponse } = useFetch(
  `${API_URL}/series/${route.params.slug}/reviews?fields=author,categories,created_at,excerpt,image,series,slug,title`
)

const series: TSeries = computed(() => seriesResponse.value)
const reviews: TReview[] | undefined = computed(() => reviewResponse.value)
</script>

<template>
  <div class="flex flex-col gap-8">
    <div
      v-if="series"
      class="text-[rgba(0,0,0,0.75)] p-8 sm:pt-1 border-b-[1px] border-b-[rgba(0,0,0,0.06)]"
    >
      <p class="capitalize text-xl sm:text-lg font-semibold mb-2">{{ series.name }}</p>
      <p class="text-[1.02rem] sm:text-[0.92rem]/6 mb-4">{{ series.description }}</p>
      <p class="text-[0.85rem] sm:text-xs uppercase font-semibold">SERIES BY {{ series.author }}</p>
    </div>
    <div class="p-8 sm:pt-1" v-else>
      <p class="h-5 w-60 bg-[#ddd] animate-pulse mb-4" />
      <p class="h-16 w-full bg-[#ddd] animate-pulse mb-4" />
      <p class="h-4 w-40 bg-[#ddd] animate-pulse" />
    </div>

    <Review v-if="reviews" v-for="(review, index) in reviews" :key="index" v-bind="review" />
    <ReviewSkeleton v-else v-for="n in 3" :key="n" />
  </div>
</template>
