<template>
  <article class="about heti">
    <p>先给自己贴点标签</p>
    <div v-if="about" class="about__tags">
      <fe-tag v-for="(tag, i) in about.frontmatter.me" :key="i" :text="tag" />
    </div>
    <about-content ref="about" />
  </article>
</template>

<script>
import { ref } from 'vue';
import AboutContent from '../components/md/about.md';

export default {
  components: { AboutContent },
  setup() {
    const about = ref();
    return { about };
  },
};
</script>

<style lang="less">
.about {
  padding: 0 1rem;

  &__tags {
    .fect-tag {
      margin: 0 0.5rem 0.5rem 0;
    }
  }
}
</style>
