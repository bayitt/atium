<script setup lang="ts">
import { Suspense } from 'vue'
import { RouterLink } from 'vue-router'
import Review from './Review.vue'
import { useGetCategories } from '../api/category'
import { useGetReviews } from '../api/review'

const { categories } = useGetCategories()
const { reviews } = useGetReviews()
</script>

<template>
  <div
    class="flex gap-5 border-b-[1px] border-b-[rgba(0,0,0,0.06)] text-[14px] text-[rgba(0,0,0,0.7)] mb-5"
  >
    <template v-if="categories">
      <RouterLink
        v-for="(category, index) in categories"
        :key="index"
        :to="index === 0 ? category.slug : `/category${category.slug}`"
        class="capitalize pb-4 px-2 border-b-[1px] border-b-transparent"
        :class="index === 0 ? 'font-semibold border-b-[1px] !border-b-black' : ''"
      >
        {{ category.name }}
      </RouterLink>
    </template>
    <template v-else>
      <div v-for="n in 5" :key="n" class="pb-4 px-2 animate-pulse bg-[#ddd] w-20" />
    </template>
  </div>
  <div class="flex flex-col gap-8">
    <template v-if="reviews">
      <Review v-for="(review, index) in reviews" :key="index" v-bind="review" />
    </template>
    <template v-else> reviews </template>
  </div>
</template>