<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from '@/components/Button.vue'
import SubscribeDialog from '@/components/SubscribeDialog.vue'

const route = useRoute()
const isDialogOpen = ref(false)
</script>

<template>
  <nav class="border-b-[1px] border-b-[rgba(0,0,0,0.05)]">
    <div class="w-[88%] sm:w-[90%] max-w-[1200px] mx-auto py-4 flex justify-between items-center">
      <RouterLink to="/" class="relative">
        <img
          src="https://res.cloudinary.com/olamileke/image/upload/c_thumb,w_200,g_face/v1760027186/chequer_dev/ol-high-resolution-logo_fmyams.png"
          class="size-9 object-cover"
        />
      </RouterLink>

      <Button @click="isDialogOpen = true" class="hidden lg:inline">Subscribe</Button>
      <div class="lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
      </div>
      <SubscribeDialog :isOpen="isDialogOpen" @handleClose="isDialogOpen = false" />
    </div>
  </nav>
</template>
