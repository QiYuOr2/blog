<script setup lang="ts">
import { date, type Post } from '../collections/posts';
import { isExternalPost, type ExternalPost } from '../externals';


defineProps<{
  posts: (ExternalPost & Post)[]
}>()
</script>

<template>
  <div>
    <PostCard
      v-for="post in posts"
      :title="post.title"
      :path="post.link"
      :summary="post.description"
      :date="date(post as any)"
      :tags="post.tags"
      :isExternal="isExternalPost(post)"
    />
  </div>
</template>