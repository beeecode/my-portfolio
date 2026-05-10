import React from 'react';

export const SectionLabel = React.memo(function SectionLabel({ number, text }: { number?: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      {number && <span className="font-mono text-[10px] text-accent tracking-wider">{number}</span>}
      <span className="font-display text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">{text}</span>
    </div>
  );
});
