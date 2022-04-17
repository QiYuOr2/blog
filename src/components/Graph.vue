<script>
import { watch, ref, onMounted } from 'vue';

const dateFormatter = (date) => {
  const source = new Date(date);
  const year = source.getFullYear();
  const month = String(source.getMonth() + 1).padStart(2, '0');
  const day = String(source.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

export default {
  props: {
    list: Array,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const graphRef = ref(null);

    const selfList = ref([]);

    const reCompute = () => {
      const result = [];

      for (let i = 0; i < props.list.length; i++) {
        const curr = new Date(props.list[i]).getTime();
        if (!props.list[i + 1]) {
          result.push(dateFormatter(curr));
          break;
        }
        const next = new Date(props.list[i + 1]).getTime();
        const diff = Math.floor((next - curr) / (1000 * 60 * 60 * 24));
        result.push(dateFormatter(curr), ...new Array(diff).fill(''));
      }

      const last = new Date(props.list[props.list.length - 1]).getTime();
      const today = new Date().getTime();
      const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      result.push(...new Array(diff).fill(''));

      selfList.value = result.slice(
        result.length - Math.floor(graphRef.value.offsetWidth / 17) * 6
      );
    };

    onMounted(() => {
      const resizeObserver = new ResizeObserver(() => {
        reCompute();
      });
      resizeObserver.observe(graphRef.value);
    });

    watch(graphRef, () => {
      reCompute();
    });

    const clickHandler = (date) => {
      console.log('click ', date || '空');
      emit('click', date);
    };

    return { selfList, graphRef, clickHandler };
  },
};
</script>

<template>
  <div class="graph" ref="graphRef">
    <div class="graph__container">
      <div
        :class="['rect', { has: i }]"
        v-for="i in selfList"
        :key="i"
        :title="i"
        @click="clickHandler(i)"
      ></div>
    </div>
  </div>
  <p class="label">实验品↑</p>
</template>

<style lang="less" scoped>
.graph {
  width: 100%;
  overflow: auto;
  &__container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 3px;
    height: 100px;
    .rect {
      width: 10px;
      height: 10px;
      background: var(--color-text-underline);
      border-radius: 2px;
      border: 2px solid var(--color-text-underline);
      &.has {
        background: var(--color-primary);
        border-color: var(--color-primary);
      }
    }
  }

  .label {
    margin-bottom: 0;
    font-size: 1rem;
    color: var(--color-text);
  }
}
</style>
