import { Matcher } from "@testing-library/react";

export function regexMatcher(innhold: RegExp): Matcher {
  return (content: string, node: Element | null) => {
    if (!node) return false;

    const hasText = (innerNode: any) => innhold.test(innerNode.textContent);
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
    return nodeHasText && childrenDontHaveText;
  };
}
