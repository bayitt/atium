<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useGetReview } from '@/api/review'
import { TReview } from '@/types/review'
import Header from '@/components/Header.vue'
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
      <div class="max-w-[1050px] mx-auto">
        <div class="grid grid-cols-12 py-8">
          <div class="col-span-3 sticky top-[10px] h-fit">
            <img :src="review.image" class="h-[300px] w-full object-contain" />
          </div>
          <div class="col-span-8 text-[rgba(0,0,0,0.75)]">
            <div class="pb-4 mb-4 border-b border-b-[2px] border-b-[rgba(0,0,0,0.15)]">
              <div class="flex gap-2 mb-3">
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
              </div>
              <p class="text-2xl capitalize font-semibold mb-4">{{ review.title }}</p>
              <p class="text-xs uppercase font-semibold">
                {{ parseDate(review.created_at) }} | BOOK BY {{ review.author }}
              </p>
            </div>
            <div v-html="review.content" class="text-[0.96rem]/6 [text-[rgba(0,0,0,0.85)]" />
          </div>
          <div class="col-span-1 sticky top-[10px] flex flex-col pl-7 gap-5 h-fit">
            <div class="size-8 flex justify-center items-center rounded-full border border-[rgba(0,0,0,0.7)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="rgba(0,0,0,0.8)" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <div class="size-8 flex justify-center items-center rounded-full border border-[rgba(0,0,0,0.7)]">
              <FontAwesomeIcon icon="fa-brands fa-facebook-f" style="color: rgba(0,0,0,.6)" size="sm" />
            </div>
            <div class="size-8 flex justify-center items-center rounded-full border border-[rgba(0,0,0,0.7)]">
              <FontAwesomeIcon icon="fa-brands fa-whatsapp" style="color: rgba(0,0,0,.6)" size="1x" />
            </div>
            <div class="size-8 flex justify-center items-center rounded-full border border-[rgba(0,0,0,0.7)]">
              <FontAwesomeIcon icon="fa-brands fa-x-twitter" style="color: rgba(0,0,0,.6)" size="sm" />
            </div>
            <div class="size-8 flex justify-center items-center rounded-full border border-[rgba(0,0,0,0.7)]">
              <FontAwesomeIcon icon="fa-brands fa-linkedin-in" style="color: rgba(0,0,0,.6)" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  <template v-else> There is no review to display </template>
</template>
