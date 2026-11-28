<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const visible = ref(false);
const checkVisible = () => {
  visible.value = window.scrollY > 300;
};
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

onMounted(() => {
  checkVisible();
  window.addEventListener("scroll", checkVisible, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", checkVisible));
</script>

<template>
  <button
    type="button"
    aria-label="回到顶部"
    :aria-hidden="!visible"
    :tabindex="visible ? 0 : -1"
    :class="[
      visible ? 'opacity-100 z-1000 pointer-events-auto' : 'opacity-0 pointer-events-none',
      'back-top fixed bottom-8 border-0 bg-transparent p-0 text-stone cursor-pointer transition-all duration-300 hover:(text-stone-9 transition-all)',
    ]"
    @click="scrollToTop"
  >
    <div class="i-mdi:arrow-top-bold w-7 h-7 text-2xl" />
  </button>
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
