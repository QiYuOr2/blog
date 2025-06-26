<template>
  <header class="flex pt-10 py-8 mx-auto text-true-gray-800 dark:text-white relative">
    <a href="/">
      <Image src="https://avatars.githubusercontent.com/u/48339849" width="88px" height="88px" alt="avatar" round />
    </a>
    <div class="ml-6 flex-1 flex flex-col gap-1">
      <div class="flex items-center">
        <a href="/">
            <h1 class="text-xl font-bold">柒宇</h1>
        </a>
        <div class="flex items-center ml-auto">
          <a class="sm:(static h-unset) absolute bottom-7 right-7 h-8" href="/rss.xml" aria-label="RSS">
            <div class="i-mdi:rss w-6 h-6 text-xl" />
          </a>
        </div>
      </div>
      <div class="text-true-gray-500 text-sm">前端开发 / 动画 / 日语初心者</div>

      <div class="text-xl mt-auto flex items-center gap-2">
        <a  href="https://github.com/QiYuOr2" aria-label="GitHub">
          <div class="i-mdi:github w-6 h-6"  />
        </a>
        <a href="https://space.bilibili.com/10980643" aria-label="Bilibili">
          <div class="i-mingcute:bilibili-fill w-6 h-6"  />
        </a>

        <div class="ml-0 sm:ml-auto">
          <slot></slot>
        </div>
      </div>
    </div>

  </header>
</template>