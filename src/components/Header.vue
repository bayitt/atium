<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import Button from '@/components/Button.vue'
import SubscribeDialog from '@/components/SubscribeDialog.vue'

const isDialogOpen = ref(false);
</script>

<template>
  <nav class="w-screen border-b-[1px] border-b-[rgba(0,0,0,0.05)]">
    <div class="max-w-[1200px] mx-auto py-4 flex justify-between items-center">
      <RouterLink to="/" class="relative right-[5px]">
        <img src="https://res.cloudinary.com/olamileke/image/upload/c_thumb,w_200,g_face/v1760027186/chequer_dev/ol-high-resolution-logo_fmyams.png" class="size-9 rounded" />
      </RouterLink>

      <Button @click="isDialogOpen = true">Subscribe</Button>
      <SubscribeDialog :isOpen="isDialogOpen" @handleClose="isDialogOpen = false" />
    </div>
  </nav>
</template>