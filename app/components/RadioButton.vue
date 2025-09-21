<template>
    <div :class="'m-1 gap-[10px] grid grid-cols-' + items.length">
        <template v-for="(item, index) in items">
            <div class="pt-[19px] pb-[21px] rounded-full border border-1 has-[input:checked]:border-3 border-[#D9D9D9] has-[input:checked]:border-[#FF8F89]" @click="value = item">
                <div class="flex items-center justify-around">
                    <input type="radio" class="focus:ring-transparent" style="inline-size: 1.5rem; block-size: 1.5rem;" :value="item" :id="id + index" :name="name" v-model="value" />
                    <label class="font-mincho text-[20px]" :for="id + index">{{ item }}</label>
                    <div></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    id: {
        type: String,
        default: 'radios',
    },
    name: {
        type: String,
        default: 'radios',
    }
});
const value = defineModel();
</script>