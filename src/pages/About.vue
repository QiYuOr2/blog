<template>
  <article class="about heti">
    <p>先给自己贴点标签</p>
    <div class="about__tags">
      <fe-tag v-for="(tag, i) in tags" :key="i" :text="tag" />
    </div>
    <about-content />
  </article>
</template>

<script>
const AboutContent = require('../components/mdx/about.mdx');

export default {
  components: { AboutContent: AboutContent.default },
  setup() {
    return { tags: AboutContent.me };
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
