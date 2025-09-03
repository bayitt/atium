<script setup lang="ts">
import { Suspense } from 'vue'
import { RouterLink } from 'vue-router'
import { useGetCategories } from '../api/category'

const { categories, error } = useGetCategories()
</script>

<template>
  <div class="flex gap-5">
    <template v-if="categories">
      <RouterLink v-for="(category, index) in categories" :key="index" :to="category.slug">
        {{ category.name }}
      </RouterLink>
    </template>
    <template v-else>
      <p>absbs</p>
    </template>
  </div>
</template>