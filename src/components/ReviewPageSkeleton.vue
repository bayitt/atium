<script lang="ts" setup></script>

<template>
  <section>
    <div class="max-w-[1200px] mx-auto lg:grid grid-cols-12 py-1 lg:py-8">
      <div class="hidden lg:flex flex-col gap-5 col-span-1 sticky top-[10px] h-fit">
        <span v-for="n in 6" :key="n" class="size-9 bg-[#ddd] animate-pulse rounded-full" />
      </div>
      <div class="col-span-11">
        <div class="mb-7">
          <div
            class="h-[420px] sm:h-[270px] bg-[#ddd] animate-pulse mb-4 p-10 flex justify-between items-center"
          />
          <div class="px-[6%] sm:px-[5%] lg:px-0 flex gap-2">
            <p
              v-for="n in 4"
              :key="n"
              class="h-3 bg-[#ddd] animate-pulse"
              :class="n == 3 ? 'w-35' : 'w-20'"
            />
          </div>
        </div>

        <div class="px-[6%] sm:px-[5%] lg:px-0">
          <div v-for="m in 6" :key="m" class="mb-5">
            <p
              v-for="n in 4"
              :key="n"
              class="h-5 bg-[#ddd] animate-pulse mb-1"
              :class="n === 4 ? 'w-[60%]' : 'w-full'"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
