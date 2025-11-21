<script setup lang="ts"></script>

<template>
  <div class="flex flex-col-reverse sm:grid grid-cols-12">
    <div class="col-span-8 px-[6%] sm:pl-0 sm:pr-5">
      <div class="flex gap-2 mb-4">
        <p class="h-4 w-20 bg-[#ddd] animate-pulse" />
        <p class="h-4 w-20 bg-[#ddd] animate-pulse" />
      </div>
      <p class="hidden sm:block h-5 w-40 bg-[#ddd] animate-pulse mb-4" />
      <p class="h-24 sm:h-16 sm:w-[95%] mb-4 bg-[#ddd] animate-pulse" />
      <p class="h-4 w-45 mb-4 bg-[#ddd] animate-pulse" />
      <p class="h-4 w-65 bg-[#ddd] animate-pulse" />
    </div>
    <div
      class="col-span-4 flex items-center mb-5 sm:mb-0 px-[28%] sm:pl-[45%] sm:pr-0 md:pl-[53%] lg:px-12"
    >
      <div class="animate-pulse bg-[#ddd] w-full h-[230px] sm:h-[180px]" />
    </div>
  </div>
</template>
