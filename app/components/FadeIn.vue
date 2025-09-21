<template>
    <div ref="sentinel">
        <transition name="fade" mode="out-in">
            <div v-show="visible">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script setup>
const visible = ref(false);

const sentinel = useTemplateRef('sentinel');

let observer = null;

onMounted(() => {
    const observerCallBack = (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                visible.value = true;
            }
        }
    }

    const observerOptions = {
        root: null,
        threshold: [0.5]
    };

    observer = new IntersectionObserver(observerCallBack, observerOptions);

    if (sentinel.value) {
        observer.observe(sentinel.value);
    }
});
onUnmounted(() => {
    if (observer && sentinel.value) {
        observer.unobserve(sentinel.value);
        observer.disconnect();
    }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>