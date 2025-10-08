<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef, watchEffect } from 'vue'
import { RouterLink, useRoute, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import ReadingList from '@/components/ReadingList.vue'

const route = useRoute()
const path = ref(route.path)
const readingList = useTemplateRef("readingList")
const routes = [
  { name: 'Reviews', path: '/' },
  { name: 'Series', path: '/series' },
  { name: 'About', path: '/about' },
]
watchEffect(() => {
  path.value = route.path
})

const handleReadingListPosition = () => {
  if (!readingList?.value)
    return

  if (window.scrollY > 76 ) {
   readingList.value.style.paddingTop = "0px";
  }
  else
   readingList.value.style.paddingTop = "76px";
}

onMounted(() => {
  window.addEventListener("scroll", handleReadingListPosition)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleReadingListPosition)
})

</script>

<template>
  <Header />
  <section>
    <div class="max-w-[1200px] mx-auto grid grid-cols-12">
      <div class="col-span-8 py-5 border-r-[1px] border-r-[rgba(0,0,0,0.05)] pr-[15%]"
        style="min-height: calc(100vh - 56px)">
        <div class="flex gap-5 text-[14px] text-[rgba(0,0,0,0.8)] mb-8">
          <RouterLink v-for="(route, index) in routes" :key="index"
            class="px-4 py-3 rounded-lg transition-colors duration-500 ease-in" :class="path === route.path ||
              (route.path.length > 1 && path.includes(route.path)) ||
              (path.includes('category') && route.path === '/')
              ? 'text-black bg-[rgba(0,0,0,0.06)] font-semibold'
              : ''
              " :to="route.path">{{ route.name }}</RouterLink>
        </div>

        <RouterView />
      </div>
      <div class="fixed top-0 pt-[76px] transition-[padding] duration-700 ease-in col-span-4 -z-10" style="right: calc((100vw - 1200px)/2)" ref="readingList">
        <ReadingList />
      </div>
    </div>
  </section>
</template>