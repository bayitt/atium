<script lang="ts" setup>
import { ref } from "vue";
import { useGetRelatedSeriesReviews } from "@/api/review"
import { TReview } from "@/types/review"
import { TSeries } from "@/types/series"

const props = defineProps<{ review_uuid: string, series: Pick<TSeries, "uuid" | "name"> }>();
const reviews = ref<Pick<TReview, "title" | "image" | "author" | "created_at">>();

const updateReviews = (fetchedReviews: Pick<TReview, "title" | "image" | "author" | "created_at">) => {
    reviews.value = fetchedReviews;
}

useGetRelatedSeriesReviews(review_uuid, series.uuid, updateReviews)
</script>

<template>
    <template v-if="reviews">

    </template>
    <template v-else>
        There are no other reviews
    </template>
</template>