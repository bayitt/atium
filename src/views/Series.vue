<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useGetSeries } from '@/api/series'
import type { TSeries } from '@/types/series'
import type { TPagination } from '@/types/pagination'
import SeriesSkeleton from '../components/SeriesSkeleton.vue'
import { store } from '@/store'
import { seriesMetaInfo } from '@/meta/series'

useHead(seriesMetaInfo)

const series = ref<TSeries[] | undefined>()
const pagination = ref<TPagination | undefined>()

const updateSeries = (fetchedSeries: TSeries[], fetchedPagination: TPagination) => {
  series.value = fetchedSeries
  pagination.value = fetchedPagination
}

useGetSeries(1, updateSeries)

const loadSeries = () => {
  if (!pagination?.value) return

  const screenHeight = window.screen.height
  const totalHeight = document.body.offsetHeight

  if (totalHeight - (window.scrollY + screenHeight) < 3) {
    if (pagination.value?.totalPages - pagination.value?.currentPage > 0) {
      useGetSeries(pagination.value.currentPage + 1, updateSeries)
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
      <RouterLink
        v-for="(item, index) in series"
        :to="`/series${item.slug}`"
        :key="index"
        class="flex flex-col-reverse sm:grid grid-cols-12 text-[rgba(0,0,0,0.8)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] last-of-type:border-none pb-8 mb-8 sm:mb-8 last-of-type:mb-0"
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
          class="relative sm:col-span-6 flex flex-wrap px-[6%] sm:px-0 gap-3 sm:gap-3 justify-center items-center mb-5 sm:mb-0"
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
            class="sm:hidden absolute left-0 bottom-0 px-[6%] py-4 text-white w-full bg-[rgba(0,0,0,0.4)]"
            style="backdrop-filter: blur(10px)"
          >
            <p class="capitalize text-lg">{{ item.name }}</p>
          </div>
        </div>
      </RouterLink>
      <template v-if="store.networkOperation === 'get.series'">
        <SeriesSkeleton v-for="n in 3" :key="n" />
      </template>
    </template>
    <template v-else>
      <SeriesSkeleton v-for="n in 4" :key="n" />
    </template>
  </div>
</template>
