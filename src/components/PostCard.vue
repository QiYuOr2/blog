<script setup lang="ts">
import { computed } from 'vue';
import FluentArrowUpRight20Filled from '~icons/fluent/arrow-up-right-20-filled';

const props = defineProps<{
  title: string
  path: string
  summary?: string
  date: string,
  tags?: string | string[]
  big?: boolean
  isExternal?: boolean
}>();

const selfTags = computed(() => Array.isArray(props.tags) ? props.tags.slice(0, 2) : [props.tags]);
</script>


<template>
  <a  :href="path" :target="isExternal ? '_blank' : '_self'" no-underline>
    <li list-none :class="['post-card', big ? '' : 'post-card--line']">
      <template v-if="big">
        <div class="post-card__title">
          {{ title }}
        </div>
        <div v-if="summary" class="post-card__summary">
          {{ summary }}
        </div>
        <div class="post-card__footer">
          <div class="date">
            {{ date.split(' ')[0].replace(/\//g, '-') }}
          </div>
          <template v-if="Array.isArray(tags) ? tags.length > 0 : tags">
            <div class="dot" />
            <div v-for="tag, i in selfTags" :key="tag" class="tag">
              <span>{{ tag }}</span>
              <span v-if="i < selfTags.length - 1">&nbsp;/&nbsp;</span>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="post-card__title">
          <div>{{ title }}</div>
          <FluentArrowUpRight20Filled v-if="isExternal" class="external-icon" />
        </div>
        <div class="post-card__footer">
          <div class="date">
            {{ date.split(' ')[0].split('/').slice(1).join('/') }}
          </div>
        </div>
      </template>
    </li>
  </a>
</template>


<style lang="less" scoped>
.post-card {
  display: block;
  padding: 1rem 1.25rem;
  margin: 0.5rem -1.25rem;
  border: 1px solid #fff;
  transition: all 0.3s;
  cursor: pointer;

  --post-card-main-color: rgb(33, 41, 35);
  --post-card-sec-color: rgba(33, 41, 35, 0.6);
  --post-card-tag-color: rgba(33, 41, 35, 0.4);

  &:hover {
    border-color: var(--post-card-tag-color);
    transition: all 0.3s;
  }

  &__title {
    margin: 0px;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.5;
    color: var(--post-card-main-color);
    text-decoration: none;
  }

  &__summary {
    margin: 0.25rem 0px;
    font-weight: 400;
    font-size: 0.9rem;
    color: var(--post-card-sec-color);
  }

  &__footer {
    display: flex;
    align-items: center;

    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.5;
    color: var(--post-card-tag-color);
  }

  .dot {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    background-color: var(--post-card-tag-color);
    margin: 0px 0.5rem;
    vertical-align: middle;
    text-align: center;
  }

  &--line {
    display: flex;
    gap: .5rem;
    padding: .5rem 1.25rem;

    .post-card__title {
      display: flex;
      color: var(--post-card-sec-color);
      transition: all 0.3s;
      font-weight: normal;
      font-size: 1.1rem;

      .external-icon {
        margin-left: .3rem;
        font-size: .6rem;
        color: var(--post-card-tag-color);
      }
    }

    .post-card__footer {
      font-size: .875rem;
    }


    &:hover {
      border-color: white;

      .post-card__title {
        color: var(--post-card-main-color);
        transition: all 0.3s;
      }
    }
  }


}

@media screen and (max-width: 800px) {
  .post-card--line {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
