<template>
  <footer class="container mx-auto footer">
    <div>
      <a class="link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
        CC BY-NC-SA 4.0
      </a>
      <span class="author">2019-PRESENT © </span>
      <a class="link" href="https://github.com/QiYuOr2">
        QiYuOr2
      </a>
    </div>
    <div>
      <span>Powered By </span>
      <a class="link" href="https://github.com/QiYuOr2/blog">
        QiYu Blog
      </a>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  box-sizing: border-box;
  padding-top: 20px;
  height: var(--h-footer);
  font-size: 0.8rem;
  color: #a6a6a6;

  div {
    margin: 0 auto;
    margin-bottom: 0.8rem;
    text-align: center;

    .author {
      margin-left: 6px;
    }
  }

  .link {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;

      height: 1px;
      background: #ececec;
    }
  }
}
</style>
