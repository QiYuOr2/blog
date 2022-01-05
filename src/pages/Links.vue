<template>
  <div class="links">
    <fe-grid-group :gap="2">
      <fe-grid v-for="i in 6" :xs="24" :sm="12" :key="i">
        <friend-card />
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script>
import FriendCard from '../components/FriendCard.vue';

export default {
  components: { FriendCard },
  setup() {
  },
};
</script>

<style lang="less">
.links {
  padding: 0 1rem;
}
</style>
