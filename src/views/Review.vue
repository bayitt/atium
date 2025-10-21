<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useGetReview } from '@/api/review'
import { TReview } from '@/types/review'
import Header from '@/components/Header.vue'
import RelatedSeriesReviews from '@/components/RelatedSeriesReviews.vue'
import RelatedCategoriesReviews from '@/components/RelatedCategoriesReviews.vue'
import ReviewPageSkeleton from '@/components/ReviewPageSkeleton.vue'
import Share from '@/components/Share.vue'
import { parseDate } from '@/utilities/date'

const review = ref<TReview | undefined>()
const showMore = ref(true)
const route = useRoute()

const updateReview = (fetchedReview: TReview) => {
  review.value = fetchedReview
}

const getReadingTime = () => {
  if (!review.value) return 0

  const div = window.document.createElement('div')
  div.innerHTML = review.value.content
  return Math.ceil(div.textContent.split(' ').length / 260)
}

watchEffect(() => {
  if (route.params?.slug) {
    window.scrollTo(0, 0)
    review.value = undefined
    const slug = '/' + route.params.slug
    useGetReview(slug, updateReview)
  }
})

const displayMore = (more: boolean) => {
  showMore.value = more
}
</script>

<template>
  <Header />
  <template v-if="review">
    <section>
      <div
        class="w-[88%] sm:w-[90%] max-w-[1200px] mx-auto flex flex-col lg:grid grid-cols-12 py-8"
      >
        <div class="col-span-1 sticky top-[10px] flex flex-col gap-5 h-fit">
          <Share :title="review.title" />
        </div>
        <div class="col-span-8 text-[rgba(0,0,0,0.8)]">
          <div class="mb-7 text-[rgba(0,0,0,0.85)] lg:w-[105%]">
            <div class="p-10 bg-[rgba(0,0,0,0.01)] mb-4 flex justify-between items-center">
              <div class="w-3/5">
                <p class="capitalize text-black font-semibold text-2xl/9 mb-2">
                  {{ review.title }}
                </p>
                <p class="text-[0.95rem] text-[rgba(0,0,0,0.77)]">
                  Book by <span class="capitalize">{{ review.author }}</span>
                </p>
              </div>

              <div class="w-2/5 flex justify-end items-center gap-2">
                <p class="text-[0.87rem] h-fit">Review by Olamileke</p>
                <p class="l">|</p>
                <p class="text-[0.87rem] h-fit">{{ getReadingTime() }} min read</p>
              </div>
            </div>
            <div class="flex gap-2 text-[rgba(0,0,0,0.8)]">
              <RouterLink
                v-for="(category, index) in review.categories"
                class="text-[0.85rem] capitalize underline decoration-double"
                :key="index"
                :to="`/category${category.slug}`"
                >{{ category.name }}</RouterLink
              >
              <p v-if="review.series" class="text-[0.84rem] relative top-[1.5px] right-[1px]">
                | Published in
                <RouterLink
                  :to="`/series${review.series.slug}`"
                  class="capitalize relative top-[0.48px] underline lg:no-underline lg:hover:underline text-black font-medium"
                  >{{ review.series.name }}</RouterLink
                >
              </p>
              <p
                class="text-[0.82rem] relative right-[4px]"
                :class="review.series ? 'top-[2px]' : 'top-px'"
              >
                | {{ parseDate(review.created_at) }}
              </p>
            </div>
          </div>
          <div v-html="review.content" class="text-base/7.5 lg:w-[105%] mb-14" />
        </div>
        <div class="hidden lg:block col-span-3 sticky top-[10px] h-fit">
          <img :src="review.image" class="h-[300px] ml-[50px] w-full object-contain" />
        </div>
      </div>
    </section>
    <RelatedSeriesReviews
      v-if="showMore && review.series"
      @displayMore="displayMore"
      :review_slug="review.slug"
      :series="{ uuid: review.series.uuid, name: review.series.name }"
    />
    <RelatedCategoriesReviews
      v-else-if="showMore"
      @displayMore="displayMore"
      :review_slug="review.slug"
      :categories="review.categories.map(({ name, uuid }) => ({ name, uuid }))"
    />
  </template>
  <template v-else>
    <ReviewPageSkeleton />
  </template>
</template>
