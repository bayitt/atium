<script setup lang="ts">
import { useTemplateRef, watchEffect, ref } from 'vue'
import Button from './Button.vue'
import { subscribe as subscribeApi } from '@/api/subscribe'
import { store } from '@/store'

const props = defineProps<{ isOpen: boolean }>()
const emits = defineEmits<{ handleClose: [] }>()
const showMessage = ref<boolean>(false)
const input = useTemplateRef('input')

watchEffect(() => {
  window.document.body.style.height = props.isOpen ? '100vh' : 'auto'
  window.document.body.style.overflowY = props.isOpen ? 'hidden' : 'visible'

  if (props.isOpen && input.value) input.value.focus()
})

const onSubscribe = () => {
  input.value.value = ''
  input.value.focus()

  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 4000)
}

const subscribe = () => {
  if (store.networkOperation === 'subscribe') return

  subscribeApi(input.value.value, onSubscribe)
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] transition-all duration-500 ease-in flex justify-center items-center"
    :class="props.isOpen ? 'z-999 opacity-100' : '-z-10 opacity-0'"
    @click="$emit('handleClose')"
  >
    <form
      class="w-[90%] sm:w-[500px] p-8 bg-white rounded"
      @click.stop=""
      @submit.prevent="subscribe"
    >
      <p class="mb-3 text-[0.95rem]/6 text-[rgba(0,0,0,0.95)] font-medium">
        Receive updates in your inbox right away when new reviews are published
      </p>
      <div class="mb-4">
        <input
          type="email"
          ref="input"
          class="w-full px-3 py-2 outline-hidden transition-colors duration-300 ease-in border-[2.5px] border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)] rounded placeholder:text-[rgba(0,0,0,0.75)]"
          placeholder="Enter your email address"
          required
        />
        <p v-if="showMessage" class="text-sm mt-2 text-[rgba(0,0,0,0.98)]">
          You are subscribed successfully !
        </p>
      </div>
      <Button class="w-full !py-[14px] !text-[0.94rem]" type="submit"
        >Subscribe
        <span
          v-if="store.networkOperation == 'subscribe'"
          class="ml-1 size-4 block animate-spin border-3 border-white/30 border-t-white rounded-full relative top-[4px] inline-flex transition-opacity duration-500"
        />
      </Button>
    </form>
  </div>
</template>
