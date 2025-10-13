<template>
    <div class="thanks pb-45" ref="thanks">
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
                <NuxtImg provider="cloudinary" loading="lazy" width="212" height="110" :src="props.url_thanks" />
            </div>
            <div class="mx-2">
                <div class="my-2 leading-8">
                    <p class="font-mincho text-center [&_span]:inline-block"><span class="d">送信完了</span><span>しました</span></p>
                    <p class="font-mincho text-center [&_span]:inline-block"><span>ご回答</span><span>ありがとう</span><span>ございました</span></p>
                </div>
                <div class="my-2 leading-8">
                    <p class="font-mincho text-center [&_span]:inline-block"><span>ご出席と</span><span>お答え</span><span>いただいた方へは</span></p>
                    <p class="font-mincho text-center [&_span]:inline-block"><span>挙式が</span><span>近づきましたら</span><span>改めて</span><span>ご案内を</span><span>お送りいたします</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    url_thanks: {
        type: String,
        default: "",
    }
});
</script>