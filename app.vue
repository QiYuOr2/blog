<template>
  <fe-theme-provide :vars="cssVars">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <BackTop />
  </fe-theme-provide>
</template>

<script setup lang="ts">
import '@fect-ui/themes';
import '@fect-ui/vue/dist/cjs/main.css';
import 'nprogress/nprogress.css';

onMounted(() => {
  (window as any).WebFont.load({
    google: {
      families: ['Noto Serif SC:wght@300;400;600;900&display=swap']
    }
  });
});

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

<style lang="less">
:root {
  --h-header: 52px;
  --h-footer: 120px;

  --primary-selection: #bbd6fb;
}

body {
  // ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, 'Noto Serif SC', serif, Consolas,Liberation Mono,monospace;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  a {
    color: #000;
  }
}

h1 {
  font-size: 1.8rem;
}

h2 {
  font-size: 1.6rem;
}

h3 {
  font-size: 1.4rem;
}

h4 {
  font-size: 1.2rem;
}

.h-full {
  height: 100% !important;
}

.m-auto {
  margin: 0 auto !important;
}

.container {
  max-width: 45rem;
  margin: 0 auto;

  &--header {
    max-width: 55rem;
  }
}

#nprogress .bar {
  background: #58b99d;
}
</style>
