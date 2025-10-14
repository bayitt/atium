<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useGetReview } from '@/api/review'
import { TReview } from '@/types/review'
import Header from '@/components/Header.vue'
import RelatedSeriesReviews from '@/components/RelatedSeriesReviews.vue'
import ReviewPageSkeleton from '@/components/ReviewPageSkeleton.vue'
import { parseDate } from '@/utilities/date'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faXTwitter, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faFacebookF, faWhatsapp, faXTwitter, faLinkedinIn);

const review = ref<TReview | undefined>()

const updateReview = (fetchedReview: TReview) => {
  review.value = fetchedReview
}

useGetReview(updateReview)
</script>

<template>
  <Header />
  <template v-if="review">
    <section>
      <div class="max-w-[1200px] mx-auto grid grid-cols-12 py-8">
        <div class="col-span-1 sticky top-[10px] flex flex-col gap-5 h-fit">
          <div
            class="size-8 flex justify-center items-center rounded-full cursor-pointer border border-[rgba(0,0,0,0.95)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"
              class="size-3.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </div>
          <div
            class="size-8 flex justify-center items-center rounded-full cursor-pointer border border-[rgba(0,0,0,0.95)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="rgba(0,0,0,0.9)" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <div
            class="size-8 flex justify-center items-center rounded-full cursor-pointer border border-[rgba(0,0,0,0.95)]">
            <FontAwesomeIcon icon="fa-brands fa-facebook-f" style="color: rgba(0,0,0,.5)" size="sm" />
          </div>
          <div
            class="size-8 flex justify-center items-center rounded-full cursor-pointer border border-[rgba(0,0,0,0.95)]">
            <FontAwesomeIcon icon="fa-brands fa-whatsapp" style="color: rgba(0,0,0,.7)" size="1x" />
          </div>
          <div
            class="size-8 flex justify-center items-center rounded-full cursor-pointer border border-[rgba(0,0,0,0.95)]">
            <FontAwesomeIcon icon="fa-brands fa-x-twitter" style="color: rgba(0,0,0,.8)" size="sm" />
          </div>
          <div
            class="size-8 flex justify-center items-center rounded-full cursor-pointer border border-[rgba(0,0,0,0.95)]">
            <FontAwesomeIcon icon="fa-brands fa-linkedin-in" style="color: rgba(0,0,0,.65)" size="sm" />
          </div>
        </div>
        <div class="col-span-8 text-[rgba(0,0,0,0.75)]">
          <div class="mb-7 text-[rgba(0,0,0,0.85)] w-[105%]">
            <div class="p-10 bg-[rgba(0,0,0,0.01)] mb-4 flex justify-between items-center">
              <div class="w-3/5">
                <p class="capitalize text-black font-semibold text-xl/8 mb-2">{{ review.title }}</p>
                <p class="text-[0.9rem] text-[rgba(0,0,0,0.77)]">Book by <span class="capitalize">{{ review.author
                    }}</span></p>
              </div>

              <div class="w-2/5 flex justify-end items-center gap-2">
                <p class="text-[0.83rem] h-fit">Review by Olamileke</p>
                <p class="l">|</p>
                <p class="text-[0.83rem] h-fit">5 min read</p>
              </div>
            </div>
            <div class="flex gap-2">
              <RouterLink v-for="(category, index) in review.categories"
                class="text-[0.85rem] capitalize underline decoration-double" :key="index"
                :to="`/category${category.slug}`">{{ category.name }}</RouterLink>
              <p v-if="review.series" class="text-[0.84rem] relative top-[1.5px] right-[1px]">
                |
                Published in
                <RouterLink :to="`/series${review.series.slug}`" class="capitalize text-black font-medium">{{
                  review.series.name }}
                </RouterLink>
              </p>
              <p class="text-[0.84rem] relative top-[1.5px] right-[1px]">
                | {{ parseDate(review.created_at) }}</p>
            </div>
          </div>
          <div v-html="review.content" class="text-[0.96rem]/6.25 w-[105%] mb-14" />
        </div>
        <div class="col-span-3 sticky top-[10px] h-fit">
          <img :src="review.image" class="h-[300px] ml-[50px] w-full object-contain" />
        </div>
      </div>
    </section>
    <RelatedSeriesReviews :review_uuid="review.uuid" :series="{ uuid: review.series.uuid, name: review.series.name }" />
  </template>
  <template v-else>
    <ReviewPageSkeleton />
  </template>
</template>
