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
      visible ? 'opacity-100 z-1000' : 'opacity-0',
      'back-top fixed bottom-8 text-stone cursor-pointer transition-all duration-300 hover:(text-stone-9 transition-all)',
    ]"
    @click="scrollToTop"
  >
    <div class="i-mdi:arrow-top-bold w-7 h-7 text-2xl" />
  </div>
</template>

<style>
.back-top {
  right: 2rem;
}

@media screen and (min-width: 1280px) {
  .back-top {
    right: calc((100vw - 65ch) / 2 - 4rem);
  }
}
</style>
