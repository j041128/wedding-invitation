<template>
    <div
        ref="mapRef"
        class="w-full aspect-video"
    >
    </div>
</template>

<script setup lang="ts">
type Position = { lat: number, lng: number }

const props = defineProps<{
    position: Position
    zoom?: number
    name?: string
}>();

const config = useRuntimeConfig();

const mapRef = ref<HTMLElement | null>(null)

const {onLoaded} = useScriptGoogleMaps({
    apiKey: config.public.scripts.googleMaps.apiKey,
});

onMounted(() => {
    // Google Maps の読み込みが完了したら実行
    onLoaded(async (instance) => {
        if (!mapRef.value) {
            return;
        }

        // Google Maps API モジュールを取得
        const maps = await instance.maps
        // MapsLibrary から Map クラスを取得
        const { Map } = await maps.importLibrary('maps') as google.maps.MapsLibrary

        // Google Map のインスタンスを生成して DOM に描画
        const map = new Map(mapRef.value, {
            center: props.position,
            zoom: props.zoom ?? 8,
            mapId: config.public.googleMaps.mapId,
        });

        const marker = new maps.Marker({
            position: props.position,
            map: map,
            title: props.name,
        })
    });
});
</script>