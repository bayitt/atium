<script setup lang="ts">
import { computed } from 'vue'
import type { TSeries } from '~/types/series'
import type { TReview } from '~/types/review'
import { capitalize } from '~/utilities/string'

definePageMeta({
  layout: 'index-layout',
})

const route = useRoute()
const {
  public: { API_URL },
} = useRuntimeConfig()

const seriesEndpoint = `${API_URL}/series/${route.params.slug}`
const { data: seriesResponse } = await useFetch(seriesEndpoint, {
  key: seriesEndpoint,
  dedupe: 'defer',
  getCachedData: (key, nuxtApp) => {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})
const reviewEndpoint = `${API_URL}/series/${route.params.slug}/reviews?fields=author,categories,created_at,excerpt,image,series,slug,title`
const { data: reviewResponse } = await useFetch(reviewEndpoint, {
  key: reviewEndpoint,
  dedupe: 'defer',
  getCachedData: (key, nuxtApp) => {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

const series: TSeries = computed(() => seriesResponse.value)
const reviews: TReview[] | undefined = computed(() => reviewResponse.value)

const title = `${capitalize(seriesResponse.value.name)} by ${capitalize(seriesResponse.value.author)}`
useSeoMeta({
  title,
  description: seriesResponse.value.description,
  ogTitle: title,
  ogDescription: seriesResponse.value.description,
  ogUrl: 'https://library.olamileke.dev/series',
  twitterCreator: '@f_olamileke',
  twitterTitle: title,
  twitterDescription: seriesResponse.value.description,
})
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
