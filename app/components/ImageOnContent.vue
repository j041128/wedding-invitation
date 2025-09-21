<template>
    <div class="relative">
        <slot name="image"></slot>
        <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-0 p-0">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    sizes: {
        type: String,
    },
    imgClass: {
        type: String,
        default: '',
    }
});
</script>