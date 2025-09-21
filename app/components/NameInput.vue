<template>
    <div>
        <div class="grid grid-cols-2">
            <Input id="name_first" v-model="first" class="placeholder:text-center" placeholder="姓" @input="handleFirstNameInput" />
            <Input id="name_last" v-model="last" class="placeholder:text-center" placeholder="名" @input="handleLastNameInput" />
        </div>
        <div class="grid grid-cols-2">
            <Input v-model="firstkana" class="placeholder:text-center" placeholder="姓：かな" />
            <Input v-model="lastkana" class="placeholder:text-center" placeholder="名：かな" />
        </div>
    </div>
</template>

<script setup>
const first = defineModel('first');
const last = defineModel('last');
const firstkana = defineModel('firstkana');
const lastkana = defineModel('lastkana');

let autokanaFirst;
let autokanaLast;

onMounted(async ()=> {
    const Autokana = await import("vanilla-autokana");
    autokanaFirst = Autokana.bind("#name_first");
    autokanaLast = Autokana.bind("#name_last");
});
function handleFirstNameInput() {
    firstkana.value = autokanaFirst.getFurigana();
}
function handleLastNameInput() {
    lastkana.value = autokanaLast.getFurigana();
}
</script>