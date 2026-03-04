<script setup lang="ts">
import { ref } from 'vue'

const image = 'https://res.cloudinary.com/olamileke/image/upload/c_thumb,w_600,g_face/v1760027186/chequer_dev/ol-high-resolution-logo_fmyams.png'
useHead({
  meta: [
    { name: 'type', content: 'website' },
    { name: 'og:site_name', content: "Olamileke's Library" },
    { name: 'og:image', content: image },
    { name: 'og:image_width', content: 600 },
    { name: 'twitter:image', content: image }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: 'https://res.cloudinary.com/olamileke/image/upload/c_thumb,w_200,g_face/v1760027186/chequer_dev/ol-high-resolution-logo_fmyams.png',
    },
  ],
})

const isDialogOpen = ref(false)
const isSubscribePromptOpen = ref(true)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ReadingListDialog :isOpen="isDialogOpen" @handleClose="isDialogOpen = false" />

  <div
    class="
      lg:hidden
      cursor-pointer
      z-3
      fixed
      bottom-[7vw]
      sm:bottom-[5vw]
      right-[7vw]
      sm:right-[5vw]
      flex
      justify-center
      items-center
      p-3
      rounded-full
      bg-white
      shadow-md
    "
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

  <SubscribePrompt v-if="isSubscribePromptOpen" @handleClose="isSubscribePromptOpen = false" />
</template>
