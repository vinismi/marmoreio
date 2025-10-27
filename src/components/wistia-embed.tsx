'use client';

import React, { useEffect, useRef } from 'react';

// This component is designed to work with Wistia's <wistia-player> custom element.
// It handles loading the necessary Wistia scripts and embedding the player.

type WistiaEmbedProps = {
  mediaId: string;
};

// Global promise to ensure the Wistia player script is loaded only once.
let wistiaScriptLoadingPromise: Promise<void> | null = null;

const loadWistiaScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if the script is already on the page
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load script: ${src}`);
    document.body.appendChild(script);
  });
};

const WistiaEmbed: React.FC<WistiaEmbedProps> = ({ mediaId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPlayer = async () => {
      try {
        // Load player.js and the specific embed script in parallel
        await Promise.all([
          loadWistiaScript('https://fast.wistia.com/player.js'),
          loadWistiaScript(`https://fast.wistia.com/embed/${mediaId}.js`),
        ]);
        // The scripts automatically find the custom element and initialize it.
      } catch (error) {
        console.error('Wistia script loading failed:', error);
      }
    };

    loadPlayer();
    
    // Create a style element for the placeholder
    const style = document.createElement('style');
    style.textContent = `
      wistia-player[media-id='${mediaId}']:not(:defined) {
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
        display: block;
        filter: blur(5px);
        padding-top: ${mediaId === 'gfij5gu2lb' ? '56.25%' : '133.33%'};
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup the style element when the component unmounts
      document.head.removeChild(style);
    };
  }, [mediaId]);

  return (
    <div ref={containerRef}>
      <wistia-player media-id={mediaId} aspect={mediaId === 'gfij5gu2lb' ? "1.7777777777777777" : "0.75"}></wistia-player>
    </div>
  );
};

export default WistiaEmbed;
