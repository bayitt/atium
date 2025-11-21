<script setup lang="ts">
import { ref, watchEffect } from "vue"
const routes = [
  { name: 'Reviews', path: '/' },
  { name: 'Series', path: '/series' },
  { name: 'About', path: '/about' },
]

const route = useRoute()
const path = ref(route.path)

watchEffect(() => {
  path.value = route.path
})
</script>

<template>
  <Header />
  <section>
    <div class="sm:w-[90%] max-w-[1200px] mx-auto grid grid-cols-12">
      <div
        class="
          col-span-12
          lg:col-span-8
          pb-10
          sm:py-5
          lg:border-r-[1px] lg:border-r-[rgba(0,0,0,0.05)] lg:pr-[15%]
        "
        style="min-height: calc(100vh - 56px)"
      >
        <div class="hidden lg:flex gap-5 text-[14px] text-[rgba(0,0,0,0.8)] mb-8">
          <NuxtLink
            v-for="(route, index) in routes"
            :key="index"
            class="px-4 py-3 rounded-[16px] transition-colors duration-500 ease-in"
            :class="
              path === route.path ||
              (route.path.length > 1 && path.includes(route.path)) ||
              (path.includes('category') && route.path === '/')
                ? 'text-black bg-[rgba(0,0,0,0.06)] font-semibold'
                : ''
            "
            :to="route.path"
            >{{ route.name }}</NuxtLink
          >
        </div>

        <slot />
      </div>

      <div
        class="
          hidden
          lg:block
          sticky
          top-0
          h-fit
          transition-[padding]
          duration-700
          ease-in
          col-span-4
          -z-10
        "
      ></div>
    </div>
  </section>
</template>
