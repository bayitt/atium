<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from 'vue'
import { useNetworkOperation } from '~/store'
import { generateRandomString } from '~/utilities/string'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ handleClose: [] }>()
const {
  public: { API_URL },
} = useRuntimeConfig()
const networkOperation = useNetworkOperation()
const message = ref('')
const input = useTemplateRef('input')

const hasSubscribedCookie = useCookie('has_subscribed', { maxAge: 60 * 60 * 24 * 3650 })
const visitedRecentlyCookie = useCookie('visited_recently', { maxAge: 60 * 60 * 24 * 3 })

const subscribe = async () => {
  if (!input?.value) return
  if (networkOperation.value === 'subscribe') return

  networkOperation.value = 'subscribe'

  try {
    const response = await $fetch(`${API_URL}/subscribers`, {
      method: 'POST',
      body: { email: input.value.value },
    })

    input.value.value = ''
    input.value.focus()

    message.value = 'You are subscribed successfully !'
    hasSubscribedCookie.value = generateRandomString(10);
    setTimeout(() => {
      message.value = ''
      emit('handleClose')
    }, 2000)
  } catch (error) {
    message.value = 'There was an issue subscribing'
  }

  networkOperation.value = ''
}

watchEffect(() => {
  if (!window) return

  window.document.body.style.height = props.isOpen ? '100vh' : 'auto'
  window.document.body.style.overflowY = props.isOpen ? 'hidden' : 'visible'

  if (props.isOpen)
    visitedRecentlyCookie.value = generateRandomString(10)
})
</script>

<template>
  <div class="fixed transition-all duration-700 ease-in left-0 w-screen h-screen bg-white z-10 flex justify-center items-center"
  :class="props.isOpen ? 'top-0' : '-top-[100vh]'">
    <div class="relative -top-[5vh] w-5/6 sm:w-[420px] flex flex-col items-center text-[rgba(0,0,0,0.7)]">
      <img
        src="https://res.cloudinary.com/olamileke/image/upload/c_thumb,w_55,g_face/v1760027186/chequer_dev/ol-high-resolution-logo_fmyams.png"
        class="mb-7 object-cover"
      />
      <p class="font-semibold text-xl text-[rgba(0,0,0,0.85)] mb-2">Olamileke's Library</p>
      <p class="text-center text-[1.1rem] mb-3">
        Musings, thoughts and opinions about books I read.
      </p>
      <p class="text-center text-base mb-8">
        By <a href="mailto:olamileke.f@gmail.com" class="underline decoration-double font-semibold">Olamileke Fambegbe</a>
      </p>

      <form class="w-full mb-8" @submit.prevent="subscribe">
        <div class="relative">
          <input
            autoFocus
            type="email"
            ref="input"
            class="
              w-full
              px-3
              py-2
              outline-hidden
              transition-colors
              duration-300
              ease-in
              rounded
              placeholder:text-[rgba(0,0,0,0.35)]
            "
            :class="
              message === '' || message.includes('success')
                ? 'border-[2.5px] border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)]'
                : 'border-[2.5px] border-[#FF7F7F]'
            "
            placeholder="Enter your email address"
            required
          />
          <Button
            type="submit"
            class="absolute z-10 right-0 top-0 h-full !px-3 !sm:px-5 !rounded-none !rounded-r-[3px]"
            >Subscribe
            <span
              v-if="networkOperation === 'subscribe'"
              class="
                ml-1
                size-4
                block
                animate-spin
                border-3 border-white/30 border-t-white
                rounded-full
                relative
                top-[4px]
                inline-flex
                transition-opacity
                duration-500
              "
            />
          </Button>
        </div>
        <p
          v-if="message"
          class="text-sm text-center mt-2"
          :class="
            message === '' || message.includes('success')
              ? 'text-[rgba(0,0,0,0.98)]'
              : 'text-[#FF0000]'
          "
        >
          {{ message }}
        </p>
      </form>

      <div class="flex items-center gap-[6px] cursor-pointer" @click="$emit('handleClose')">
        <p class="text-[rgba(0,0,0,0.75)]">No, continue to the library</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  </div>
</template>
