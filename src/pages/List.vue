<template>
  <div class="posts-list">
    <ul>
      <li v-for="(post, i) in list" :key="i">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { importAll, omit } from '../common/utils';

const posts = importAll(require.context('../posts', false, /\.mdx$/)).map(
  omit('default')
);

export default {
  setup() {
    const list = reactive(posts);

    return {
      list,
    };
  },
};
</script>

<style>
.posts-list {
}
</style>
