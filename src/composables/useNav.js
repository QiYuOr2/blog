import { nextTick, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

export function useNav() {
  const r = useRouter();
  const toDetail = (to) => {
    r.push(to);
  };

  const toOut = (to) => {
    open(to, '__blank');
  };

  onMounted(() => {
    watchEffect(() => {
      ['list', 'talk', 'about', 'archives'].includes(r.currentRoute.value.name)
        ? (document.title = '@柒宇')
        : nextTick(
            () =>
              !document.title.includes('@柒宇') &&
              (document.title = document.title + ' | @柒宇')
          );
    });
  });
  // watchEffect(() => {
  //
  // });

  return { toDetail, toOut };
}
