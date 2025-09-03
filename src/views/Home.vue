<script setup lang="ts">
import Header from '../components/Header.vue'
import Categories from '../components/Categories.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <Header />
  <section>
    <div class="max-w-[1200px] mx-auto grid grid-cols-12">
      <div
        class="col-span-7 py-5 border-r-[1px] border-r-[rgba(0,0,0,0.05)] min-h-[calc(100vh - 76px)]"
      >
        <div class="flex gap-8 text-[15px] text-[rgba(0,0,0,0.8)]">
          <RouterLink to="/" class="text-[#6F1D1B] font-bold border-b-2 border-b-[#6F1D1B]">
            Home
          </RouterLink>
          <RouterLink to="/series"> Series </RouterLink>
          <RouterLink to="/about"> About </RouterLink>
        </div>

        <Categories />
      </div>
    </div>
  </section>
</template>