export type PublishedElement = {
  dataManageullId: string;
  selector: string | null;
  type: string;
  currentValue: string | null;
  attributes: Record<string, string>;
  isVisible: boolean;
  contentChanged: boolean;
  attributesChanged: boolean;
  visibilityChanged: boolean;
};

export type PublishedPage = {
  page: {
    path: string;
    title: string;
    seoTitle: string | null;
    seoDescription: string | null;
    canonicalUrl: string | null;
    language: string;
  };
  elements: PublishedElement[];
  version: { id: string; number: number; checksum: string };
};

export const RICH_TEXT_TYPES = new Set(['HEADING', 'PARAGRAPH', 'LIST', 'CUSTOM']);
