<script setup lang="ts">
import { TReview } from '@/types/review'
import { parseDate } from '@/utilities/date'

defineProps<Omit<TReview, 'content'>>()
</script>

<template>
  <RouterLink
    :to="slug"
    class="flex flex-col-reverse sm:grid grid-cols-12 text-[rgba(0,0,0,0.75)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] last-of-type:border-none pb-8"
  >
    <div class="px-[6%] sm:px-0 sm:col-span-8 lg:pr-5">
      <div class="flex gap-2 mb-4">
        <RouterLink
          v-for="(category, index) in categories"
          class="text-base sm:text-[0.85rem] capitalize underline decoration-double text-[rgba(0,0,0,0.75)]"
          :key="index"
          :to="`/category${category.slug}`"
          >{{ category.name }}</RouterLink
        >
      </div>
      <p class="hidden sm:block capitalize text-[1.05rem] font-semibold mb-2 text-black">
        {{ title }}
      </p>
      <p class="text-[1.02rem] sm:text-[0.9rem]/6 mb-4" v-html="excerpt + '...'" />
      <p v-if="series" class="text-[1.0rem] sm:text-[0.84rem] mb-4">
        Published in
        <RouterLink
          :to="`/series${series.slug}`"
          class="capitalize underline lg:no-underline lg:hover:underline text-black font-medium"
          >{{ series.name }}
        </RouterLink>
      </p>
      <p class="text-[0.85rem] sm:text-xs uppercase font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#EFBF04"
          class="size-4 relative -top-[1.5px] inline mr-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
        {{ parseDate(created_at) }} | BOOK BY {{ author }}
      </p>
    </div>
    <div class="relative sm:col-span-4 flex items-center mb-5 sm:mb-0">
      <img :src="image" class="object-contain rounded w-full h-[250px] sm:h-[200px]" />
      <div
        class="sm:hidden absolute left-0 bottom-0 px-[6%] py-4 text-white w-full bg-[rgba(0,0,0,0.4)]"
        style="backdrop-filter: blur(10px)"
      >
        <p class="capitalize text-lg">{{ title }}</p>
      </div>
    </div>
  </RouterLink>
</template>
