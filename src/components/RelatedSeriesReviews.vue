<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router"
import { useGetRelatedSeriesReviews } from "@/api/review"
import { TReview } from "@/types/review"
import { TSeries } from "@/types/series"
import Review from "@/components/Review.vue"
import { parseDate } from '@/utilities/date'

const { review_uuid, series } = defineProps<{ review_uuid: string, series: Pick<TSeries, "uuid" | "name"> }>();
const reviews = ref<TReview | undefined>();

const updateReviews = (fetchedReviews: Pick<TReview, "title" | "image" | "author" | "created_at">) => {
    reviews.value = fetchedReviews;
}

useGetRelatedSeriesReviews(review_uuid, series.uuid, updateReviews)
</script>

<template>
    <section class="bg-[rgba(0,0,0,0.005)] text-[rgba(0,0,0,0.75)] p-18">
        <div class="max-w-[750px] mx-auto">
            <template v-if="reviews">
                <p class="text-lg text-center font-semibold mb-16">More from <span class="capitalize">{{ series.name }}</span>
                </p>
                <Review v-for="(review, index) in reviews" :key="index" v-bind="review" class="mb-8 ml-[25px] last-of-type:mb-0" />
            </template>
            <template v-else>
                There are no other reviews
            </template>
        </div>  
    </section>
</template>