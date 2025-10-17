<script lang="ts" setup>
import ReadingList from './ReadingList.vue'

const props = defineProps<{ isOpen: boolean }>()
const emits = defineEmits<{ handleClose: [] }>()
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] transition-all duration-500 ease-in flex justify-center items-center"
    :class="props.isOpen ? 'z-999 opacity-100' : '-z-10 opacity-0 invisible'"
    @click="$emit('handleClose')"
  >
    <ReadingList class="bg-white rounded !px-8 w-[90%] sm:w-[500px]" @click.stop="" />
  </div>
</template>
