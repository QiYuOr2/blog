<script lang="ts" setup>
import MingcuteSunLine from '~icons/mingcute/sun-line';
import MingcuteComputerLine from '~icons/mingcute/computer-line';
import MingcuteMoonLine from '~icons/mingcute/moon-line';
import { Mode, colorModeEffect } from '../../common/colorMode';

const modes = [
  {
    icon: MingcuteSunLine,
    mode: Mode.Light
  },
  {
    icon: MingcuteComputerLine,
    mode: Mode.System
  },
  {
    icon: MingcuteMoonLine,
    mode: Mode.Dark
  }
]

const colorMode = colorModeEffect()
const mode = ref(colorMode.initial)

colorMode.onFollowSystem()

const switchWrapper = ref<HTMLDivElement>()
const buttons = ref<HTMLButtonElement[]>([])

const sliderX = ref(4)
const isActive = ref(false)

function setIsActive(value: boolean) {
  if (isActive.value === value) {
    return
  }

  if (true) {
    const matchIndex = modes.findIndex(item => item.mode === mode.value)
    const targetButton = buttons.value[matchIndex]
    const parent = targetButton.parentElement!
    const x = targetButton.getBoundingClientRect().left - parent.getBoundingClientRect().left
    sliderX.value = x
  }

  timeoutTimeLock()
  isActive.value = value
}

const timeLock = ref(false)
function timeoutTimeLock() {
  timeLock.value = true
  setTimeout(() => {
    timeLock.value = false
  }, 200);
}

function handleSwitchClick(event: MouseEvent, targetMode: Mode) {
  if (timeLock.value) {
    return
  }

  const targetElement = event.target as Element
  const parent = targetElement.parentElement!
  const parentRect = parent.getBoundingClientRect()
  const rect = targetElement.getBoundingClientRect()
  sliderX.value = rect.left - parentRect.left
  mode.value = targetMode
  colorMode.appendToDocument(targetMode)
}
</script>

<template>
  <div
    ref="switchWrapper"
    class="w-8 hover:w-23 overflow-hidden transition-x duration-200 transform-gpu rounded-full"
    @mouseover="setIsActive(true)"
    @mouseleave="setIsActive(false)"
  >
    <div
      :class="`box-border w-23 bg-cool-gray-100 dark:bg-true-gray-700 p-1 flex justify-center items-center gap-1 shadow-inner text-xs text-true-gray-400  transform relative  ${isActive ? 'text-opacity-100' : 'text-opacity-0'}`"
      :style="{ '--status-x': `${sliderX}px` }">
      <div
        :class="`w-6 h-6 flex items-center justify-center bg-light-50 dark:bg-dark dark:text-light-50 rounded-full shadow absolute text-black ${isActive ? 'left-$status-x' : 'left-1'} z-99 translate-x duration-100`">

        <template v-for="item in modes">
          <component :is="item.icon" v-if="item.mode === mode"></component>
        </template>
      </div>

      <button v-for="item in modes" ref="buttons" class="w-6 h-6 flex items-center justify-center relative before:content-['']"
        before="absolute top-0 left-0 right-0 bottom-0" @click="handleSwitchClick($event, item.mode)">
        <component :is="item.icon"></component>
      </button>
    </div>
  </div>
</template>