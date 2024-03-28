import { getNodeType } from "@tiptap/core";
import { Node } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";

export const listItemHasSubList = (typeOrName: string, state: EditorState, node?: Node) => {
  if (!node) {
    return false;
  }

  const nodeType = getNodeType(typeOrName, state.schema);

  let hasSubList = false;
  console.log("node", node);

  node.descendants((child) => {
    if (child.type === nodeType) {
      console.log("child", child.type, nodeType);
      hasSubList = true;
    }
  });

  console.log("before return", hasSubList);
  return hasSubList;
};
