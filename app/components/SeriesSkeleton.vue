<script setup lang="ts"></script>

<template>
  <div class="flex flex-col-reverse sm:grid grid-cols-12 mb-8">
    <div class="sm:col-span-6 px-[6%] sm:px-0">
      <p class="hidden sm:block h-4 w-40 bg-[#ddd] animate-pulse mb-2" />
      <p class="h-20 sm:w-[90%] bg-[#ddd] animate-pulse mb-4" />

      <p class="h-4 w-25 bg-[#ddd] animate-pulse mb-3 sm:mb-5" />
      <p class="h-4 w-3/5 bg-[#ddd] animate-pulse" />
    </div>
    <div
      class="flex flex-wrap justify-center items-center sm:col-span-6 flex flex-wrap gap-3 px-[6%] sm:pl-6 sm:pr-0 mb-5 sm:mb-0"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="h-[170px] sm:h-[145px] w-[calc(38%-12px)] sm:w-[calc(33%-12px)] bg-[#ddd] animate-pulse"
      />
    </div>
  </div>
</template>
