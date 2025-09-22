<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useGetSeries } from '@/api/series'
import { TSeries } from '@/types/series'
import { TPagination } from '@/types/pagination'
import SeriesSkeleton from '../components/SeriesSkeleton.vue'
import { store } from '@/store'

const series = ref<TSeries[] | undefined>()
const pagination = ref<TPagination | undefined>()

const updateSeries = (fetchedSeries: TSeries[], fetchedPagination: TPagination) => {
  series.value = fetchedSeries
  pagination.value = fetchedPagination

}

useGetSeries(1, updateSeries)

onMounted(() => {
  window.addEventListener("scroll", () => {
    const screenHeight = window.screen.height
    const totalHeight = document.body.offsetHeight

    if (totalHeight - (window.scrollY + screenHeight) < 3) {
      if ((pagination.value?.totalPages - pagination.value?.currentPage) > 0) {
        useGetSeries(pagination.value.currentPage + 1, updateSeries);
      }
    }
  })
})
</script>

<template>
  <template v-if="series">
    <RouterLink v-for="(item, index) in series" :to="`/series${item.slug}`" :key="index"
      class="grid grid-cols-12 text-[rgba(0,0,0,0.7)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] last-of-type:border-none pb-8 mb-8">
      <div class="col-span-6">
        <p class="capitalize text-base text-black font-semibold mb-2">
          {{ item.name }}
        </p>
        <p class="text-[0.9rem]/6 mb-4">
          {{ item.description }}
        </p>
        <p class="text-sm mb-5">
          {{ item.images.length }} {{ item.images.length > 1 ? 'reviews' : 'review' }}
        </p>
        <p class="text-xs uppercase font-semibold">SERIES BY {{ item.author }}</p>
      </div>
      <div class="col-span-6 flex flex-wrap gap-3" :class="item.images.length === 1 ? 'pl-32' : 'pl-6'">
        <img v-for="(image, index) in item.images" :key="index" :src="image" class="object-cover object-center" :style="{
          width: `calc((100% / ${item.images.length <= 2 ? item.images.length : Math.ceil(item.images.length / 2)}) - 12px)`,
          height: item.images.length === 1 ? '200px' : '120px'
        }" />
      </div>
    </RouterLink>
    <template v-if="store.networkOperation === 'get.series'">
      <SeriesSkeleton v-for="n in 3" :key="n" />
    </template>
  </template>
  <template v-else>
    <SeriesSkeleton v-for="n in 4" :key="n" />
  </template>
</template>
