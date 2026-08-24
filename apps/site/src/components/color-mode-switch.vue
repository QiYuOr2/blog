<script setup lang="ts">
import { ref } from "vue";
import { colorModeEffect, Mode } from "@/features/theme/color-mode";

const modes = [
  { icon: "i-mingcute:sun-line", mode: Mode.Light },
  { icon: "i-mingcute:computer-line", mode: Mode.System },
  { icon: "i-mingcute:moon-line", mode: Mode.Dark },
];
const colorMode = colorModeEffect();
colorMode.onFollowSystem();
const wrapper = ref<HTMLDivElement>();
const buttons = ref<HTMLButtonElement[]>([]);
const mode = ref(colorMode.initial);
const active = ref(false);
const sliderX = ref(4);

let timeLock = false;

function setActive(value: boolean) {
  if (active.value === value) return;

  const button = buttons.value[modes.findIndex((item) => item.mode === mode.value)];

  if (button?.parentElement)
    sliderX.value =
      button.getBoundingClientRect().left - button.parentElement.getBoundingClientRect().left;

  timeLock = true;
  setTimeout(() => (timeLock = false), 200);
  active.value = value;
}

function select(index: number, target: Mode) {
  if (timeLock || !wrapper.value) return;

  const button = buttons.value[index];
  sliderX.value = button.getBoundingClientRect().left - wrapper.value.getBoundingClientRect().left;
  mode.value = target;
  colorMode.appendToDocument(target);
}
</script>
<template>
  <div
    ref="wrapper"
    class="w-8 hover:w-23 overflow-hidden transition-x duration-200 transform-gpu rounded-full"
    @mouseover="setActive(true)"
    @mouseleave="setActive(false)"
  >
    <div
      :class="[
        'box-border w-23 bg-cool-gray-100 dark:bg-true-gray-700 p-1 flex justify-center items-center gap-1 shadow-inner text-xs text-true-gray-400 transform relative',
        active ? 'text-opacity-100' : 'text-opacity-0',
      ]"
    >
      <div
        :class="[
          'w-6 h-6 flex items-center justify-center bg-light-50 dark:(bg-dark text-light-50) rounded-full shadow absolute text-black z-99 translate-x duration-100',
          active ? 'left-$status-x' : 'left-1',
        ]"
        :style="{ '--status-x': `${sliderX}px` }"
      >
        <div
          v-for="item in modes"
          v-show="item.mode === mode"
          :key="item.mode"
          :class="`${item.icon} w-4 h-4`"
        />
      </div>
      <button
        v-for="(item, index) in modes"
        :key="item.mode"
        :ref="
          (el) => {
            if (el) buttons[index] = el as HTMLButtonElement;
          }
        "
        class="w-6 h-6 flex items-center justify-center relative before:content-[''] before:(absolute top-0 left-0 right-0 bottom-0)"
        @click="select(index, item.mode)"
      >
        <div :class="`${item.icon} w-4 h-4`" />
      </button>
    </div>
  </div>
</template>
