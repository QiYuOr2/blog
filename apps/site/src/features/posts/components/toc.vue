<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import "@/styles/toc.css";

const props = defineProps<{
  headings: { depth: number; slug: string; text: string }[];
}>();

const minDepth = computed(() =>
  props.headings.length
    ? Math.min(...props.headings.map((heading) => heading.depth))
    : 0,
);

const activeSlug = ref("");
const open = ref(false);
let ticking = false;

const updateActiveHeading = () => {
  if (!props.headings.length) return;

  let current = props.headings[0].slug;
  const offset = 96;

  for (const heading of props.headings) {
    const target = document.getElementById(heading.slug);
    if (!target) continue;

    if (target.getBoundingClientRect().top <= offset) {
      current = heading.slug;
    } else {
      break;
    }
  }

  const documentBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  if (documentBottom) {
    current = props.headings[props.headings.length - 1].slug;
  }

  activeSlug.value = current;
};

const onScroll = () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateActiveHeading();
    ticking = false;
  });
};

const onLinkClick = (event: MouseEvent, slug: string) => {
  const target = document.getElementById(slug);
  if (!target) return;

  event.preventDefault();
  activeSlug.value = slug;
  open.value = false;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${slug}`);
};

const toggleOpen = () => {
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

onMounted(() => {
  updateActiveHeading();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<template>
  <button
    v-if="headings.length"
    class="toc-fab"
    :class="{ 'toc-fab--hidden': open }"
    type="button"
    :aria-expanded="open"
    aria-label="打开文章目录"
    @click="toggleOpen"
  >
    <span class="toc-fab__icon i-mingcute:list-collapse-line" aria-hidden="true"></span>
  </button>

  <div v-if="open" class="toc-backdrop" @click="close"></div>

  <aside
    v-if="headings.length"
    class="toc"
    :class="{ 'toc--open': open }"
    aria-label="文章目录"
  >
    <div class="toc__mobile-header">
      <span class="toc__mobile-title">目录</span>
      <button class="toc__close" type="button" aria-label="关闭目录" @click="close">
        <span class="i-mingcute:close-line" aria-hidden="true"></span>
      </button>
    </div>
    <ul class="pl-0">
      <p class="mb-[0.2rem] toc__desktop-title">目录</p>
      <li
        v-for="heading in headings"
        :key="heading.slug"
        class="toc__archor"
        :class="[
          `toc__archor--${heading.depth - minDepth}`,
          { 'toc__archor--active': heading.slug === activeSlug },
        ]"
      >
        <a
          class="no-underline border-b border-warm-gary-400 transition-all duration-300 text-warm-gray-400 hover:(text-dark border-black) dark:border-warm-gray-500 dark:hover:(text-white border-white)"
          :href="`#${heading.slug}`"
          @click="onLinkClick($event, heading.slug)"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </aside>
</template>
