import { visit } from 'unist-util-visit';

export function remarkImage() {
  return function (tree, { data }) {
    visit(tree, 'image', (node) => {
      const { url, alt } = node;
      node.type = 'html';
      node.value = `<img src="${url}" alt="${alt}" style="width: 100%" data-zoomable="true" />`;
    });
  };
}