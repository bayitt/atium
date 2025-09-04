<script setup lang="ts">
import { ref, Suspense, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Review from './Review.vue'
import ReviewSkeleton from './ReviewSkeleton.vue'
import { useGetCategories } from '../api/category'
import { useGetReviews } from '../api/review'
import { TReview } from '../types/review'

const route = useRoute()
const { categories } = useGetCategories()
const reviews = ref<TReview[] | undefined>()

const updateReviews = (fetchedReviews: TReview[]) => {
  reviews.value = fetchedReviews
}

useGetReviews(updateReviews)

watch(
  () => route.params?.slug,
  () => {
    console.log(route.params)
    if (route.params?.slug) {
      const category = (categories?.value ?? []).find(
        ({ slug }) => slug === '/' + route.params.slug
      )
      if (!category) return
      reviews.value = undefined
      useGetReviews(updateReviews, category.uuid)
    } else {
      reviews.value = undefined
      useGetReviews(updateReviews)
    }
  }
)
</script>

<template>
  <div
    class="flex gap-5 border-b-[1px] border-transparent text-[14px] text-[rgba(0,0,0,0.7)] mb-5"
    :class="categories ? 'border-b-[rgba(0,0,0,0.06)]' : ''"
  >
    <template v-if="categories">
      <RouterLink
        v-for="(category, index) in categories"
        :key="index"
        :to="index === 0 ? category.slug : `/category${category.slug}`"
        class="transition-all duration-500 ease-in capitalize pb-4 px-2 border-b-[1px] border-b-transparent"
        :class="
          '/' + route.params?.slug === category.slug ||
          (!route.params?.slug && category.slug === '/')
            ? 'font-semibold border-b-[1px] !border-b-black'
            : ''
        "
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
    <template v-else>
      <ReviewSkeleton v-for="n in 4" :key="n" />
    </template>
  </div>
</template>