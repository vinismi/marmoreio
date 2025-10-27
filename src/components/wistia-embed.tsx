'use client';

import React, { useEffect, useRef, useState } from 'react';

type WistiaEmbedProps = {
  mediaId: string;
};

// Global promise to ensure the Wistia player script is loaded only once.
const wistiaScriptPromises: { [key: string]: Promise<void> } = {};

const loadWistiaScript = (src: string): Promise<void> => {
  if (wistiaScriptPromises[src]) {
    return wistiaScriptPromises[src];
  }

  wistiaScriptPromises[src] = new Promise((resolve, reject) => {
    // Check if the script is already on the page
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
        delete wistiaScriptPromises[src];
        reject(`Failed to load script: ${src}`);
    };
    document.body.appendChild(script);
  });

  return wistiaScriptPromises[src];
};

const WistiaEmbed: React.FC<WistiaEmbedProps> = ({ mediaId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element comes into view
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Stop observing once it's visible
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px', // Load 50px before it enters the viewport
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isIntersecting) {
      return;
    }

    const loadPlayer = async () => {
      try {
        await Promise.all([
          loadWistiaScript('https://fast.wistia.com/player.js'),
          loadWistiaScript(`https://fast.wistia.com/embed/${mediaId}.js`),
        ]);
      } catch (error) {
        console.error('Wistia script loading failed:', error);
      }
    };

    loadPlayer();
  }, [isIntersecting, mediaId]);

  // Create a unique style element for each media ID to prevent conflicts
  useEffect(() => {
    const styleId = `wistia-style-${mediaId}`;
    if (document.getElementById(styleId)) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      wistia-player[media-id='${mediaId}']:not(:defined) {
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
        display: block;
        filter: blur(5px);
        padding-top: ${mediaId === 'gfij5gu2lb' ? '56.25%' : '133.33%'};
      }
    `;
    document.head.appendChild(style);

    // No cleanup needed since we are checking for existence
  }, [mediaId]);

  return (
    <div ref={containerRef}>
      <wistia-player media-id={mediaId} aspect={mediaId === 'gfij5gu2lb' ? "1.7777777777777777" : "0.75"}></wistia-player>
    </div>
  );
};

export default WistiaEmbed;
