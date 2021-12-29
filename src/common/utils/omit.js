/**
 * 排除某个属性
 */
export function omit(omitKey) {
  return (obj) => {
    const { [omitKey]: _, ...rest } = obj;
    return rest;
  };
}
