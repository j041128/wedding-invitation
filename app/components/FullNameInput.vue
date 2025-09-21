<template>
    <div>
        <div class="grid grid-cols-2">
            <Input class="placeholder:text-center" v-model="name" :placeholder="placeholder" :id="id" @input="handleNameInput" />
            <Input class="placeholder:text-center" v-model="kana" :placeholder="placeholder + '：かな'" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        default: 'name1',
    },
    placeholder: {
        type: String,
        default: '連名1',
    }
})
const name = defineModel('name');
const kana = defineModel('kana');

let autokanaName;

onMounted(async ()=> {
    const Autokana = await import("vanilla-autokana");
    autokanaName = Autokana.bind("#" + props.id);
});
function handleNameInput() {
    kana.value = autokanaName.getFurigana();
}
</script>