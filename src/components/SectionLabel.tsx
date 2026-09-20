'use client';

import React from 'react';
import { usePublishedTree } from './manageull/PublishedContent';

export const SectionLabel = Object.assign(React.memo(function SectionLabel({ number, text, manageullPath }: { number?: string; text: string; manageullPath?: string }) {
  const publish = usePublishedTree();
  return publish(
    <div className="flex items-center gap-3 mb-12">
      {number && <span className="font-mono text-[10px] text-accent tracking-wider">{number}</span>}
      <span className="font-display text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">{text}</span>
    </div>, manageullPath
  );
}), { manageullTag: 'div' });
