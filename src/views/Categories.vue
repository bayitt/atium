<script setup lang="ts">
import { ref, Suspense, watchEffect, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Review from '../components/Review.vue'
import ReviewSkeleton from '../components/ReviewSkeleton.vue'
import { useGetCategories } from '@/api/category'
import { useGetReviews } from '@/api/review'
import { TCategory } from '@/types/category'
import { TReview } from '@/types/review'
import { TPagination } from '@/types/pagination';
import { store } from '@/store';

const categories = ref<TCategory[] | undefined>()
const route = useRoute()
const reviews = ref<TReview[] | undefined>()
const pagination = ref<TPagination | undefined>

const updateCategories = (fetchedCategories: TCategory[]) => {
  categories.value = fetchedCategories;
}

const updateReviews = (fetchedReviews: TReview[], fetchedPagination: TPagination) => {
  reviews.value = fetchedReviews
  pagination.value = fetchedPagination
}

useGetCategories(updateCategories);

watchEffect(
  () => {
    if (route.params?.slug) {
      const category = (categories?.value ?? []).find(
        ({ slug }) => slug === '/' + route.params.slug
      )
      if (!category) return
      reviews.value = undefined
      useGetReviews(1, updateReviews, category.uuid)
    } else {
      reviews.value = undefined
      useGetReviews(1, updateReviews)
    }
  }
)

const loadReviews = () => {
  const screenHeight = window.screen.height
  const totalHeight = document.body.offsetHeight

  if (totalHeight - (window.scrollY + screenHeight) < 3) {
    if (pagination.value?.totalPages - pagination.value?.currentPage > 0) {
      let category: TCategory;
      if (route.params?.slug) {
        category = (categories?.value ?? []).find(
          ({ slug }) => slug === '/' + route.params.slug
        )
      }
      useGetReviews(pagination.value.currentPage + 1, updateReviews, category?.uuid)
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', loadReviews)
})

onUnmounted(() => {
  window.removeEventListener('scroll', loadReviews);
})
</script>

<template>
  <div class="flex gap-5 border-b-[1px] border-transparent text-[14px] text-[rgba(0,0,0,0.8)] mb-5"
    :class="categories ? 'border-b-[rgba(0,0,0,0.06)]' : ''">
    <template v-if="categories">
      <RouterLink v-for="(category, index) in categories" :key="index"
        :to="index === 0 ? category.slug : `/category${category.slug}`"
        class="transition-all duration-500 ease-in capitalize pb-4 px-2 border-b-[1px] border-b-transparent" :class="'/' + route.params?.slug === category.slug ||
            (!route.params?.slug && category.slug === '/')
            ? 'font-semibold border-b-[1px] !border-b-black'
            : ''
          ">
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
      <template v-if="store.networkOperation === 'get.reviews'">
        <ReviewSkeleton v-for="n in 3" :key="n" />
      </template>
    </template>
    <template v-else>
      <ReviewSkeleton v-for="n in 4" :key="n" />
    </template>
  </div>
</template>