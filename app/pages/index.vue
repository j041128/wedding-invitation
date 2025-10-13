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
            <fieldset class="my-4">
                <legend class="flex items-end mb-2"><span class="font-mincho text-[24px] mr-2">ご出欠</span><Badge>必須</Badge></legend>
                <div>
                    <RadioButton :items="attendances" v-model="form.attendance" :id="'attendance1'" :name="'attendance'" />
                </div>
            </fieldset>
            <fieldset class="my-4">
                <legend class="flex items-end mb-2"><span class="font-mincho text-[24px] mr-2">お名前</span><Badge>必須</Badge></legend>
                <div>
                    <NameInput
                    v-model:first="form.first"
                    v-model:last="form.last"
                    v-model:firstkana="form.firstkana"
                    v-model:lastkana="form.lastkana"
                    />
                </div>
            </fieldset>
            <fieldset class="my-4">
                <legend class="flex items-end mb-2"><span class="font-mincho text-[24px]">ご連名</span></legend>
                <div>
                    <FullNameInput v-model:name="form.name1" v-model:kana="form.name1kana" id="name1" placeholder="連名1" />
                    <FullNameInput v-model:name="form.name2" v-model:kana="form.name2kana" id="name2" placeholder="連名2" />
                    <FullNameInput v-model:name="form.name3" v-model:kana="form.name3kana" id="name3" placeholder="連名3" />
                    <FullNameInput v-model:name="form.name4" v-model:kana="form.name4kana" id="name4" placeholder="連名4" />
                </div> 
            </fieldset>
            <fieldset class="my-4">
                <legend class="flex items-end mb-2" for="flag"><span class="font-mincho text-[24px] mr-2">いずれかをお選びください</span><Badge>必須</Badge></legend>
                <div id="flag">
                    <RadioButton :items="flags" v-model="form.flag" :id="'flag1'" :name="'flag'" />
                </div>
            </fieldset>
            <div class="my-4">
                <label class="flex items-end mb-2" for="mailaddress"><span class="font-mincho text-[24px]">メールアドレス</span></label>
                <div class="grid grid-cols-1">
                    <Input v-model="form.mailaddress" id="mailaddress" type="email" placeholder="mail@mail.com"/>
                </div>
            </div>
            <fieldset class="my-4">
                <legend class="flex items-end mb-2" for="address"><span class="font-mincho text-[24px]">ご住所</span></legend>
                <div class="grid grid-cols-1" id="address">
                    <AddressInput v-model:zipcode="form.zipcode" v-model:address1="form.city" v-model:address2="form.address2" v-model:address3="form.address3" />
                </div>
            </fieldset>
            <div class="my-4">
                <label class="flex items-end mb-2" for="allergy"><span class="font-mincho text-[24px]">アレルギーについて</span></label>
                <div>
                    <p id="allergy-helper-text" class="font-mincho break-keep">アレルギーなど<wbr />食べられないものが<wbr />ございましたら<wbr />ご遠慮なく<wbr />お書き添えください</p>
                    <textarea v-model="form.allergy" id="allergy" class="m-1 w-full border-1 border-[#C0E5D4] rounded-[6px] focus:border-3 outline-[#C0E5D4] text-[20px] font-mincho placeholder:text-left px-4 py-2" cols="2" aria-describedby="allergy-helper-text"></textarea>
                </div>
            </div>
            <div class="my-4">
                <label class="flex items-end mb-2" for="message"><span class="font-mincho text-[24px]">新郎新婦へのメッセージ</span></label>
                <div>
                    <textarea v-model="form.message" id="message" class="m-1 w-full border-1 border-[#C0E5D4] rounded-[6px] focus:border-3 outline-[#C0E5D4] text-[20px] font-mincho placeholder:text-left px-4 py-2" cols="3"></textarea>
                </div>
            </div>
            <div class="flex justify-center">
                <button class="py-[24px] px-[62px] rounded-full shadow-md bg-[#D7F0E5] disabled:bg-[#D9D9D9] disabled:text-white" :disabled="checkRequired()" @click="handleFormSubmit()">
                    <div role="status" v-if="loading">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span class="font-mincho text-[24px]" v-else>招待状に回答する</span>
                </button>
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

const loading = ref(false);

const checkRequired = () => {
  return form.attendance === null || form.first === '' || form.last === '' || form.firstkana === '' || form.lastkana === '' || form.flag === null;
}

const handleFormSubmit = async () => {

    try{
        loading.value = true;
        await $fetch('api/submit', {
            headers: {
                'x-vercel-automation-bypass-secret': config.public.VERCEL_AUTOMATION_BYPASS_SECRET
            },
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
        }).then((res) => {
            loading.value = false;
            router.push('/thanks');
        }).catch((err) => {
            loading.value = false;
            console.log(err);
        });
    }catch(e){
        console.log(e);
    };
}
</script>