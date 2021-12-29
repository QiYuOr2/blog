<template>
  <header class="nav-bar">
    <div class="nav-bar__info">
      <div class="profile">
        <img class="profile__logo" :src="LOGO_LINK" />
        <h1 class="profile__title">柒宇的博客</h1>
      </div>
      <fe-button size="mini" auto @click="setDark">
        <template #icon>
          <moon v-if="!dark" />
          <sun v-else />
        </template>
      </fe-button>
    </div>
    <nav class="nav-bar__links">
      <ul>
        <li :class="['link', { active: isActive('list') }]">
          <router-link to="/">主页</router-link>
        </li>
        <li :class="['link', { active: isActive('archives') }]">
          <router-link to="archives">归档</router-link>
        </li>
        <li :class="['link', { active: isActive('links') }]">
          <router-link to="links">链接</router-link>
        </li>
        <li :class="['link', { active: isActive('about') }]">
          <router-link to="about">关于</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { Moon, Sun } from '@fect-ui/vue-icons';
import { useRouter } from 'vue-router';

const LOGO_LINK =
  'https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/pixelartoc_1.png';

export default {
  components: { Moon, Sun },
  setup() {
    const dark = ref(false);
    const setDark = () => {
      dark.value = !dark.value;
    };

    const r = useRouter();
    const isActive = (name) => {
      return r.currentRoute.value.name === name;
    };

    return {
      LOGO_LINK,
      dark,
      setDark,
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
        margin-right: 1rem;
        border-radius: 50%;
      }

      &__title {
        font-size: 1.5rem;
      }
    }
  }

  &__links {
    margin-top: 2rem;

    ul {
      display: flex;
      margin-left: 0.55rem;

      .link {
        margin-right: 0.5rem;
        & a {
          padding: 0.45rem 0.75rem;
          background: #fff;
          border-radius: var(--size-radius);

          font-size: 1.2rem;
          color: var(--color-text);

          transition: background 0.3s;

          &:hover {
            background: var(--color-hover);

            transition: background 0.3s;
          }
        }
        &.active a {
          background: var(--color-hover);

          transition: background 0.3s;
        }
      }
    }
  }
}
</style>
