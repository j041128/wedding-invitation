<template>
    <input type="text" class="m-1 h-[60px] border-1 border-[#C0E5D4] rounded-[6px] focus:border-3 outline-[#C0E5D4] text-[20px] font-mincho placeholder:text-left px-4" v-model="value">
</template>

<script setup>
const value = defineModel();
</script>