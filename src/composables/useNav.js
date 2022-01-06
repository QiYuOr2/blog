import { useRouter } from 'vue-router';

export function useNav() {
  const r = useRouter();
  const toDetail = (to) => {
    r.push(to);
  };

  const toOut = (to) => {
    open(to, '__blank');
  };

  return { toDetail, toOut };
}
