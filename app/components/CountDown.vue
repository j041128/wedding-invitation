<template>
    <div>
        <div>
            <span class="text-white font-jost text-[72px]">{{ days }}</span>
            <span class="text-white font-cursive italic text-[32px]">days</span>
        </div>
        <div class="grid grid-cols-3">
            <div class="grid grid-cpls-1">
                <span class="text-white font-jost text-[54px] text-center">{{ hours }}</span>
                <span class="text-white font-jost text-[14px] text-center">Hours</span>
            </div>
            <div class="grid grid-cols-1">
                <span class="text-white font-jost text-[54px] text-center">{{ minutes }}</span>
                <span class="text-white font-jost text-[14px] text-center">Minutes</span>
            </div>
            <div class="grid grid-cols-1">
                <span class="text-white font-jost text-[54px] text-center">{{ seconds }}</span>
                <span class="text-white font-jost text-[14px] text-center">Seconds</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue"

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const props = defineProps({
    today: {
        type: String,
        default: "December, 25 2026",
    },
});

const getTime = () => {
    const time = Date.parse(props.today) - Date.now()
    
    days.value = Math.floor(time / (1000 * 60 * 60 * 24))
    hours.value = Math.floor(time / (1000 * 60 * 60) % 24)
    minutes.value = Math.floor((time / 1000 / 60) % 60)
    seconds.value = Math.floor((time / 1000) % 60)
}

if(process.client){
    const timer = setInterval(() => getTime(), 1000)
    onUnmounted(() => clearInterval(timer))
}
</script>