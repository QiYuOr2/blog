import { visit } from 'unist-util-visit';

/**
 * 自定义 remark 插件：自定义图片标签
 * 处理对象为 mdast
 */
export function remarkImage() {
  return function (tree, { data }) {
    visit(tree, 'image', (node) => {
      const { url, alt } = node;
      node.type = 'html';
      node.value = `<div class=""><img src="${url}" alt="${alt}" /></div>`;
    });
  };
}