<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const visible = ref(false);
const checkVisible = () => {
  visible.value = window.scrollY > 300;
};
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

onMounted(() => window.addEventListener("scroll", checkVisible));
onBeforeUnmount(() => window.removeEventListener("scroll", checkVisible));
</script>

<template>
  <div
    :class="[
      visible ? 'opacity-100' : 'opacity-0',
      'fixed bottom-8 right-8 text-2xl text-stone cursor-pointer transition-all duration-300 hover:(text-stone-9 transition-all)',
    ]"
    @click="scrollToTop"
  >
    <div class="i-mdi:arrow-top-bold w-7 h-7" />
  </div>
</template>
