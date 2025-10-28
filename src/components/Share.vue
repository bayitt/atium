<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const { title } = defineProps<{ title: string }>()

library.add(faEnvelope, faFacebookF, faWhatsapp, faXTwitter, faLinkedinIn)

const classes =
  'size-10 sm:size-8 flex justify-center items-center rounded-full cursor-pointer border border-[rgba(0,0,0,0.95)] transition-colors duration-500 ease-in bg-transparent hover:bg-[#ddd]'

const handleShare = (platform: string) => {
  let url = window.document.URL

  if (platform === 'copy') {
    navigator.clipboard.writeText(url)
    return
  }

  switch (platform) {
    case 'email':
      url = `mailto:you@example.com?subject=${title}&body=${url}`
      break
    case 'facebook':
      url = `https://web.facebook.com/sharer/sharer.php?u=${url}`
      break
    case 'whatsapp':
      url = `whatsapp://send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`
      break
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
      break
    case 'linkedin':
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      break
    default:
      url = `mailto:you@example.com?subject=${title}&body=${url}`
  }

  window.open(url, 'Popup', 'location,status,scrollbars,resizable,width=500,height=500')
}
</script>

<template>
  <div class="flex flex-row lg:flex-col gap-3 lg:gap-5 justify-center lg:justify-start">
    <div :class="classes" @click="handleShare('copy')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="black"
        class="size-3.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
        />
      </svg>
    </div>
    <div :class="classes" @click="handleShare('email')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="rgba(0,0,0,0.9)"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    </div>
    <div :class="classes" @click="handleShare('facebook')">
      <FontAwesomeIcon icon="fa-brands fa-facebook-f" style="color: rgba(0, 0, 0, 0.5)" size="sm" />
    </div>
    <div :class="classes" @click="handleShare('whatsapp')">
      <FontAwesomeIcon icon="fa-brands fa-whatsapp" style="color: rgba(0, 0, 0, 0.7)" size="1x" />
    </div>
    <div :class="classes" @click="handleShare('twitter')">
      <FontAwesomeIcon icon="fa-brands fa-x-twitter" style="color: rgba(0, 0, 0, 0.8)" size="sm" />
    </div>
    <div :class="classes" @click="handleShare('linkedin')">
      <FontAwesomeIcon
        icon="fa-brands fa-linkedin-in"
        style="color: rgba(0, 0, 0, 0.65)"
        size="sm"
      />
    </div>
  </div>
</template>
