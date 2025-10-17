<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from './Button.vue'

const { isOpen } = defineProps<{ isOpen: boolean }>()
defineEmits<{ handleClose: []; handleSubscribe: [] }>()

const route = useRoute()
const path = ref(route.path)
const routes = [
  { name: 'Reviews', path: '/' },
  { name: 'Series', path: '/series' },
  { name: 'About', path: '/about' },
]

watchEffect(() => {
  path.value = route.path
})

watchEffect(() => {
  window.document.body.style.height = isOpen ? '100vh' : 'auto'
  window.document.body.style.overflowY = isOpen ? 'hidden' : 'visible'
})
</script>

<template>
  <div
    class="lg:hidden fixed top-0 right-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]"
    :class="isOpen ? 'z-20 opacity-100' : '-z-10 opacity-0 invisible'"
    @click="$emit('handleClose')"
  >
    <div
      class="absolute top-0 w-[80%] sm:w-[50%] h-full bg-white pt-[150px] pl-[30px] sm:pl-[40px] transition-all duration-700 ease-in"
      :class="isOpen ? 'right-0' : '-right-[80%] sm:-right-[50%]'"
      @click.stop=""
    >
      <div class="flex flex-col gap-6 text-[rgba(0,0,0,0.75)]">
        <RouterLink
          v-for="(route, index) in routes"
          :key="index"
          class="text-md"
          :class="
            path === route.path ||
            (route.path.length > 1 && path.includes(route.path)) ||
            (path.includes('category') && route.path === '/')
              ? 'text-black font-semibold'
              : ''
          "
          :to="route.path"
          @click="$emit('handleClose')"
          >{{ route.name }}</RouterLink
        >
        <Button class="w-fit !py-3 !px-4 !text-[0.95rem]" @click="$emit('handleSubscribe')"
          >Subscribe</Button
        >
      </div>
    </div>
  </div>
</template>
