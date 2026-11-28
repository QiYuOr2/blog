<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { colorModeEffect, Mode } from "@/features/theme/color-mode";

const modes = [
  { icon: "i-mingcute:sun-line", mode: Mode.Light, label: "浅色模式" },
  { icon: "i-mingcute:computer-line", mode: Mode.System, label: "跟随系统" },
  { icon: "i-mingcute:moon-line", mode: Mode.Dark, label: "深色模式" },
];
const colorMode = colorModeEffect();
const wrapper = ref<HTMLDivElement>();
const buttons = ref<HTMLButtonElement[]>([]);
const mode = ref<Mode>(Mode.System);
const active = ref(false);
const sliderX = ref(4);

let stopFollowSystem: (() => void) | null = null;

function syncSlider(targetMode: Mode = mode.value) {
  const index = modes.findIndex((item) => item.mode === targetMode);
  const button = buttons.value[index];
  if (button?.parentElement) {
    sliderX.value =
      button.getBoundingClientRect().left - button.parentElement.getBoundingClientRect().left;
  }
}

function setActive(value: boolean) {
  if (active.value === value) return;
  if (value) syncSlider();
  active.value = value;
}

function onPointerEnter(event: PointerEvent) {
  if (event.pointerType === "mouse") {
    setActive(true);
  }
}

function onPointerLeave(event: PointerEvent) {
  if (event.pointerType === "mouse") {
    setActive(false);
  }
}

function select(index: number, target: Mode) {
  if (!active.value) {
    setActive(true);
    return;
  }

  const button = buttons.value[index];
  if (button && wrapper.value) {
    sliderX.value = button.getBoundingClientRect().left - wrapper.value.getBoundingClientRect().left;
  }
  mode.value = target;
  colorMode.appendToDocument(target);
}

function onDocumentClick(event: MouseEvent) {
  if (active.value && wrapper.value && !wrapper.value.contains(event.target as Node)) {
    active.value = false;
  }
}

onMounted(() => {
  mode.value = colorMode.initial;
  syncSlider(mode.value);
  stopFollowSystem = colorMode.onFollowSystem();
  document.addEventListener("click", onDocumentClick);
});

onBeforeUnmount(() => {
  stopFollowSystem?.();
  stopFollowSystem = null;
  document.removeEventListener("click", onDocumentClick);
});
</script>
<template>
  <div
    ref="wrapper"
    :class="[
      'overflow-hidden transition-x duration-200 transform-gpu rounded-full',
      active ? 'w-23' : 'w-8 hover:w-23',
    ]"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <div
      :class="[
        'box-border w-23 bg-cool-gray-100 dark:bg-true-gray-700 p-1 flex justify-center items-center gap-1 shadow-inner text-xs text-true-gray-400 transform relative',
        active ? 'text-opacity-100' : 'text-opacity-0',
      ]"
    >
      <div
        :class="[
          'w-6 h-6 flex items-center justify-center bg-light-50 dark:(bg-dark text-light-50) rounded-full shadow absolute text-black z-99 translate-x duration-100 pointer-events-none',
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
        type="button"
        :aria-label="item.label"
        :aria-pressed="item.mode === mode"
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
