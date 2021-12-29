<template>
  <footer class="footer">
    <div class="footer__copyright">QIYUOR2 © 2021</div>
    <div class="footer__links">
      <github class="icon" size="16" />
      <rss class="icon" size="16" />
    </div>
  </footer>
</template>

<script>
import { Github, Rss } from '@fect-ui/vue-icons';

export default {
  components: { Github, Rss },
  setup() {},
};
</script>

<style lang="less">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 5rem 1rem 2.5rem 1rem;
  &__links {
    .icon {
      margin-left: 1rem;
    }
  }
}
</style>
