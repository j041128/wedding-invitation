<template>
    <div class="grid grid-cols-4">
        <div class="col-span-3">
            <div class="flex items-center">
                <label for="zipcode1" class="font-mincho text-[20px]">〒</label>
                <input type="text" class="m-1 h-[60px] w-full border-1 border-[#C0E5D4] rounded-[6px] focus:border-3 outline-[#C0E5D4] text-[20px] font-mincho px-4" id="zipcode1" placeholder="1234567" v-model="zipcode" @input="searchAddress" @change="searchAddress">
            </div>
        </div>
        <div class="col-span-3">
            <select class="m-1 w-full h-[60px] border-1 border-[#C0E5D4] rounded-[6px] focus:border-3 outline-[#C0E5D4] text-[20px] font-mincho px-4" placeholder="都道府県" v-model="address1">
                <option value="">都道府県</option>
                <option value="北海道">北海道</option>
                <option value="青森県">青森県</option>
                <option value="岩手県">岩手県</option>
                <option value="宮城県">宮城県</option>
                <option value="秋田県">秋田県</option>
                <option value="山形県">山形県</option>
                <option value="福島県">福島県</option>
                <option value="茨城県">茨城県</option>
                <option value="栃木県">栃木県</option>
                <option value="群馬県">群馬県</option>
                <option value="埼玉県">埼玉県</option>
                <option value="千葉県">千葉県</option>
                <option value="東京都">東京都</option>
                <option value="神奈川県">神奈川県</option>
                <option value="新潟県">新潟県</option>
                <option value="富山県">富山県</option>
                <option value="石川県">石川県</option>
                <option value="福井県">福井県</option>
                <option value="山梨県">山梨県</option>
                <option value="長野県">長野県</option>
                <option value="岐阜県">岐阜県</option>
                <option value="静岡県">静岡県</option>
                <option value="愛知県">愛知県</option>
                <option value="三重県">三重県</option>
                <option value="滋賀県">滋賀県</option>
                <option value="京都府">京都府</option>
                <option value="大阪府">大阪府</option>
                <option value="兵庫県">兵庫県</option>
                <option value="奈良県">奈良県</option>
                <option value="和歌山県">和歌山県</option>
                <option value="鳥取県">鳥取県</option>
                <option value="島根県">島根県</option>
                <option value="岡山県">岡山県</option>
                <option value="広島県">広島県</option>
                <option value="山口県">山口県</option>
                <option value="徳島県">徳島県</option>
                <option value="香川県">香川県</option>
                <option value="愛媛県">愛媛県</option>
                <option value="高知県">高知県</option>
                <option value="福岡県">福岡県</option>
                <option value="佐賀県">佐賀県</option>
                <option value="長崎県">長崎県</option>
                <option value="熊本県">熊本県</option>
                <option value="大分県">大分県</option>
                <option value="宮崎県">宮崎県</option>
                <option value="鹿児島県">鹿児島県</option>
                <option value="沖縄県">沖縄県</option>
            </select>
        </div>
        <div class="col-span-4">
            <Input class="w-full" placeholder="市区町村・番地" v-model="address2" />
        </div>
        <div class="col-span-4">
            <Input class="w-full" placeholder="マンション・建物名" v-model="address3" />
        </div>
    </div>
</template>

<script setup>
const zipcode = defineModel('zipcode');
const address1 = defineModel('address1');
const address2 = defineModel('address2');
const address3 = defineModel('address3');

const searchAddress = async () => {
    if(zipcode.value.length === 7){
        const res = await fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + zipcode.value, {
            method: 'GET',
        });
        res.json().then((data) => {
            if(data.results == null){
                return
            }else{
                address1.value = data.results[0].address1;
                address2.value = data.results[0].address2 + data.results[0].address3;
            }
        });
    }
}
</script>