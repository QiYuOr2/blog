<script setup lang="ts">
const backTop = () => {
  scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const isVisible = ref(false);

function checkVisible() {
  isVisible.value = window.scrollY > 300;
}

onMounted(() => {
  window.addEventListener('scroll', checkVisible);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkVisible)
});
</script>

<template>
  <Transition>
    <div v-if="isVisible" fixed bottom-8 right-8 text-2xl text-stone cursor-pointer transition-all duration-300
      hover="text-stone-9 transition-all" @click="backTop">
      <div class="i-mdi:arrow-top-bold w-7 h-7" />
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>