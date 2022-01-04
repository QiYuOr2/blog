const PAGE_CACHE_KEY = 'blog@page_cache_key';

export const pageCache = {
  read() {
    return Number(sessionStorage.getItem(PAGE_CACHE_KEY) || 1);
  },
  cache(val) {
    return sessionStorage.setItem(PAGE_CACHE_KEY, Number(val));
  },
  increase() {
    let page = this.read();
    this.cache(++page);
    return page;
  },
  decrease() {
    let page = this.read();
    this.cache(--page);
    return page;
  },
};
