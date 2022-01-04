import { useRouter } from 'vue-router';

export function useNav() {
  const r = useRouter();
  const toDetail = (to) => {
    r.push(to);
  };

  return { toDetail };
}
