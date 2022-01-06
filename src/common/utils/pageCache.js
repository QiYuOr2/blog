export const pageCache = {
  page: 1,
  read() {
    return Number(this.page || 1);
  },
  cache(val) {
    return (this.page = Number(val));
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
