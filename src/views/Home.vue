<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { RouterLink, useRoute, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import ReadingListDialog from '@/components/ReadingListDialog.vue'
import ReadingList from '@/components/ReadingList.vue'

const route = useRoute()
const path = ref(route.path)
const isDesktop = ref(false)
const isDialogOpen = ref(false)

const routes = [
  { name: 'Reviews', path: '/' },
  { name: 'Series', path: '/series' },
  { name: 'About', path: '/about' },
]

onMounted(() => {
  isDesktop.value = window.screen.width > 1024
})

watchEffect(() => {
  path.value = route.path
})
</script>

<template>
  <Header />
  <section>
    <div class="sm:w-[90%] max-w-[1200px] mx-auto grid grid-cols-12">
      <div
        class="col-span-12 lg:col-span-8 pb-10 sm:py-5 lg:border-r-[1px] lg:border-r-[rgba(0,0,0,0.05)] lg:pr-[15%]"
        style="min-height: calc(100vh - 56px)"
      >
        <div class="hidden lg:flex gap-5 text-[14px] text-[rgba(0,0,0,0.8)] mb-8">
          <RouterLink
            v-for="(route, index) in routes"
            :key="index"
            class="px-4 py-3 rounded-lg transition-colors duration-500 ease-in"
            :class="
              path === route.path ||
              (route.path.length > 1 && path.includes(route.path)) ||
              (path.includes('category') && route.path === '/')
                ? 'text-black bg-[rgba(0,0,0,0.06)] font-semibold'
                : ''
            "
            :to="route.path"
            >{{ route.name }}</RouterLink
          >
        </div>

        <RouterView />
      </div>
      <div
        v-if="isDesktop"
        class="hidden lg:block sticky top-0 h-fit transition-[padding] duration-700 ease-in col-span-4 -z-10"
        style="right: calc((100vw - 1200px) / 2)"
      >
        <ReadingList />
      </div>
    </div>

    <ReadingListDialog
      v-if="!isDesktop"
      :isOpen="isDialogOpen"
      @handleClose="isDialogOpen = false"
    />

    <div
      class="lg:hidden cursor-pointer fixed bottom-[7vw] sm:bottom-[5vw] right-[7vw] sm:right-[5vw] flex justify-center items-center p-3 rounded-full bg-white shadow-md"
      @click="isDialogOpen = true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.2"
        stroke="rgba(0,0,0,0.7)"
        class="size-9"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    </div>
  </section>
</template>
