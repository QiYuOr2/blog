<script lang="ts" setup>
import MdiGithub from '~icons/mdi/github';
import MdiRss from '~icons/mdi/rss';
import MingcuteBilibiliFill from '~icons/mingcute/bilibili-fill';
</script>

<template>
  <header class="flex pt-10 py-8 mx-auto text-true-gray-800 dark:text-white relative">
    <a href="/">
      <Image src="https://avatars.githubusercontent.com/u/48339849" width="88px" height="88px" alt="avatar" round />
    </a>
    <div class="ml-6 flex-1 flex flex-col gap-1">
      <div class="flex items-center">
        <a href="/">
            <div class="text-xl font-bold">柒宇</div>
        </a>
        <div class="flex items-center ml-auto">
          <a class="sm:static absolute bottom-10 right-7 h-7" href="/rss.xml" aria-label="RSS">
            <MdiRss text-xl />
          </a>
        </div>
      </div>
      <div class="text-true-gray-500 text-sm">前端开发 / 动画 / 日语初心者</div>

      <div class="text-xl mt-auto flex items-center gap-2">
        <a  href="https://github.com/QiYuOr2" aria-label="GitHub">
          <MdiGithub  />
        </a>
        <a href="https://space.bilibili.com/10980643" aria-label="Bilibili">
          <MingcuteBilibiliFill  />
        </a>

        <div class="ml-0 sm:ml-auto">
          <slot></slot>
        </div>
      </div>
    </div>

  </header>
</template>