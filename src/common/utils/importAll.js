/**
 * import all from require.context
 */
export function importAll(path, withFileName = false) {
  // return r
  //   .keys()
  //   .map((item) => (withFileName ? { module: r(item), file: item } : r(item)));
  console.log(import.meta.globEager('../../posts/**/*.md'));
  return [];
}
