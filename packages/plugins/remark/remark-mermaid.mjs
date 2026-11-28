import { visit } from "unist-util-visit";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "mermaid") {
        parent.children.splice(index, 1, {
          type: "html",
          value: `<div class="mermaid">${escapeHtml(node.value)}</div>`,
        });
      }
    });
  };
}
