<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useGetSeriesReviews } from "@/api/review"
import { TReview } from "@/types/review"

const series = ref<TSeries | undefined>()
const reviews = ref<TReview[] | undefined>()

const updateSeries = (fetchedSeries: TSeries, fetchedReviews: TReview[]) => {
    series.value = fetchedSeries;
    reviews.value = fetchedReviews;
}

useGetSeriesReviews(updateSeries)
</script>

<template>

</template>