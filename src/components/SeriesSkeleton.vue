<script setup lang="ts">
</script>

<template>
    <div class="grid grid-cols-12 mb-8">
        <div class="col-span-6">
            <p class="h-4 w-40 bg-[#ddd] animate-pulse mb-2" />
            <p class="h-20 w-[90%] bg-[#ddd] animate-pulse mb-4" />

            <p class="h-4 w-20 bg-[#ddd] animate-pulse mb-5" />
            <p class="h-4 w-1/2 bg-[#ddd] animate-pulse" />
        </div>
        <div class="col-span-6 flex flex-wrap gap-3 pl-6">
            <div class="h-[120px] bg-[#ddd] animate-pulse" style="width: calc(50% - 12px)" />
            <div class="h-[120px] bg-[#ddd] animate-pulse" style="width: calc(50% - 12px)" />
            <div class="h-[120px] bg-[#ddd] animate-pulse" style="width: calc(50% - 12px)" />
        </div>
    </div>
</template>