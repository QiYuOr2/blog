<template>
  <header class="nav-bar">
    <div class="nav-bar__info">
      <div class="profile">
        <fe-avatar class="profile__logo" :src="LOGO_LINK" />
        <h1 class="profile__title">柒宇的博客</h1>
      </div>
      <fe-button size="small" auto @click="themeChange">
        <template #icon>
          <moon v-if="theme === 'light-theme'" />
          <sun v-else />
        </template>
      </fe-button>
    </div>
    <nav class="nav-bar__links">
      <ul>
        <li class="link">
          <fe-link to="/" block :color="isActive('list')">主页</fe-link>
        </li>
        <li class="link">
          <fe-link to="/talk" block :color="isActive('talk')">随想</fe-link>
        </li>
        <li class="link">
          <fe-link to="/archives" block :color="isActive('archives')">归档</fe-link>
        </li>
        <li class="link">
          <fe-link to="/about" block :color="isActive('about')">关于</fe-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useTheme } from "@fect-ui/vue";
import { Moon, Sun } from "@fect-ui/vue-icons";
import { useRouter } from "vue-router";

const LOGO_LINK = "https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/pixelartoc_1.png";

export default {
  components: { Moon, Sun },
  setup() {
    const { theme, themeChange } = useTheme();

    const r = useRouter();
    const isActive = (name) => {
      return r.currentRoute.value.name === name;
    };

    return {
      LOGO_LINK,
      theme,
      themeChange,
      isActive,
    };
  },
};
</script>

<style lang="less">
.nav-bar {
  margin: 2.5rem 0 3rem 0;
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-left: 1rem;

    .profile {
      display: flex;
      align-items: center;
      &__logo {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }

      &__title {
        padding-left: 1rem;
        font-size: 1.5rem;
      }
    }
  }

  &__links {
    margin-top: 1.5rem;

    ul {
      display: flex;
      margin: 0;

      .link {
        margin-right: 0.5rem;
        font-weight: bold;

        .fect-link--block {
          padding-left: 12px;
          padding-right: 12px;
          font-size: var(--size-text-navbar);

          &:hover {
            background-color: var(--color-hover);
          }

          &.color {
            background-color: var(--color-hover);
          }
        }
      }
    }
  }
}

@media screen and (min-width: 300px) and (max-width: 650px) {
  .nav-bar {
    margin: 2.5rem 0 2rem 0;
    &__links {
      margin-top: 1rem;
    }
  }
}
</style>
