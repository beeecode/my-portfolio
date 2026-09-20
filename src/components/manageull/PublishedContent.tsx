'use client';

import { Children, Fragment, cloneElement, createContext, isValidElement, useContext, useMemo, type ComponentType, type ReactElement, type ReactNode } from 'react';
import { AnimatePresence, unwrapMotionComponent } from 'motion/react';
import { RICH_TEXT_TYPES, type PublishedElement, type PublishedPage } from '../../lib/manageull/types';

type ContentIndex = { selectors: Map<string, PublishedElement>; ids: Map<string, PublishedElement> };
const emptyIndex: ContentIndex = { selectors: new Map(), ids: new Map() };
const ContentContext = createContext(emptyIndex);

export function PublishedContentProvider({ page, children }: { page: PublishedPage | null; children: ReactNode }) {
  const index = useMemo(() => ({
    selectors: new Map((page?.elements ?? []).filter((item) => item.selector).map((item) => [item.selector!, item])),
    ids: new Map((page?.elements ?? []).map((item) => [item.dataManageullId, item])),
  }), [page]);
  return <ContentContext.Provider value={index}>{children}</ContentContext.Provider>;
}

type NodeProps = {
  children?: ReactNode;
  id?: string;
  style?: Record<string, unknown>;
  'data-manageull-id'?: string;
  [key: string]: unknown;
};

const attributeSelector = (name: string, value: string) =>
  `[${name}="${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`;

/**
 * Apply the crawler's exact DOM paths to native React props, before SSR and hydration.
 * No browser querySelector, effects, HTML document rewrites, or second content fetch.
 * Composite components opt in with a manageullTag and forward manageullPath to this hook.
 */
export function renderPublishedTree(tree: ReactNode, index: ContentIndex, rootPath?: string): ReactNode {
  function visit(children: ReactNode, parent: string, counts = new Map<string, number>(), explicitPath?: string): ReactNode {
    return Children.map(children, (child) => {
      if (!isValidElement<NodeProps>(child)) return child;
      if (child.type === Fragment || child.type === AnimatePresence) {
        return cloneElement(child, {}, visit(child.props.children, parent, counts));
      }
      const type = child.type as ComponentType & { manageullTag?: string };
      const unwrapped = typeof child.type === 'string' ? child.type : unwrapMotionComponent(type);
      const tag = typeof unwrapped === 'string' ? unwrapped : type.manageullTag;
      // Icons and application components own their internals; never execute them here.
      if (!tag) return child;
      const position = (counts.get(tag) ?? 0) + 1;
      counts.set(tag, position);
      const props = child.props;
      const ownId = props['data-manageull-id'];
      const stableAttribute = ['data-testid', 'data-cy', 'data-test'].find((key) => typeof props[key] === 'string');
      const path = explicitPath || (ownId ? attributeSelector('data-manageull-id', ownId)
        : props.id ? attributeSelector('id', props.id)
        : stableAttribute ? attributeSelector(stableAttribute, props[stableAttribute] as string)
        : `${parent ? `${parent} > ` : ''}${tag}:nth-of-type(${position})`);
      if (type.manageullTag) return cloneElement(child, { manageullPath: path });

      const element = (ownId && index.ids.get(ownId)) || index.selectors.get(path);
      const overrides: NodeProps = {};
      let content = visit(props.children, path);
      if (element) {
        if (element.attributesChanged) {
          if (tag === 'img') {
            if (element.attributes.src !== undefined) overrides.src = element.attributes.src;
            if (element.attributes.alt !== undefined) overrides.alt = element.attributes.alt;
          }
          if (tag === 'a' && element.attributes.href !== undefined) overrides.href = element.attributes.href;
        }
        if (element.visibilityChanged) {
          overrides.hidden = !element.isVisible;
          // Author display utilities (flex, grid) can override the browser's hidden rule.
          if (!element.isVisible) overrides.style = { ...props.style, display: 'none' };
        }
        if (element.contentChanged && element.currentValue !== null && props['data-manageull-preserve-content'] !== true && !['img', 'input', 'textarea', 'select'].includes(tag)) {
          if (RICH_TEXT_TYPES.has(element.type)) {
            overrides.dangerouslySetInnerHTML = { __html: element.currentValue };
            content = undefined;
          } else {
            content = element.currentValue;
          }
        }
      }
      // Preserve void elements: passing an empty children array makes React reject <img>.
      if (content === undefined || content === null) return cloneElement(child, { ...overrides, children: content });
      return cloneElement(child, overrides, content);
    });
  }
  return visit(tree, '', new Map(), rootPath);
}

export function usePublishedTree() {
  const index = useContext(ContentContext);
  return (tree: ReactNode, rootPath?: string) => renderPublishedTree(tree, index, rootPath);
}

export function PublishedTree({ children, rootPath }: { children: ReactElement; rootPath: string }) {
  return usePublishedTree()(children, rootPath);
}
