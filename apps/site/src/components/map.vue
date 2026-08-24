<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onBeforeUnmount, onMounted, ref } from "vue";
const mapRef = ref<HTMLDivElement>();
let map: mapboxgl.Map | undefined;
onMounted(() => {
  if (mapRef.value)
    map = new mapboxgl.Map({
      container: mapRef.value,
      style: "/api/mapbox/styles/v1/qiyuor2/cm8yaxquq002l01r15306f8da",
      center: [139.6917, 35.6895],
      zoom: 10,
    });
});
onBeforeUnmount(() => map?.remove());
</script>
<template><div ref="mapRef" /></template>
