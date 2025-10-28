<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useGetReview } from '@/api/review'
import type { TReview } from '@/types/review'
import Header from '@/components/Header.vue'
import RelatedSeriesReviews from '@/components/RelatedSeriesReviews.vue'
import RelatedCategoriesReviews from '@/components/RelatedCategoriesReviews.vue'
import ReviewPageSkeleton from '@/components/ReviewPageSkeleton.vue'
import Share from '@/components/Share.vue'
import { parseDate } from '@/utilities/date'
import { useReviewMetaInfo } from '@/meta/review'

const metaFunc = useHead(useReviewMetaInfo(undefined as any))

const review = ref<TReview | undefined>()
const showMore = ref(true)
const route = useRoute()

const updateReview = (fetchedReview: TReview) => {
  review.value = fetchedReview

  metaFunc.patch(useReviewMetaInfo(fetchedReview))
}

const getReadingTime = () => {
  if (!review.value) return 0

  const div = window.document.createElement('div')
  div.innerHTML = review.value.content
  return Math.ceil((div.textContent ?? '').split(' ').length / 225)
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
      <div class="max-w-[1200px] mx-auto flex flex-col lg:grid grid-cols-12 py-1 lg:py-8">
        <div class="hidden lg:block col-span-1 sticky top-[10px] h-fit">
          <Share :title="review.title" />
        </div>
        <div class="col-span-11 text-[rgba(0,0,0,0.85)]">
          <div class="mb-8 sm:mb-5 lg:mb-7 text-[rgba(0,0,0,0.85)] lg:w-full">
            <div
              class="px-[6%] sm:px-[5%] py-10 lg:pl-15 lg:pr-15 bg-[rgba(0,0,0,0.01)] mb-6 lg:mb-4 flex flex-col-reverse items-center sm:flex-row justify-between items-center"
            >
              <div class="sm:w-[70%] lg:w-3/5">
                <p
                  class="capitalize text-black font-semibold text-center sm:text-left text-[1.2rem] md:text-2xl/9 lg:text-xl/8 mb-3 lg:mb-2"
                >
                  A Review Of {{ review.title }} By Olamileke Fambegbe
                </p>
                <p
                  class="mb-3 sm:mb-2 text-[1rem] md:text-[0.95rem] text-[rgba(0,0,0,0.85)] lg:text-[rgba(0,0,0,0.77)] text-center sm:text-left"
                >
                  Book by <span class="capitalize">{{ review.author }}</span>
                </p>
                <p
                  class="text-base lg:text-[14px] text-[rgba(0,0,0,0.85)] text-center sm:text-left"
                >
                  {{ getReadingTime() }} min read
                </p>
              </div>

              <img
                :src="review.image"
                class="h-[250px] sm:h-[200px] mb-6 sm:mb-0 sm:ml-auto object-contain"
              />
            </div>
            <div
              class="relative left-[6%] sm:left-[5%] lg:left-[12.5%] w-[88%] sm:w-[90%] flex flex-col sm:flex-row flex-wrap items-center sm:items-start sm:justify-center lg:justify-start gap-2 mb-6 lg:mb-0 text-[rgba(0,0,0,0.8)]"
            >
              <RouterLink
                v-for="(category, index) in review.categories"
                class="text-[17px] md:text-[0.94rem] capitalize underline decoration-double"
                :key="index"
                :to="`/category${category.slug}`"
                >{{ category.name }}</RouterLink
              >
              <p
                v-if="review.series"
                class="text-[17px] md:text-[0.93rem] relative top-[1.5px] right-[1px]"
              >
                <span class="hidden sm:inline">|</span> Published in
                <RouterLink
                  :to="`/series${review.series.slug}`"
                  class="capitalize relative top-[0.48px] underline lg:no-underline lg:hover:underline text-black font-medium"
                  >{{ review.series.name }}</RouterLink
                >
              </p>
              <p
                class="text-[17px] md:text-[0.91rem] relative right-[4px]"
                :class="review.series ? 'top-[2px]' : 'top-px'"
              >
                <span class="hidden sm:inline">|</span> {{ parseDate(review.created_at) }}
              </p>
            </div>
            <Share class="lg:hidden" :title="review.title" />
          </div>
          <div
            v-html="review.content"
            class="text-[18px]/8.5 sm:text-base/7.5 relative left-[6%] sm:left-[5%] lg:left-[12.5%] w-[88%] sm:w-[90%] lg:w-[75%] mb-14 [&_h3]:text-xl [&_h3:not(:empty)]:py-2 [&_h3]:sticky [&_h3]:top-[54px] lg:[&_h3]:top-0 [&_h3]:bg-white"
          />
        </div>
        <div class="hidden col-span-3 sticky top-[10px] h-fit">
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
