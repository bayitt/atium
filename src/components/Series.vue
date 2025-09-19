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
}

useGetSeries(1, updateSeries)
</script>

<template>
  <template v-if="series">
    <RouterLink
      v-for="(item, index) in series"
      :to="`/series${item.slug}`"
      :key="index"
      class="grid grid-cols-12 text-[rgba(0,0,0,0.7)] bg-[rgba(0,0,0,0.01)] p-5 mb-5"
    >
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
      <div class="col-span-6 flex flex-wrap gap-3 pl-8">
        <img
          v-for="(image, index) in item.images"
          :key="index"
          :src="image"
          class="object-cover object-center"
          :style="{
            width: `calc((100% / ${item.images.length <= 2 ? item.images.length : Math.ceil(item.images.length / 2)}) - 12px)`,
            height: item.images.length > 2 ? '120px' : '200px'
          }"
        />
      </div>
    </RouterLink>
  </template>
</template>
