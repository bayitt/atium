<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <nav class="w-screen border-b-[1px] border-b-[rgba(0,0,0,0.05)]">
    <div class="max-w-[1200px] mx-auto py-4 flex justify-between items-center">
      <p class="font-semibold text-base">olamileke's library</p>

      <div class="flex gap-4">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg> -->
        <Button>Subscribe</Button>
      </div>
    </div>
  </nav>
</template>