'use client';

import { useEffect, useRef } from 'react';

type WistiaPlayerProps = {
  mediaId: string;
};

// Global Wistia script loading promise
let wistiaScriptLoadingPromise: Promise<void> | null = null;
const loadWistiaScript = () => {
  if (wistiaScriptLoadingPromise) {
    return wistiaScriptLoadingPromise;
  }
  wistiaScriptLoadingPromise = new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.com/player.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      wistiaScriptLoadingPromise = null; // Allow retrying
      reject('Failed to load Wistia player script.');
    };
    document.body.appendChild(script);
  });
  return wistiaScriptLoadingPromise;
};


const WistiaPlayer = ({ mediaId }: WistiaPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = `wistia_${mediaId}`;

  useEffect(() => {
    let video: any;

    const initializePlayer = async () => {
      try {
        await loadWistiaScript();
        
        // Ensure the global _wq is available
        (window as any)._wq = (window as any)._wq || [];
        (window as any)._wq.push({
          id: videoId,
          onReady: (v: any) => {
            video = v;
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    
    initializePlayer();

    // Cleanup function
    return () => {
      if (video) {
        try {
          video.remove();
        } catch (e) {
          console.warn(`Could not remove Wistia video ${mediaId}`, e);
        }
      }
    };
  }, [mediaId, videoId]);

  return (
    <div ref={containerRef} className="wistia_responsive_padding" style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
      <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
        <div
          className={`wistia_embed wistia_async_${mediaId} videoFoam=true`}
          style={{ height: '100%', position: 'relative', width: '100%' }}
        >
          <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
            <img
              src={`https://fast.wistia.com/embed/medias/${mediaId}/swatch`}
              style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WistiaPlayer;

    