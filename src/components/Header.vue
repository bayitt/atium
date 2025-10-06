<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/Button.vue'
import SubscribeDialog from '@/components/SubscribeDialog.vue'

const isDialogOpen = ref(false);
</script>

<template>
  <nav class="w-screen border-b-[1px] border-b-[rgba(0,0,0,0.05)]">
    <div class="max-w-[1200px] mx-auto py-4 flex justify-between items-center">
      <p class="text-lg text-[rgba(0,0,0,0.8)] font-semibold">OL</p>

      <Button @click="isDialogOpen = true">Subscribe</Button>
      <SubscribeDialog :isOpen="isDialogOpen" @handleClose="isDialogOpen = false" />
    </div>
  </nav>
</template>