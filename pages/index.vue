<template>
  <div class="index">
    <div class="index__posts">
      <ContentList v-slot="{ list }" :query="query" path="/posts">
        <PostCard
          v-for="post in list"
          :key="post._path"
          :title="post.title!"
          :path="post._path!"
          :summary="post.summary"
          :date="post.date"
          :tags="post.tags"
        />
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">

useHead({ title: '@柒宇' });

const query = { where: { isTalk: { $not: true } }, sort: { date: -1 } };

</script>

<style lang="less" scoped>

</style>
