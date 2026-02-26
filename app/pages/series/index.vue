<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useNetworkOperation } from '~/store'

definePageMeta({ layout: 'index-layout' })

const networkOperation = useNetworkOperation()

const {
  public: { API_URL },
} = useRuntimeConfig()
const SERIES_COUNT = 10
const endpoint = `${API_URL}/series?page=1&count=${SERIES_COUNT}`
const { data } = useFetch(endpoint, {
  key: endpoint,
  dedupe: 'defer',
  getCachedData: (key, nuxtApp) => {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

const series = computed({
  get: () => {
    if (!data.value?.series) return undefined

    return [ ...data.value.series ]
  },
  set: (seriesResponse) => {
    data.value = { ...seriesResponse }
  },
})

const pagination = computed(() => {
  if (!data.value?.pagination) return { currentPage: 1, totalPages: 1 }

  return data.value.pagination
})

const loadSeries = async () => {
  if (!pagination?.value || networkOperation.value === 'get.series') return

  const screenHeight = window.screen.height
  const totalHeight = document.body.offsetHeight
  if (totalHeight - (window.scrollY + screenHeight) < 3) {
    if (pagination.value?.totalPages - pagination.value?.currentPage > 0) {
      networkOperation.value = 'get.series'
      const endpoint = `${API_URL}/series?page=${pagination.value?.currentPage + 1}&count=${SERIES_COUNT}`

      const nuxtApp = useNuxtApp()
      const response = nuxtApp.payload.data[endpoint] ?? (await $fetch(endpoint))
      networkOperation.value = ''

      if (!response?.series) return

      nuxtApp.payload.data[endpoint] = response

      const newSeries = [...series.value, ...response?.series]
      series.value = { series: newSeries, pagination: response?.pagination }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', loadSeries)
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', loadSeries)
})

</script>

<template>
  <div class="pt-5 sm:pt-0">
    <template v-if="series">
      <NuxtLink
        v-for="(item, index) in series"
        :to="`/series${item.slug}`"
        :key="index"
        class="
          flex flex-col-reverse
          sm:grid
          grid-cols-12
          text-[rgba(0,0,0,0.8)]
          border-b-[1px] border-b-[rgba(0,0,0,0.06)]
          last-of-type:border-none
          pb-8
          mb-8
          sm:mb-8
          last-of-type:mb-0
        "
      >
        <div class="sm:col-span-6 px-[6%] sm:px-0">
          <p class="hidden sm:block capitalize text-lg sm:text-base text-black font-semibold mb-2">
            {{ item.name }}
          </p>
          <p class="text-base/6 sm:text-[0.9rem]/6 mb-3 sm:mb-4">
            {{ item.description }}
          </p>
          <p class="text-[1.02rem] sm:text-sm mb-3 sm:mb-5">
            {{ (item?.images ?? []).length }}
            {{ (item?.images ?? []).length > 1 ? 'reviews' : 'review' }}
          </p>
          <p class="text-[0.85rem] sm:text-xs uppercase font-semibold">
            SERIES BY {{ item.author }}
          </p>
        </div>
        <div
          class="
            relative
            sm:col-span-6
            flex flex-wrap
            px-[6%]
            sm:px-0
            gap-3
            sm:gap-3
            justify-center
            items-center
            mb-5
            sm:mb-0
          "
          :class="(item?.images ?? []).length === 1 ? 'sm:pl-32' : 'sm:pl-6'"
        >
          <img
            v-for="(image, index) in item?.images"
            :key="index"
            :src="image"
            class="object-contain"
            :class="(item?.images ?? []).length === 1 ? 'h-[180px]' : 'h-[170px] sm:h-[145px]'"
          />
          <div
            class="
              sm:hidden
              absolute
              left-0
              bottom-0
              px-[6%]
              py-4
              text-white
              w-full
              bg-[rgba(0,0,0,0.4)]
            "
            style="backdrop-filter: blur(10px)"
          >
            <p class="capitalize text-lg">{{ item.name }}</p>
          </div>
        </div>
      </NuxtLink>
      <template v-if="networkOperation === 'get.series'">
        <SeriesSkeleton v-for="n in 3" :key="n" />
      </template>
    </template>
    <template v-else>
      <SeriesSkeleton v-for="n in 4" :key="n" />
    </template>
  </div>
</template>
