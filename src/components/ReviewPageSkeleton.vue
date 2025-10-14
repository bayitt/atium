<script lang="ts" setup>

</script>

<template>
    <section>
      <div class="max-w-[1200px] mx-auto grid grid-cols-12 py-8">
        <div class="col-span-1 sticky top-[10px] flex flex-col gap-5 h-fit">
          <span v-for="n in 6" :key="n" class="size-9 bg-[#ddd] animate-pulse rounded-full" />
        </div>
        <div class="col-span-8">
          <div class="mb-7">
            <div class="h-[130px] bg-[#ddd] animate-pulse w-[105%] mb-4 p-10 flex justify-between items-center" />
            <div class="flex gap-2">
              <p v-for="n in 4" :key="n" class="h-3 bg-[#ddd] animate-pulse" :class="n == 3 ? 'w-35' : 'w-20'" />
            </div>
          </div>

          <div class="w-[105%]">
            <div v-for="m in 4" :key="m" class="mb-7">
              <p v-for="n in 8" :key="n" class="h-3 w-full bg-[#ddd] animate-pulse mb-2" />
            </div>
          </div>
        </div>
        <div class="col-span-3 h-fit">
          <div class="h-[300px] bg-[#ddd] ml-auto w-4/6" />
        </div>
      </div>
    </section>
</template>