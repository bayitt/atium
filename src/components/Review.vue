<script setup lang="ts">
import { TReview } from '../types/review'
import { parseDate } from '../utilities/date'

defineProps<Omit<TReview, "content">>()
</script>

<template>
  <RouterLink
    :to="slug"
    class="grid grid-cols-12 text-[rgba(0,0,0,0.7)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] pb-8"
  >
    <div class="col-span-8 pr-5">
      <div class="flex gap-2 mb-4">
        <RouterLink
          v-for="(category, index) in categories"
          class="text-[0.85rem] capitalize underline decoration-double text-[rgba(0,0,0,0.75)]"
          :key="index"
          :to="`/category${category.slug}`"
          >{{ category.name }}</RouterLink
        >
      </div>
      <p class="capitalize text-[1.1rem] font-semibold mb-2 text-black">{{ title }}</p>
      <p class="text-[0.94rem]/6 mb-4">{{ excerpt }}</p>
      <p v-if="series" class="text-sm mb-4">
        Published in
        <RouterLink
          :to="`/series${series.slug}`"
          class="capitalize underline lg:no-underline lg:hover:underline text-black font-medium"
          >{{ series.name }}</RouterLink
        >
      </p>
      <p class="text-xs uppercase font-semibold">
        {{ parseDate(created_at) }} | BOOK BY {{ author }}
      </p>
    </div>
    <div class="col-span-4 flex items-center">
      <img :src="image" class="object-cover object-center rounded-md w-full h-[200px]" />
    </div>
  </RouterLink>
</template>