<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from '@/components/Button.vue'
import SubscribeDialog from '@/components/SubscribeDialog.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
const isDialogOpen = ref(false)
const isSidebarOpen = ref(false)
</script>

<template>
  <nav
    class="sticky lg:static top-0 bg-white z-10 lg:z-0 lg:border-b-[1px] border-b-[rgba(0,0,0,0.05)]"
  >
    <div class="w-[88%] sm:w-[90%] max-w-[1200px] mx-auto py-3 flex justify-between items-center">
      <RouterLink to="/" class="relative">
        <img
          src="https://res.cloudinary.com/olamileke/image/upload/c_thumb,w_200,g_face/v1760027186/chequer_dev/ol-high-resolution-logo_fmyams.png"
          class="size-8 sm:size-7 lg:size-8 object-cover"
        />
      </RouterLink>

      <Button @click="isDialogOpen = true" class="hidden lg:inline lg:z-0">Subscribe</Button>
      <div class="lg:hidden z-50" @click="isSidebarOpen = !isSidebarOpen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="relative top-[2px] w-[29px] h-[29px] sm:w-[28px] sm:h-[28px]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </div>
      <SubscribeDialog :isOpen="isDialogOpen" @handleClose="isDialogOpen = false" />
      <Sidebar
        :isOpen="isSidebarOpen"
        @handleClose="isSidebarOpen = false"
        @handleSubscribe="isDialogOpen = true"
      />
    </div>
  </nav>
</template>
