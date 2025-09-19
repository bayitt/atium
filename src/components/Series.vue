<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import { useGetSeries } from '@/api/series'
import { TSeries } from '@/types/series'
import { TPagination } from '@/types/pagination'

const series = ref<TSeries[] | undefined>()
const pagination = ref<TPagination | undefined>()

const updateSeries = (fetchedSeries: TSeries[], fetchedPagination: TPagination) => {
  series.value = fetchedSeries
  pagination.value = fetchedPagination

  console.log(fetchedSeries);
  console.log(fetchedPagination);
}

useGetSeries(1, updateSeries)
</script>

<template>
  <template v-if="series">
    <RouterLink v-for="(item, index) in series" :to="`/series${item.slug}`" :key="index"
      class="grid grid-cols-12 text-[rgba(0,0,0,0.7)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] pb-8 mb-8">
      <div class="col-span-6">
        <p class="capitalize text-base text-black font-semibold mb-2">
          {{ item.name }}
        </p>
        <p class="text-[0.9rem]/6 mb-4">
          {{ item.description }}
        </p>
        <p class="text-sm mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="black" class="size-4 inline relative -top-[1.5px] mr-[2px]">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

          {{ item.images.length }} {{ item.images.length > 1 ? 'reviews' : 'review' }}
        </p>
        <p class="text-xs uppercase font-semibold">SERIES BY {{ item.author }}</p>
      </div>
      <div class="col-span-6 flex flex-wrap gap-3 pl-8">
        <img v-for="(image, index) in item.images" :key="index" :src="image" class="object-cover object-center" :style="{
          width: `calc((100% / ${item.images.length <= 2 ? item.images.length : Math.ceil(item.images.length / 2)}) - 12px)`,
          height: item.images.length === 1 ? '200px' : '120px'
        }" />
      </div>
    </RouterLink>
  </template>
</template>
