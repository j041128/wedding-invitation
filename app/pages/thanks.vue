<template>
    <div class="thanks pb-100" ref="thanks">
        <div class="relative">
            <div class="relative">
                <ImageOnContent>
                    <template v-slot:image>
                        <svg viewBox="0 0 375 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="188" cy="11.5" rx="221" ry="148.5" transform="rotate(180 188 11.5)" fill="#FFFCE7"/>
                        </svg>
                    </template>
                    <template v-slot:content>
                        <div class="flex w-full h-full items-center justify-center">
                            <div class="text-center leading-none">
                                <p class="font-cursive italic text-[60px] text-[#EEB0F0]">Completed</p>
                            </div>
                        </div>
                    </template>
                </ImageOnContent>
                <div class="absolute top-[-1%] rotate-180">
                    <NuxtImg src="/img/jewel5.png" width="74px" height="76px" />
                </div>
            </div>
            <div class="absolute top-[65%] left-[76%]">
                <NuxtImg src="/img/jewel1.png" width="116px" height="108px" />
            </div>
        </div>
        <div>
            <div class="flex justify-center">
                <NuxtImg :src="props.url_thanks" width="212" height="110"></NuxtImg>
            </div>
            <div class="m-2 leading-8">
                <p class="font-mincho text-center">送信完了しました。</p>
                <p class="font-mincho text-center">ご回答ありがとうございました。</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    url_thanks: {
        type: String,
        default: "",
    },
});

const smartphone = useTemplateRef('smartphone');
const thanks = useTemplateRef('thanks');

const scrollToNearbyThanks = () => {
  var rect = thanks.value.getBoundingClientRect();
  var position = rect.top;

  smartphone.value.scrollBy({
    top: position,
  });
}

onMounted(() => {
  scrollToNearbyThanks();
});
</script>