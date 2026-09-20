'use client';

import { useEffect } from 'react';

export function EditorBridge({ origin, siteKey, verification }: { origin: string; siteKey: string; verification: string }) {
  useEffect(() => {
    // Manageull's visual editor embeds the site. Ordinary visits use only SSR content.
    // The remote bridge authenticates its parent through Manageull's existing handshake.
    if (window.self === window.top || document.getElementById('manageull-editor-runtime')) return;
    const script = document.createElement('script');
    script.id = 'manageull-editor-runtime';
    script.src = new URL('/runtime/script', origin).href;
    script.dataset.manageullKey = siteKey;
    script.dataset.manageullSiteVerification = verification;
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.head.appendChild(script);
    // The runtime owns message listeners for this document's lifetime. Do not load it
    // twice during React Strict Mode's effect replay.
  }, [origin, siteKey, verification]);
  return null;
}
