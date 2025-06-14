<script lang="ts" setup>
import { colorModeEffect, Mode } from '../../common/colorMode';


const colorMode = colorModeEffect()
const mode = ref(colorMode.getCurrentMode())

function commentColorModeChange(value: Mode) {
  mode.value = value
}

colorMode.addEventListener(commentColorModeChange)
onUnmounted(() => colorMode.removeEventLister(commentColorModeChange))

</script>

<template>
  <div class="py-7 sm:w-[95%]">
    <component
      :is="'giscus-widget'"
      id="comments"
      repo="QiYuOr2/blog"
      repoid="R_kgDOGlnN5w"
      category="Announcements"
      categoryid="DIC_kwDOGlnN584COx7K"
      mapping="url"
      reactions-enabled="1"
      emitmetadata="0"
      inputposition="top"
      :theme="mode"
      lang="zh-CN"
    />
  </div>
</template>
