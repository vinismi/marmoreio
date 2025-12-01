'use client';

import React, { useEffect } from 'react';

type WistiaWebPlayerProps = {
    mediaId: string;
    aspect?: number;
};

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'wistia-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'media-id': string; aspect?: number }, HTMLElement>;
        }
    }
}

export default function WistiaWebPlayer({ mediaId, aspect = 0.5504587155963303 }: WistiaWebPlayerProps) {
    useEffect(() => {
        // Load the main player script if not present
        if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
            const script = document.createElement('script');
            script.src = "https://fast.wistia.com/player.js";
            script.async = true;
            document.body.appendChild(script);
        }

        // Load the specific media script
        const mediaScriptSrc = `https://fast.wistia.com/embed/${mediaId}.js`;
        if (!document.querySelector(`script[src="${mediaScriptSrc}"]`)) {
            const script = document.createElement('script');
            script.src = mediaScriptSrc;
            script.async = true;
            script.type = "module";
            document.body.appendChild(script);
        }
    }, [mediaId]);

    return (
        <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <style dangerouslySetInnerHTML={{
                __html: `
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: ${100 / aspect}%;
        }
      `}} />
            <wistia-player media-id={mediaId} aspect={aspect}></wistia-player>
        </div>
    );
}
