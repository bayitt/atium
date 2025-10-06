<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGetSeriesReviews } from "@/api/review"
import { TReview } from "@/types/review"
import Review from "@/components/Review.vue"
import ReviewSkeleton from "@/components/ReviewSkeleton.vue"

const series = ref<TSeries | undefined>()
const reviews = ref<TReview[] | undefined>()

const updateSeries = (fetchedSeries: TSeries, fetchedReviews: TReview[]) => {
    series.value = fetchedSeries;
    reviews.value = fetchedReviews;
}

useGetSeriesReviews(updateSeries)

onMounted(() => {
    window.scrollTo(0, 0);
})
</script>

<template>
    <div v-if="series" class="flex flex-col gap-8">
        <div class="text-[rgba(0,0,0,0.75)] p-8 pt-1 border-b-[1px] border-b-[rgba(0,0,0,0.06)]">
            <p class="capitalize text-lg font-semibold mb-2">{{ series.name }}</p>
            <p class="text-[0.92rem]/6 mb-4">{{ series.description }}</p>
            <p class="text-xs uppercase font-semibold">SERIES BY {{ series.author }}</p>
        </div>

        <Review v-for="(review, index) in reviews" :key="index" v-bind="review" />
    </div>
    <div class="flex flex-col gap-8" v-else>
        <div class="p-8 pt-1">
            <p class="h-5 w-60 bg-[#ddd] animate-pulse mb-4" />
            <p class="h-8 w-full bg-[#ddd] animate-pulse mb-4" />
            <p class="h-4 w-40 bg-[#ddd] animate-pulse" />
        </div>
        <ReviewSkeleton v-for="n in 3" :key="n" />
    </div>
</template>