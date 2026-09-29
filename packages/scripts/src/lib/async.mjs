/** 等待指定毫秒，用于限流重试与分页间隔。 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 并发度受限的 map，返回结果顺序与输入一致。
 */
export async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  const workerCount = Math.max(1, Math.min(limit, items.length));
  let cursor = 0;

  const workers = Array.from({ length: workerCount }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  });

  await Promise.all(workers);
  return results;
}
