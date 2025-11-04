'use client';

import { useEffect, useRef } from 'react';

type WistiaPlayerProps = {
  mediaId: string;
};

// Global Wistia script loading promise
let wistiaScriptLoadingPromise: Promise<void> | null = null;
const loadWistiaScript = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  if (wistiaScriptLoadingPromise) {
    return wistiaScriptLoadingPromise;
  }
  wistiaScriptLoadingPromise = new Promise((resolve, reject) => {
    // Check if the script already exists
    if (document.querySelector('script[src="https://fast.wistia.com/assets/external/E-v1.js"]')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.com/assets/external/E-v1.js';
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
  const videoId = `wistia_async_${mediaId}`;
  const videoRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      await loadWistiaScript();
      
      (window as any)._wq = (window as any)._wq || [];
      (window as any)._wq.push({
        id: videoId,
        onReady: (video: any) => {
          videoRef.current = video;
        },
      });
    };

    init();

    return () => {
      if (videoRef.current) {
        // This is the correct way to remove a Wistia player instance
        try {
            videoRef.current.remove();
        } catch (e) {
            console.error("Error removing Wistia player:", e);
        }
      }
    };
  }, [mediaId, videoId]);

  return (
    <div className="wistia_responsive_padding" style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
      <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
        <div
          id={videoId}
          className={`wistia_embed wistia_async_${mediaId} videoFoam=true`}
          style={{ height: '100%', position: 'relative', width: '100%' }}
        >
          <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
            <img
              src={`https://fast.wistia.com/embed/medias/${mediaId}/swatch`}
              style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WistiaPlayer;
