<script setup lang="ts">
import { ref } from 'vue'
import { useGetReadingList } from '@/api/reading.list'
import type { TReadingListItem } from '@/types/reading.list'
import ReviewSkeleton from '@/components/ReviewSkeleton.vue'

const readingListItems = ref<TReadingListItem[] | undefined>()

const updateReadingListItems = (items: TReadingListItem[]) => {
  let parsedItems = [...items]
  const activeItemIndex = parsedItems.findIndex(({ status }) => status)

  if (activeItemIndex < 0) {
    readingListItems.value = parsedItems
    return
  }

  const activeItem = parsedItems[activeItemIndex]
  parsedItems.splice(activeItemIndex, 1)
  parsedItems.reverse()
  parsedItems.unshift(activeItem)

  readingListItems.value = parsedItems
}

useGetReadingList(updateReadingListItems)
</script>

<template>
  <div class="pl-10 pt-9 text-[rgba(0,0,0,0.9)]">
    <p
      class="text-md lg:text-[15px] underline decoration-double lg:no-underline capitalize mb-4 lg:mb-6 font-semibold"
    >
      My Bookshelf
    </p>

    <template v-if="readingListItems">
      <div
        v-for="(item, index) in readingListItems"
        class="relative flex flex-reverse gap-4 text-[rgba(0,0,0,0.8)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] last-of-type:border-none pb-3 lg:pb-4 mb-3 lg:mb-4"
      >
        <div class="flex flex-col w-5/7" :class="item.status ? '' : 'justify-center'">
          <p class="text-md lg:text-[0.92rem] capitalize font-semibold mb-1 lg:mb-2">
            {{ item.title }}
          </p>
          <p
            class="text-[0.95rem] lg:text-[0.85rem] sm:text-[text-0.95rem] lg:text-sm"
            :class="item.status ? 'mb-2' : ''"
          >
            Book by <span class="capitalize">{{ item.author }}</span>
          </p>
          <p
            v-if="item.status"
            class="mt-auto bottom-1 w-fit right-0 p-1 bg-black text-white text-[0.6rem] font-semibold"
          >
            CURRENT READ
          </p>
        </div>
        <img
          :src="item.image"
          class="w-2/7 object-contain h-[80px] translate-x-[25%] lg:translate-x-[20%]"
        />
      </div>
    </template>
    <template v-else>
      <div v-for="n in 5" :key="n" class="flex justify-between gap-0 mb-4 w-full lg:pr-[2px]">
        <div class="flex flex-col justify-center w-8/10">
          <p class="h-2 w-[80%] bg-[#ddd] animate-pulse mb-2" />
          <p class="h-2 w-[80%] bg-[#ddd] animate-pulse" />
        </div>
        <div class="w-[60px] h-[80px] bg-[#ddd] animate-pulse" />
      </div>
    </template>
  </div>
</template>
