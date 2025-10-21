'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [handleMouseMove, handleTouchMove, handleUp]);

  return (
    <div className="relative w-full mb-12">
        {/* Floating Control Bar */}
        <div 
          className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 h-11 w-[85%] md:w-[60%] flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm border-b-2 border-accent/70 shadow-lg cursor-ew-resize transition-all duration-300 hover:shadow-accent/20"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ touchAction: 'none' }}
        >
            <div className="flex items-center gap-2 text-sm md:text-base text-white font-semibold">
                <MoveHorizontal className="h-5 w-5 text-accent animate-pulse" />
                Arraste para comparar
            </div>
        </div>

        {/* Image Container */}
        <div
            ref={containerRef}
            className="group relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-lg select-none"
        >
            <div 
                className="relative w-full h-full"
                style={{ pointerEvents: isDragging ? 'auto' : 'none' }}
            >
                {/* After Image (Top Layer) */}
                <div
                className="absolute inset-0 z-10 w-full h-full"
                style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
                >
                <Image
                    src={after}
                    alt="Depois"
                    fill
                    className="object-cover"
                    priority
                />
                </div>

                {/* Before Image (Bottom Layer) */}
                <div className="absolute inset-0 w-full h-full">
                <Image
                    src={before}
                    alt="Antes"
                    fill
                    className="object-cover"
                    priority
                />
                </div>

                {/* Slider Line (visual only) */}
                <div
                    className="absolute top-0 bottom-0 z-20 w-1 bg-accent/80"
                    style={{
                        left: `calc(${sliderPosition}% - 2px)`,
                        pointerEvents: 'none'
                    }}
                ></div>
            </div>
        </div>
    </div>
  );
};

export default BeforeAfterSlider;
