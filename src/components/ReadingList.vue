<script setup lang="ts">
import { ref } from 'vue'
import { useGetReadingList } from '@/api/reading.list'
import { TReadingListItem } from '@/types/reading.list'
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
  parsedItems.unshift(activeItem)

  readingListItems.value = parsedItems
}

useGetReadingList(updateReadingListItems)
</script>

<template>
  <div class="pl-10 pt-9 text-[rgba(0,0,0,0.85)]">
    <p
      class="text-[15px] underline decoration-double lg:no-underline capitalize mb-6 font-semibold"
    >
      My Bookshelf
    </p>

    <template v-if="readingListItems">
      <div
        v-for="(item, index) in readingListItems"
        class="relative flex flex-reverse gap-4 text-[rgba(0,0,0,0.8)] border-b-[1px] border-b-[rgba(0,0,0,0.06)] last-of-type:border-none pb-4 mb-4"
      >
        <div class="flex flex-col w-5/7" :class="item.status ? '' : 'justify-center'">
          <p class="text-[15px] sm:text-md lg:text-[14px] capitalize font-semibold mb-2">
            {{ item.title }}
          </p>
          <p
            class="text-[0.85rem] sm:text-[text-0.95rem] lg:text-sm"
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
          class="w-2/7 object-contain rounded h-[80px] sm:h-[100px] lg:h-[80px] translate-x-[25%]"
        />
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
