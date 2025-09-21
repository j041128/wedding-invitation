<template>
    <div class="invitation">
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
                            <p class="font-cursive text-[60px] text-[#EEB0F0]">Invitation</p>
                            <p class="font-mincho text-[24px]">ご入力ください</p>
                        </div>
                    </div>
                </template>
            </ImageOnContent>
            <div class="absolute top-[65%] left-[76%]">
                <NuxtImg src="/img/jewel1.png" width="116px" height="108px" />
            </div>
        </div>
        <div class="p-4">
            <div class="my-4">
                <label class="flex items-end mb-2" for="attendance"><span class="font-mincho text-[24px] mr-2">ご出欠</span><Badge>必須</Badge></label>
                <div id="attendance">
                    <RadioButton :items="attendances" v-model="form.attendance" :id="'attendance1'" :name="'attendance'" />
                </div>
            </div>
            <div class="my-4">
                <label class="flex items-end mb-2" for="name"><span class="font-mincho text-[24px] mr-2">お名前</span><Badge>必須</Badge></label>
                <div id="name">
                    <NameInput
                    v-model:first="form.first"
                    v-model:last="form.last"
                    v-model:firstkana="form.firstkana"
                    v-model:lastkana="form.lastkana"
                    />
                </div>
                <div class="my-4">
                    <label class="flex items-end mb-2" for="names"><span class="font-mincho text-[24px]">ご連名</span></label>
                    <div id="names">
                        <FullNameInput v-model:name="form.name1" v-model:kana="form.name1kana" id="name1" placeholder="連名1" />
                        <FullNameInput v-model:name="form.name2" v-model:kana="form.name2kana" id="name2" placeholder="連名2" />
                        <FullNameInput v-model:name="form.name3" v-model:kana="form.name3kana" id="name3" placeholder="連名3" />
                        <FullNameInput v-model:name="form.name4" v-model:kana="form.name4kana" id="name4" placeholder="連名4" />
                    </div> 
                </div>
                <div class="my-4">
                    <label class="flex items-end mb-2" for="flag"><span class="font-mincho text-[24px] mr-2">いずれかをお選びください</span><Badge>必須</Badge></label>
                    <div id="flag">
                        <RadioButton :items="flags" v-model="form.flag" :id="'flag1'" :name="'flag'" />
                    </div>
                </div>
                <div class="my-4">
                    <label class="flex items-end mb-2" for="mailaddress"><span class="font-mincho text-[24px]">メールアドレス</span></label>
                    <div id="mailaddress" class="grid grid-cols-1">
                        <Input :v-model="form.mailaddress" placeholder="mail@mail.com"/>
                    </div>
                </div>
                <div class="my-4">
                    <label class="flex items-end mb-2" for="address"><span class="font-mincho text-[24px]">ご住所</span></label>
                    <div class="grid grid-cols-1" id="address">
                        <AddressInput v-model:zipcode="form.zipcode" v-model:address1="form.city" v-model:address2="form.address2" v-model:address3="form.address3" />
                    </div>
                </div>
                <div class="my-4">
                    <label class="flex items-end mb-2" for="allergy"><span class="font-mincho text-[24px]">アレルギーについて</span></label>
                    <div id="allergy">
                        <p id="allergy-helper-text" class="font-mincho break-keep">アレルギーなど<wbr />食べられないものが<wbr />ございましたら、<wbr />ご遠慮なく<wbr />お書き添えください</p>
                        <textarea v-model="form.allergy" class="m-1 w-full border-1 border-[#C0E5D4] rounded-[6px] focus:border-3 outline-[#C0E5D4] text-[20px] font-mincho placeholder:text-left px-4 py-2" cols="2" aria-describedby="allergy-helper-text"></textarea>
                    </div>
                </div>
                <div class="my-4">
                    <label class="flex items-end mb-2" for="message"><span class="font-mincho text-[24px]">新郎新婦へのメッセージ</span></label>
                    <div id="message">
                        <textarea v-model="form.message" class="m-1 w-full border-1 border-[#C0E5D4] rounded-[6px] focus:border-3 outline-[#C0E5D4] text-[20px] font-mincho placeholder:text-left px-4 py-2" cols="3"></textarea>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button class="py-[24px] px-[62px] rounded-full shadow-md bg-[#D7F0E5] disabled:bg-[#D9D9D9] disabled:text-white" :disabled="checkRequired()" @click="handleFormSubmit()">
                        <span class="font-mincho text-[24px]">招待状に回答する</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app';
const router = useRouter();

const config = useRuntimeConfig();

const attendances = ['ご出席', 'ご欠席'];
const flags = ['新郎ゲスト', '新婦ゲスト'];

const form = reactive({
  attendance: null,
  first: '',
  last: '',
  firstkana: '',
  lastkana: '',
  name1: '',
  name1kana: '',
  name2: '',
  name2kana: '',
  name3: '',
  name3kana: '',
  name4: '',
  name4kana: '',
  flag: null,
  mailaddress: '',
  zipcode: '',
  city: "",
  address2: '',
  address3: '',
  allergy: '',
  message: '',
});

const checkRequired = () => {
  return form.attendance === null || form.first === '' || form.last === '' || form.firstkana === '' || form.lastkana === '' || form.flag === null;
}

const handleFormSubmit = async () => {
    const CORS_PROXY = "/api/proxy/";

    try{
        const res = await $fetch(CORS_PROXY + config.public.GOOGLE_FORM_ACTION, {
            method: 'POST',
            body: {
                'entry.707064267': form.attendance,
                'entry.654003671': form.first,
                'entry.720946575': form.last,
                'entry.1837378746': form.firstkana,
                'entry.379307055': form.lastkana,
                'entry.577033923': form.name1,
                'entry.1463568491': form.name1kana,
                'entry.720175567': form.name2,
                'entry.1443811429': form.name2kana,
                'entry.924191309': form.name3,
                'entry.176464161': form.name3kana,
                'entry.829516189': form.name4,
                'entry.1903233454': form.name4kana,
                'entry.1446298437': form.flag,
                'entry.280336886': form.mailaddress,
                'entry.1473960836': form.zipcode,
                'entry.338786': form.city,
                'entry.778005714': form.address2,
                'entry.331640168': form.address3,
                'entry.1584758284': form.allergy,
                'entry.892809074': form.message,
            },
        });
        router.push('/thanks');
    }catch(e){
        console.log(e);
    }
}
</script>