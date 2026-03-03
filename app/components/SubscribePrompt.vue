<script setup lang="ts"></script>

<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-white z-10 flex justify-center items-center">
    <div class="relative -top-[5vh] w-[420px] flex flex-col items-center text-[rgba(0,0,0,0.7)]">
      <img
        src="https://res.cloudinary.com/olamileke/image/upload/c_thumb,w_55,g_face/v1760027186/chequer_dev/ol-high-resolution-logo_fmyams.png"
        class="mb-7 object-cover"
      />
      <p class="font-semibold text-xl text-[rgba(0,0,0,0.85)] mb-2">Olamileke's Library</p>
      <p class="text-center text-[1.1rem] mb-3">
        Musings, thoughts and opinions about books I read.
      </p>
      <p class="text-center text-base mb-8">
        By <a class="underline decoration-double font-semibold">Olamileke Fambegbe</a>
      </p>

      <div class="w-full relative mb-8">
        <input
          type="email"
          class="
            w-full
            px-3
            py-2
            outline-hidden
            transition-colors
            duration-300
            ease-in
            border-[2.5px] border-[rgba(0,0,0,0.2)]
            focus:border-[rgba(0,0,0,0.5)]
            rounded
            placeholder:text-[rgba(0,0,0,0.35)]
          "
          placeholder="Enter your email address"
          required
        />
        <Button
          type="submit"
          class="absolute right-0 top-0 h-full w-2/8 !rounded-none !rounded-r-[3px]"
          >Subscribe</Button
        >
      </div>

      <div class="flex items-center gap-[6px] cursor-pointer">
        <p class="text-[rgba(0,0,0,0.75)]">No, take me to the library</p>
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
