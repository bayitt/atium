<script setup lang="ts">
import { ref } from 'vue';
import { useGetReadingList } from '@/api/reading.list';
import { TReadingListItem } from '@/types/reading.list';

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
    <div class="pl-10 pt-10 text-[rgba(0,0,0,0.85)]">
        <p class="text-base capitalize mb-6 underline decoration-double">
            My Bookshelf
        </p>

        <template v-if="readingListItems">
            <div v-for="(item, index) in readingListItems"
                class="relative flex gap-4 text-[rgba(0,0,0,0.8)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] last-of-type:border-none pb-4 mb-4">
                <img :src="item.image" class="w-2/7 object-cover object-center rounded h-[80px]" />
                <div class="flex flex-col" :class="item.status ? '' : 'justify-center'">
                    <p class="text-[14px] capitalize font-semibold mb-2">{{ item.title }}</p>
                    <p class="text-sm mb-2">Book by <span class="capitalize">{{ item.author }}</span></p>
                    <p v-if="item.status" class="absolute bottom-1 right-0 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#34B223" class="relative bottom-[1px] inline size-5">
                            <path fill-rule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clip-rule="evenodd" />
                        </svg>
                        currently reading
                    </p>
                </div>
            </div>
        </template>
    </div>
</template>