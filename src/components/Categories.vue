<script setup lang="ts">
import { Suspense } from 'vue'
import { RouterLink } from 'vue-router'
import { useGetCategories } from '../api/category'

const { categories, error } = useGetCategories()

const capitalize = (word: string) => {
  const words = word.split(' ')
  let parsedWord = ''

  for (const word of words) {
    parsedWord += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + ' '
  }

  return parsedWord
}
</script>

<template>
  <div
    class="flex gap-5 border-b-[1px] border-b-[rgba(0,0,0,0.06)] text-[15px] text-[rgba(0,0,0,0.8)]"
  >
    <template v-if="categories">
      <RouterLink
        v-for="(category, index) in categories"
        :key="index"
        :to="index === 0 ? category.slug : `/category${category.slug}`"
        class="pb-4 px-2 border-b-[1px] border-b-transparent"
        :class="index === 0 ? 'font-semibold border-b-[2px] !border-b-black' : ''"
      >
        {{ capitalize(category.name) }}
      </RouterLink>
    </template>
    <template v-else>
      <p>absbs</p>
    </template>
  </div>
</template>