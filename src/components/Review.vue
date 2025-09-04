<script setup lang="ts">
import { TReview } from '../types/review'
import { parseDate } from '../utilities/date'

defineProps<TReview>()
</script>

<template>
  <div
    class="grid grid-cols-12 text-[rgba(0,0,0,0.7)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] pb-8"
  >
    <div class="col-span-8 pr-5">
      <div class="flex gap-2 mb-4">
        <RouterLink
          v-for="(category, index) in categories"
          class="text-[0.85rem] capitalize font-semibold underline decoration-double text-[rgba(0,0,0,0.75)]"
          :key="index"
          :to="`/category${category.slug}`"
          >{{ category.name }}</RouterLink
        >
      </div>
      <p class="capitalize text-[1.1rem] font-semibold mb-2 text-black">{{ title }}</p>
      <p class="text-[0.94rem]/6 mb-4">{{ content.slice(0, 200) }}</p>
      <p class="text-xs uppercase font-semibold mb-4">
        {{ parseDate(created_at) }} | BOOK BY {{ author }}
      </p>
      <p v-if="series" class="text-sm">
        Published in
        <RouterLink
          :to="`/series${series.slug}`"
          class="capitalize underline decoration-double text-black font-medium"
          >{{ series.name }}</RouterLink
        >
      </p>
    </div>
    <div class="col-span-4 flex items-center">
      <img :src="image" class="object-cover object-center rounded-md w-full h-[200px]" />
    </div>
  </div>
</template>