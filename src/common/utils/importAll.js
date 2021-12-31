/**
 * import all from require.context
 */
export function importAll(r, withFileName = false) {
  return r
    .keys()
    .map((item) => (withFileName ? { module: r(item), file: item } : r(item)));
}
