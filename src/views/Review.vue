<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useGetReview } from '@/api/review'
import { TReview } from '@types/review'
import Header from '@/components/Header.vue'
import { parseDate } from '@/utilities/date'

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
      <div class="max-w-[950px] mx-auto">
        <div class="grid grid-cols-12 py-8">
          <div class="col-span-3">
            <img :src="review.image" class="h-[300px] w-full object-contain" />
          </div>
          <div class="col-span-9 pl-6 pr-4 text-[rgba(0,0,0,0.75)]">
            <div class="pb-3 mb-3 border-b-[1px] border-b-[rgba(0,0,0,0.06)]">
              <div class="flex gap-2 mb-3 text-black">
                <RouterLink
                  v-for="(category, index) in review.categories"
                  class="text-[0.85rem] capitalize underline decoration-double"
                  :key="index"
                  :to="`/category${category.slug}`"
                  >{{ category.name }}</RouterLink
                >
                |
                <p v-if="review.series" class="text-[0.84rem] relative top-[1.5px] right-[2px]">
                  Published in
                  <RouterLink
                    :to="`/series${review.series.slug}`"
                    class="capitalize underline decoration-double text-black font-medium"
                    >{{ review.series.name }}
                  </RouterLink>
                </p>
              </div>
              <p class="text-xl capitalize font-semibold mb-4">{{ review.title }}</p>
              <p class="text-xs uppercase font-semibold">
                {{ parseDate(review.created_at) }} | BOOK BY {{ review.author }}
              </p>
            </div>
            <div v-html="review.content" class="text-[0.96rem]/6 [text-[rgba(0,0,0,0.85)]" />
          </div>
        </div>
      </div>
    </section>
  </template>
  <template v-else> There is no review to display </template>
</template>
