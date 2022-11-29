<template>
  <article class="post-card" @click="to(path)">
    <div class="post-card__title">
      {{ title }}
    </div>
    <div v-if="summary" class="post-card__summary">
      {{ summary }}
    </div>
    <div class="post-card__footer">
      <div class="date">
        {{ date.split(' ')[0].replaceAll('/', '-') }}
      </div>
      <template v-if="Array.isArray(tags) ? tags.length > 0 : tags">
        <div class="dot" />
        <div v-for="tag, i in selfTags" :key="tag" class="tag">
          <span>{{ tag }}</span>
          <span v-if="i < selfTags.length - 1">&nbsp;/&nbsp;</span>
        </div>
      </template>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  path: string
  summary?: string
  date: string,
  tags?: string | string[]
}>();

const selfTags = computed(() => Array.isArray(props.tags) ? props.tags.slice(0, 2) : [props.tags]);

const to = (path: string) => {
  useRouter().push(path);
};
</script>

<style lang="less" scoped>
.post-card {
  padding: 1rem 1.25rem;
  margin: 0.5rem -1.25rem;
  border: 1px solid #fff;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    border-color: #868e96;
    transition: all 0.3s;
  }

  &__title {
    margin: 0px;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.5;
    color: #212529;
    text-decoration: none;
  }

  &__summary {
    margin: 0.25rem 0px;
    font-weight: 400;
    font-size: 0.9rem;
    color: #495057;
  }

  &__footer {
    display: flex;
    align-items: center;

    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.5;
    color: #868e96;
  }

  .dot {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    background-color: #868e96;
    margin: 0px 0.5rem;
    vertical-align: middle;
    text-align: center;
  }
}
</style>
