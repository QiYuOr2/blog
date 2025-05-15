<script setup lang="ts">
import MdiImageOff from '~icons/mdi/image-off';

defineProps<{
  src: string
  width: string
  height?: string
  alt?: string
  round?: boolean
}>()

const isError = ref(false)

function handleError() {
  isError.value = true
}

</script>

<template>
  <div bg-stone-1 :rounded="round ? 'full' : 'sm'" overflow-hidden flex justify-center items-center border border-stone-2 :style="{ width, height }">
    <img v-if="!isError" :src="src" :alt="alt" @error="handleError" />
    <div v-else flex flex-col justify-center items-center text-stone>
      <MdiImageOff />
      <span text-xs>{{ alt }}</span>
    </div>
  </div>
</template>