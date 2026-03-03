<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'

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

const {
  public: { API_URL },
} = useRuntimeConfig()
const { data: categoriesResponse } = await useFetch(`${API_URL}/categories`)

const categories = computed(() => {
  if (!categoriesResponse.value) return []

  return [{ name: 'All', slug: '/' }, ...categoriesResponse.value]
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
        <div
          v-if="route.path === '/' || route.path.includes('/category/')"
          class="
            px-[6%]
            sm:px-0
            pt-5
            sm:pt-0
            flex flex-wrap
            gap-5
            border-transparent
            text-[15px]
            sm:text-[14px]
            text-[rgba(0,0,0,0.8)]
            mb-7
            sm:mb-7 sm:mt-3
            lg:mb-5 lg:mt-0 lg:border-b-[1px]
            g:border-b-[rgba(0,0,0,0.06)]
          "
        >
          <NuxtLink
            v-for="(category, index) in categories"
            :key="index"
            :to="index === 0 ? category.slug : `/category${category.slug}`"
            class="
              transition-all
              duration-500
              ease-in
              capitalize
              pb-2
              lg:pb-4
              px-1
              sm:px-2
              border-b-[1px] border-b-transparent
            "
            :class="
              '/' + route.params?.slug === category.slug ||
              (!route.params?.slug && category.slug === '/')
                ? 'font-semibold border-b-[1px] !border-b-black'
                : ''
            "
          >
            {{ category.name }}
          </NuxtLink>
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
      >
        <ReadingList />
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
