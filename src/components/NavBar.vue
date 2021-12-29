<template>
  <header class="nav-bar">
    <div class="nav-bar__info">
      <div>柒宇</div>
      <fe-button size="mini" auto>
        <template #icon>
          <moon />
        </template>
      </fe-button>
    </div>
    <nav class="nav-bar__links">
      <ul>
        <li class="link"><router-link to="/">主页</router-link></li>
        <li class="link"><router-link to="archives">归档</router-link></li>
        <li class="link"><router-link to="links">链接</router-link></li>
        <li class="link"><router-link to="about">关于</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { Moon } from '@fect-ui/vue-icons';

export default {
  components: {
    Moon,
  },
  setup() {},
};
</script>

<style>
.nav-bar {
  margin: 2.5rem 0 4.5rem 0;
}

.nav-bar .nav-bar__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar .nav-bar__links {
  margin-top: 2rem;
  margin-left: -1rem;
}

.nav-bar .nav-bar__links ul {
  display: flex;
}

.nav-bar .nav-bar__links ul .link a {
  padding: 0.75rem 1rem;
  background: #fff;
  border-radius: var(--size-radius);
  
  font-size: 1.2rem;
  color: var(--color-text);
  
  transition: background 0.3s;
}
.nav-bar .nav-bar__links ul .link a:hover {
  background: var(--color-hover);

  transition: background 0.3s;
}
</style>
