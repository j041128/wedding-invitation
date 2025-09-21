<script setup>
import { useRuntimeConfig } from 'nuxt/app';
import { useTemplateRef } from 'vue'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const state = reactive({
  images: [],
  texts: [],
});

const config = useRuntimeConfig();

const MAX_RETRY = 10;

let flag = false;
let count = 0;

while(!flag && count < MAX_RETRY){
  try{
    const imagesRes = await $fetch('/api/gallery');
    state.images = imagesRes
    if(state.images.top !== undefined){
      flag = true;
      break;
    }else{
      flag = false;
      throw new Error('画像の取得に失敗しました。');
    }
  }catch(e){
    console.log(e);
    sleep(1000);
  }finally{
    count++;
  }
}

flag = 0;
count = 0;

while(!flag && count < MAX_RETRY){
  try{
    const textsRes = await $fetch("/api/text");
    state.texts = textsRes;
    if(state.texts.url_top !== undefined){
      flag = true;
      break;
    }else{
      flag = false;
      throw new Error('テキストの取得に失敗しました。');
    }
  }catch(e){
    console.log(e);
    sleep(1000);
  }finally{
    count++;
  }
}

const smartphone = useTemplateRef('smartphone');
const horizon = useTemplateRef('horizon');

const scrollToNearbyInvitation = () => {
  var rect = horizon.value.getBoundingClientRect();
  var position = rect.top;

  smartphone.value.scrollBy({
    top: position,
    behavior: 'smooth',
  });
}
</script>

