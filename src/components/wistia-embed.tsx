'use client';

import React, { useEffect, useRef, useState } from 'react';

type WistiaEmbedProps = {
  mediaId: string;
};

// Global promise to ensure the Wistia player script is loaded only once.
let wistiaScriptPromise: Promise<void> | null = null;
const loadWistiaScript = (src: string): Promise<void> => {
  if (wistiaScriptPromise) {
    return wistiaScriptPromise;
  }

  wistiaScriptPromise = new Promise((resolve, reject) => {
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
        wistiaScriptPromise = null;
        reject(`Failed to load script: ${src}`);
    };
    document.body.appendChild(script);
  });

  return wistiaScriptPromise;
};

const WistiaEmbed: React.FC<WistiaEmbedProps> = ({ mediaId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '200px' }
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
    if (!isIntersecting || isScriptLoaded) {
      return;
    }

    const loadPlayer = async () => {
      try {
        await loadWistiaScript('https://fast.wistia.com/assets/external/E-v1.js');
        setIsScriptLoaded(true);
      } catch (error) {
        console.error('Wistia script loading failed:', error);
      }
    };

    loadPlayer();
  }, [isIntersecting, isScriptLoaded]);

  useEffect(() => {
    const styleId = `wistia-style-${mediaId}`;
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    const paddingTop = mediaId === 'gfij5gu2lb' ? '56.25%' : '177.78%';
    style.textContent = `
      .wistia_responsive_wrapper {
        position: relative;
        height: 100%;
        width: 100%;
      }
      .wistia_embed {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
      .wistia_swatch {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
        filter: blur(5px);
        transition: opacity 200ms;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    `;
    document.head.appendChild(style);
  }, [mediaId]);

  const videoId = `wistia_async_${mediaId}`;
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (!isScriptLoaded) return;
    
    (window as any)._wq = (window as any)._wq || [];
    (window as any)._wq.push({
      id: videoId,
      onReady: (video: any) => {
        videoRef.current = video;
      },
    });

    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.remove();
        } catch (e) {
          console.error("Error removing Wistia player:", e);
        }
      }
    };
  }, [isScriptLoaded, videoId]);

  return (
    <div ref={containerRef} className="wistia_responsive_padding" style={{ padding: mediaId === 'gfij5gu2lb' ? '56.25% 0 0 0' : '177.78% 0 0 0', position: 'relative' }}>
      {isIntersecting && (
        <div className="wistia_responsive_wrapper">
          <div
            className={`wistia_embed wistia_async_${mediaId} videoFoam=true`}
            id={videoId}
          >
            <div className="wistia_swatch" style={{backgroundImage: `url(https://fast.wistia.com/embed/medias/${mediaId}/swatch)`}}>
            </div>
          </div>
        </div>
      )}
      {!isIntersecting && (
        <div className="wistia_responsive_wrapper" style={{background: '#000'}}>
             <div className="wistia_swatch" style={{backgroundImage: `url(https://fast.wistia.com/embed/medias/${mediaId}/swatch)`}}></div>
        </div>
      )}
    </div>
  );
};


export default WistiaEmbed;
