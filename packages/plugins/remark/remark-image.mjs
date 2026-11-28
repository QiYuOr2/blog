import { visit } from "unist-util-visit";

function escapeAttr(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function remarkImage() {
  return function (tree) {
    visit(tree, "image", (node) => {
      const url = escapeAttr(node.url);
      const alt = escapeAttr(node.alt);
      node.type = "html";
      node.value = `<img src="${url}" alt="${alt}" style="width: 100%" loading="lazy" decoding="async" data-zoomable="true" />`;
    });
  };
}
