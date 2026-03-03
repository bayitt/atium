<script setup lang="ts">
import type { TReview } from '~/types/review'

defineProps<{ reviews: TReview[]; heading: string }>()
</script>

<template>
  <section class="bg-[rgba(0,0,0,0.01)] text-[rgba(0,0,0,0.85)] py-10 sm:px-10 md:p-18">
    <div class="max-w-[750px] mx-auto">
      <p class="text-xl sm:text-lg text-center font-semibold mb-8 md:mb-12">
        {{ heading }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="relative left-[6px] animate-bounce size-6 inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
          />
        </svg>
      </p>

      <Review
        v-for="(review, index) in reviews"
        :key="index"
        v-bind="review"
        class="sm:p-10 pr-0 shadow bg-white mb-8 last-of-type:mb-0"
      />
    </div>
  </section>
</template>
