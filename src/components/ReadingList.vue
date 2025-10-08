<script setup lang="ts">
import { ref } from 'vue';
import { useGetReadingList } from '@/api/reading.list';
import { TReadingListItem } from '@/types/reading.list';
import ReviewSkeleton from '@/components/ReviewSkeleton.vue';

const readingListItems = ref<TReadingListItem[] | undefined>()

const updateReadingListItems = (items: TReadingListItem[]) => {
    let parsedItems = [...items];
    const activeItemIndex = parsedItems.findIndex(({ status }) => status);
    
    if (activeItemIndex < 0) {
        readingListItems.value = parsedItems;
        return;
    }

    const activeItem = parsedItems[activeItemIndex];
    parsedItems.splice(activeItemIndex, 1);
    parsedItems.unshift(activeItem);

    readingListItems.value = parsedItems;
}

useGetReadingList(updateReadingListItems);

</script>

<template>
    <div class="pl-10 pt-9 text-[rgba(0,0,0,0.85)]">
        <p class="text-[15px] capitalize mb-6 font-semibold">
            My Bookshelf
        </p>

        <template v-if="readingListItems">
            <div v-for="(item, index) in readingListItems"
                class="relative flex gap-4 text-[rgba(0,0,0,0.8)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] last-of-type:border-none pb-4 mb-4">
                <img :src="item.image" class="w-2/7 object-cover object-center rounded h-[80px]" />
                <div class="flex flex-col" :class="item.status ? '' : 'justify-center'">
                    <p class="text-[14px] capitalize font-semibold mb-2">{{ item.title }}</p>
                    <p class="text-sm" :class="item.status ? 'mb-2' : ''">Book by <span class="capitalize">{{ item.author }}</span></p>
                    <p v-if="item.status" class="mt-auto bottom-1 w-fit right-0 p-1 bg-black text-white text-[0.6rem] font-semibold">
                        CURRENT READ
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#34B223" class="relative bottom-[1px] inline size-5">
                            <path fill-rule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clip-rule="evenodd" />
                        </svg> -->
                    </p>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-for="n in 5" :key="n" class="flex gap-4 mb-4" style="width: 345px">
                <div class="w-2/7 h-[80px] bg-[#ddd] animate-pulse" />
                <div class="flex flex-col justify-center">
                    <p class="h-2 w-50 bg-[#ddd] animate-pulse mb-2" />
                    <p class="h-2 w-50 bg-[#ddd] animate-pulse" />
                </div>
            </div>
        </template>
    </div>
</template>