<template>
  <main>
    <div class="flex justify-center">
      <div class="flex gap-[47px]">
        <div class="hidden md:block">
          <div class="relative">
            <div class="relative">
              <div class="max-w-[800px]">
                <div class="leading-none mt-[30px] mb-[15px]">
                  <p class="text-center text-[#FF8F89] font-jost text-[min(4vw,60px)]">WEDDING</p>
                  <p class="text-center text-[#FF89A9] font-cursive text-[min(8vw,120px)] tracking-tighter">Invitation</p>
                </div>
                <div class="grid grid-cols-5 mb-[60px]">
                  <div class="flex justify-center col-span-2 hidden xl:block">
                    <NuxtImg loading="lazy" width="250px" height="330px" :src="state.texts.url_photos" />
                  </div>
                  <div class="flex justify-center col-span-5 xl:col-span-3">
                    <dl class="w-[480px] font-mincho text-[min(6vw,20px)] pb-2">
                      <div class="grid grid-cols-5 pb-2">
                        <dt class="col-span-2 mx-10" style="text-align-last: justify;">日時</dt>
                        <dd class="col-span-3">{{ state.texts.information_datetime }}</dd>
                      </div>
                      <div class="grid grid-cols-5 pb-2">
                        <dt class="col-span-2 mx-10" style="text-align-last: justify;">受付</dt>
                        <dd class="col-span-3">{{ state.texts.information_entry }}</dd>
                      </div>
                      <div class="grid grid-cols-5 pb-2">
                        <dt class="col-span-2 mx-10" style="text-align-last: justify;">挙式</dt>
                        <dd class="col-span-3">{{ state.texts.information_ceremony }}</dd>
                      </div>
                      <div class="grid grid-cols-5 pb-2">
                        <dt class="col-span-2 mx-10" style="text-align-last: justify;">披露宴</dt>
                        <dd class="col-span-3">{{ state.texts.information_reception }}</dd>
                      </div>
                      <div class="grid grid-cols-5 pb-2">
                        <dt class="col-span-2 mx-10" style="text-align-last: justify;">場所</dt>
                        <dd class="col-span-3">{{ state.texts.information_place }}</dd>
                      </div>
                      <div class="grid grid-cols-5 pb-2">
                        <dt class="col-span-2 mx-10" style="text-align-last: justify;">住所</dt>
                        <dd class="col-span-3">{{ state.texts.information_address }}</dd>
                      </div>
                      <div class="grid grid-cols-5 pb-2">
                        <dt class="col-span-2 mx-10" style="text-align-last: justify;">電話番号</dt>
                        <dd class="col-span-3">{{ state.texts.information_number }}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div class="flex justify-center">
                  <button class="py-[24px] px-[62px] rounded-full shadow-md bg-[#FCDADA] disabled:bg-[#D9D9D9] disabled:text-white" @click="scrollToNearbyInvitation()">
                    <span class="font-mincho text-[24px]">招待状に回答する</span>
                  </button>
                </div>
              </div>
              <div class="absolute top-[80%] left-[-5%]">
                <NuxtImg src="/img/jewel8.png" width="150px" height="160px" />
              </div>
            </div>
            <div class="absolute top-[90%] left-[75%]">
              <NuxtImg loading="lazy" width="212" height="110" :src="state.texts.url_dot" />
            </div>
          </div>
        </div>
        <div class="max-w-[450px] h-[100dvh] col-span-1 overflow-x-auto" ref="smartphone">
          <div class="relative">
            <div class="top grid grid-cols-10">
              <NuxtImg loading="lazy" class="col-span-9 w-full" width="329" height="409" :src="state.texts.url_top"/>
              <div class="col-span-1">
                <span class="w-[99%] [writing-mode:vertical-rl] font-jost text-[#FCDADA]">
                  <span class="mx-[22px]">
                    <span class="text-[24px]">{{ state.texts.top_name }}</span>
                  </span>
                  <span class="mx-[4px]">
                    <span class="text-[17px]">{{ state.texts.top_month }}</span>
                    <span class="text-[28px]">{{ state.texts.top_day }}</span>
                    <span class="text-[17px]">{{ state.texts.top_year }}</span>
                  </span>
                </span>
              </div>
            </div>
            <div class="absolute top-[90%] left-[74%]">
              <NuxtImg src="/img/jewel1.png" width="116px" height="108px" />
            </div>
          </div>
          <div class="greeting py-10">
            <div class="relative">
              <div class="leading-none pb-10">
                <p class="text-center text-[#FF8F89] font-jost text-[30px] ">WEDDING</p>
                <p class="text-center text-[#FF89A9] font-cursive text-[64px] ">Invitation</p>
              </div>
              <div class="absolute top-[90%] left-[0%]">
                <NuxtImg src="/img/jewel2.png" width="112px" height="114" />
              </div>
            </div>
            <FadeIn class="h-[416px] w-full">
              <div>
                <div class="pb-8">
                  <p class="text-center font-mincho">{{ state.texts.greeting_acronym }}</p>
                </div>
                <div class="pb-10">
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph1 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph2 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph3 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph4 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph5 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph6 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph7 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph8 }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_paragraph9 }}</p>
                </div>
                <div class="pb-8">
                  <p class="text-center font-mincho">{{ state.texts.greeting_backronyum }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_date }}</p>
                </div>
                <div>
                  <p class="text-center font-mincho">{{ state.texts.greeting_groom }}</p>
                  <p class="text-center font-mincho">{{ state.texts.greeting_bride }}</p>
                </div>
              </div>
            </FadeIn>
          </div>
          <div class="relative">
            <ImageOnContent class="gradation">
              <template v-slot:image>
                <NuxtImg loading="lazy" class="mask-img-top-bottom" :src="state.texts.url_countdown" />
              </template>
              <template v-slot:content>
                <div class="grid-rows-3 leading-none">
                  <div class="flex justify-center">
                    <span class="font-jost text-white text-[28px]">COUNT DOWN</span>
                  </div>
                  <CountDown :today="state.texts.countdown_today" />
                </div>
              </template>
            </ImageOnContent>
            <div class="absolute top-[85%] left-[67%]">
              <NuxtImg src="/img/jewel3.png" width="209px" height="75px" />
            </div>
          </div>
          <div class="information py-[40px]">
            <div>
              <p class="text-center font-cursive italic text-[60px] text-[#FF8F89] tracking-tighter">Information</p>
            </div>
            <FadeIn class="h-[248px] w-full">
              <div class="flex justify-center">
                <dl class="font-mincho w-[276px]">
                  <div class="grid grid-cols-5 gap-[32px] pb-2">
                    <dt class="col-span-2 [text-align-last:justify]">日時</dt>
                    <dd class="col-span-3">{{ state.texts.information_datetime }}</dd>
                  </div>
                  <div class="grid grid-cols-5 gap-[32px] pb-2">
                    <dt class="col-span-2 [text-align-last:justify]">受付</dt>
                    <dd class="col-span-3">{{ state.texts.information_entry }}</dd>
                  </div>
                  <div class="grid grid-cols-5 gap-[32px] pb-2">
                    <dt class="col-span-2 [text-align-last:justify]">挙式</dt>
                    <dd class="col-span-3">{{ state.texts.information_ceremony }}</dd>
                  </div>
                  <div class="grid grid-cols-5 gap-[32px] pb-2">
                    <dt class="col-span-2 [text-align-last:justify]">披露宴</dt>
                    <dd class="col-span-3">{{ state.texts.information_reception }}</dd>
                  </div>
                  <div class="grid grid-cols-5 gap-[32px] pb-2">
                    <dt class="col-span-2 [text-align-last:justify]">場所</dt>
                    <dd class="col-span-3">{{ state.texts.information_place }}</dd>
                  </div>
                  <div class="grid grid-cols-5 gap-[32px] pb-2">
                    <dt class="col-span-2 [text-align-last:justify]">住所</dt>
                    <dd class="col-span-3">{{ state.texts.information_address }}</dd>
                  </div>
                  <div class="grid grid-cols-5 gap-[32px] pb-2">
                    <dt class="col-span-2 [text-align-last:justify]">電話番号</dt>
                    <dd class="col-span-3">{{ state.texts.information_number }}</dd>
                  </div>
                </dl>
              </div>
            </FadeIn>
            <div class="m-4">
              <BasicMap :position="{ lat: Number(state.texts.information_lat), lng: Number(state.texts.information_lng) }" :zoom="16" :name="state.texts.information_place" />
            </div>
            <div>
              <div class="font-mincho text-center text-[20px] py-8">
                <p>{{ state.texts.invitation_paragraph1 }}</p>
                <p>
                  <span>{{ state.texts.invitation_paragraph2_1 }}</span>
                  <span class="text-[#EB1F00] text-[26px]">{{ state.texts.invitation_paragraph2_2 }}</span>
                  <span>{{ state.texts.invitation_paragraph2_3 }}</span>
                </p>
                <p>{{ state.texts.invitation_paragraph3 }}</p>
              </div>
              <div class="flex justify-center">
                <button class="py-[24px] px-[62px] rounded-full shadow-md bg-[#FFFF] disabled:bg-[#D9D9D9] disabled:text-white" @click="scrollToNearbyInvitation()">
                  <span class="font-mincho text-[24px]">招待状に回答する</span>
                </button>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="relative">
              <ImageOnContent>
                <template v-slot:image>
                  <NuxtImg loading="lazy" class="image" :src="state.texts.url_profile" />
                </template>
                <template v-slot:content>
                  <div class="flex w-full h-full items-center justify-center">
                      <p class="font-cursive text-white text-[80px]">profile</p>
                  </div>
                </template>
              </ImageOnContent>
              <div class="absolute top-[-15%]">
                <NuxtImg src="/img/jewel9.png" width="108px" height="92px" />
              </div>
            </div>
            <div class="absolute top-[85%] left-[76%]">
              <NuxtImg src="/img/jewel4.png" width="108px" height="92px" />
            </div>
          </div>
          <div class="profile py-[39px]">
            <div class="mx-15">
              <FadeIn class="h-[330px] w-full">
                <div class="grid grid-cols-2">
                  <div class="flex justify-center">
                    <NuxtImg loading="lazy" width="175px" height="175px" :src="state.texts.url_groom" />
                  </div>
                  <div class="flex items-center justify-center">
                    <div>
                      <p class="text-center text-[30px] font-mincho">{{ state.texts.profile_groom_name }}</p>
                      <p class="text-center text-[16px] text-[#FF8F89] font-jost">{{ state.texts.profile_groom_type }}</p>
                    </div>
                  </div>
                </div>
                <div class="my-4">
                  <p class="text-center text-[16px] font-mincho">{{ state.texts.profile_groom_comment }}</p>
                </div>
              </FadeIn>
              <FadeIn class="h-[330px] w-full">
                <div class="grid grid-cols-2">
                  <div class="flex items-center justify-center">
                    <div>
                      <p class="text-center text-[30px] font-mincho">{{ state.texts.profile_bride_name }}</p>
                      <p class="text-center text-[16px] text-[#FF8F89] font-jost">{{ state.texts.profile_bride_type }}</p>
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <NuxtImg loading="lazy" width="175px" height="175px" :src="state.texts.url_bride" />
                  </div>
                </div>
                <div class="my-4">
                  <p class="text-center text-[16px] font-mincho">{{ state.texts.profile_bride_comment }}</p>
                </div>
              </FadeIn>
            </div>
          </div>
          <hr class="text-[#F5DAF6] border-8" ref="horizon">
          <NuxtPage :url_thanks="state.texts.url_thanks"/>
          <div class="footer">
            <span class="text-center">©︎ 2025 murase and nakai</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
