<template>
  <ContentDoc v-slot="{ doc }">
    <ContentRenderer :value="doc" />

    <Comments />
  </ContentDoc>
</template>
