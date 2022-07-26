<template>
  <footer class="footer">
    <div class="footer__copyright">QIYUOR2 © 2022</div>
    <div class="footer__links">
      <github
        class="icon"
        size="16"
        @click="toOut('https://github.com/QiYuOr2')"
      />
      <rss class="icon" size="16" @click="toOut('/rss')" />
    </div>
  </footer>
</template>

<script>
import { Github, Rss } from '@fect-ui/vue-icons';
import { useNav } from '../composables';

export default {
  components: { Github, Rss },
  setup() {
    const { toOut } = useNav();

    return {
      toOut,
    };
  },
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
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: var(--color-primary) !important;
        transition: color 0.3s;
      }
    }
  }
}
</style>
