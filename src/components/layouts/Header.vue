<template>
  <header :class="['basic-header', { 'basic-header--fixed': fixed }]">
    <div class="basic-header__inner">
      <fe-grid-group justify="center" class="container--header m-auto h-full">
        <fe-grid class="h-full" :xs="4" :sm="4" :md="4" :lg="4">
          <div class="logo h-full">
            <fe-user src="https://avatars.githubusercontent.com/u/48339849" name="柒宇的博客" />
          </div>
        </fe-grid>
        <fe-grid
          justify="flex-end"
          class="h-full"
          :xs="20"
          :sm="20"
          :md="20"
          :lg="20"
        >
          <nav class="nav-bar h-full">
            <ul class="h-full">
              <li v-for="item in NavConfig" :key="item.name" class="link h-full">
                <fe-link class="h-full" :to="item.to" :color="isActive(item.name)">
                  {{ item.label }}
                </fe-link>
              </li>
            </ul>
          </nav>
        </fe-grid>
      </fe-grid-group>
    </div>
  </header>
</template>

<script setup lang="ts">
const NavConfig = [
  {
    label: '主页',
    to: '/',
    name: 'index'
  },
  {
    label: '随想',
    to: '/talk',
    name: 'talk'
  },
  {
    label: '归档',
    to: '/archives',
    name: 'archives'
  },
  {
    label: '关于',
    to: '/about',
    name: 'about'
  }
];

withDefaults(defineProps<{ fixed?: boolean }>(), {
  fixed: false
});

// const r = useRouter();

const isActive = (name: string) => {
  // return r.currentRoute.value.name === name;
  return false;
};
</script>

<style lang="less" scoped>

.basic-header {
  width: 100%;
  height: var(--h-header);

  &__inner {
    box-sizing: border-box;
    width: 100%;
    padding: 0 12px;
    height: var(--h-header);
    background: #fff;
    box-shadow: 0 0 #0000,
      0 0 #0000,
      0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1);

    .logo {
      display: flex;
      align-items: center;
    }
  }

  .nav-bar {
    ul {
      display: flex;
      margin: 0;

      .link {
        margin-bottom: 0;
        margin-left: 1.6rem;

        &::before {
          display: none;
        }
      }
    }
  }

  &--fixed {
    .basic-header__inner {
      position: fixed;
      top: 0;
      z-index: 9999;
    }
  }
}
</style>
