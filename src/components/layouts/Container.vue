<script setup lang="ts">
import ProfileHeader from './ProfileHeader.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

const props = withDefaults(defineProps<{
  hideProfile?: boolean
}>(), { hideProfile: false })

const Colors = {
  Primary: '#58b99d'
};

const cssVars = {
  linkColor: Colors.Primary,
  FectLinkColor: Colors.Primary,
  linkHoverColor: Colors.Primary,
  FectCodeColor: '#5a5a5f'
};
</script>

<template>
  <fe-theme-provide :vars="cssVars">
    <Header />
    <!-- <ProfileHeader v-if="!props.hideProfile"/> -->
    <main class="container">
      <slot />
    </main>
    <Footer />
  </fe-theme-provide>
</template>

<style>
main {
  min-height: calc(100vh - var(--h-header) - var(--h-footer));
  padding: 0 1.4rem;
}
</style>
