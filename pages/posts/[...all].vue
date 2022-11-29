<template>
  <div>
    <ContentDoc v-slot="{ doc }">
      <ContentRenderer :value="doc" />

      <Copyright />

      <div class="pagination">
        <div v-if="pagination.prev" class="action">
          <div class="title">
            上一篇
          </div>
          <NuxtLink class="to" :to="pagination.prev._path">
            {{ pagination.prev.title }}
          </NuxtLink>
        </div>

        <div v-if="pagination.next" class="action">
          <div class="title">
            下一篇
          </div>
          <NuxtLink class="to" :to="pagination.next._path">
            {{ pagination.next.title }}
          </NuxtLink>
        </div>
      </div>

      <Comments />
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">

type PageActionOptions = {
  title: string,
  _path: string
}

const pagination = reactive<{ prev: PageActionOptions, next: PageActionOptions }>({
  prev: { title: '', _path: '' },
  next: { title: '', _path: '' }
});

const route = useRoute();

onMounted(() => {
  getPrevAndNext(route.params.all as string[]);
});

const getPrevAndNext = async (current: string[]) => {
  const [before, after] = await queryContent('posts')
    .where({ isTalk: { $not: true } })
    .only(['title', '_path'])
    .sort({ date: 1 })
    .findSurround(`/posts/${current.join('/')}`);

  console.log(before, after);

  [pagination.prev, pagination.next] = [before, after] as any;
};

</script>

<style lang="less" scoped>

.pagination {
  margin-top: 3rem;
  text-align: center;
  .action {
    margin-bottom: 1.4rem;
    .to {
      display: inline-block;
      margin-top: 0.5rem;
      color: #000;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}
</style>
