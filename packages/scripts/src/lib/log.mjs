/**
 * 统一的终端输出。脚本不再各写一套 console / process.stdout 拼字符串，
 * 也方便以后集中加颜色或静默模式。
 */

export function info(message) {
  console.log(message);
}

export function warn(message) {
  console.warn(message);
}

export function error(message) {
  console.error(message);
}

/**
 * 开始一个带省略号的进度提示，返回结束该提示的回调：
 *   const done = task("Fetching shelf");
 *   done();            // "Fetching shelf... done"
 *   done("12 books");  // "Fetching shelf... 12 books"
 */
export function task(label) {
  process.stdout.write(`${label}... `);
  let settled = false;
  return (result = "done") => {
    if (settled) return;
    settled = true;
    process.stdout.write(`${result}\n`);
  };
}