html {
  height: 100%;
  overscroll-behavior-x: none;
}
body {
  height: 100%;
  margin: 0;
  background-color: #FFFBE5;
  background-image: linear-gradient(0deg, transparent calc(100% - 2px), #F5DAF6 calc(100% - 2px)),
                    linear-gradient(90deg, transparent calc(100% - 2px), #F5DAF6 calc(100% - 2px));
  background-size: 66px 66px;
  background-repeat: repeat;
  background-position: center center;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMUw4IDhMMTUgMSIgc3Ryb2tlPSIjMUUxRTFFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K");
  background-repeat: no-repeat;
  background-size: 14px 7px;
  background-position: right 30px center;
}
.top {
  background-color: #EEFFF7;
}
.greeting {
  background-color: #EEFFF7;
}
.information {
  background-color: #E6F8FF;
}
.profile {
  background-color: #FDFDFD;
}
.invitation {
  background-color: #FFFFFF;
}
.thanks {
  background-color: #FFFFFF;
}
.footer {
  background-color: #FFFFFF;
}
.mask-img-top-bottom {
  --mask:
    radial-gradient(34.41px at 50% 48px,#000 99%,#0000 101%) calc(50% - 40px) 0/80px 51% repeat-x,
    radial-gradient(34.41px at 50% -28px,#0000 99%,#000 101%) 50% 20px/80px calc(51% - 20px) repeat-x,
    radial-gradient(34.41px at 50% calc(100% - 48px),#000 99%,#0000 101%) calc(50% - 40px) 100%/80px 51% repeat-x,
    radial-gradient(34.41px at 50% calc(100% + 28px),#0000 99%,#000 101%) 50% calc(100% - 20px)/80px calc(51% - 20px) repeat-x;
  -webkit-mask: var(--mask);
      mask: var(--mask);
}
.gradation {
  background: linear-gradient(180deg, #EEFFF7, #E6F8FF);
}
</style>