/**
 * 排除某个属性
 */
export function omit(omitKey, target) {
  const action = (obj) => {
    const { [omitKey]: _, ...rest } = obj;
    return rest;
  };

  if (target) {
    return action(target);
  }
  return action;
}
