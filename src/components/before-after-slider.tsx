'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  useEffect(() => {
    const currentHandle = handleRef.current;
    if (currentHandle) {
      currentHandle.addEventListener('mousedown', handleMouseDown as any);
      currentHandle.addEventListener('touchstart', handleTouchStart as any, { passive: true });
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    
    return () => {
      if (currentHandle) {
        currentHandle.removeEventListener('mousedown', handleMouseDown as any);
        currentHandle.removeEventListener('touchstart', handleTouchStart as any);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [handleMouseDown, handleTouchStart, handleMouseMove, handleTouchMove, handleUp]);

  return (
    <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] max-w-full overflow-hidden rounded-lg shadow-2xl shadow-black/50 select-none"
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
                className="object-cover pointer-events-none"
                priority
            />
        </div>

        {/* Before Image (Bottom Layer) */}
        <div className="absolute inset-0 w-full h-full">
            <Image
                src={before}
                alt="Antes"
                fill
                className="object-cover pointer-events-none"
                priority
            />
        </div>

        {/* Slider Line & Handle */}
        <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-accent/90 cursor-ew-resize"
            style={{ 
              left: `${sliderPosition}%`,
              boxShadow: '0 0 10px rgba(255,215,0,0.4)',
              pointerEvents: 'none'
            }}
        >
          <div
            ref={handleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-accent rounded-full text-black shadow-lg cursor-ew-resize"
            style={{ pointerEvents: 'auto' }}
          >
            <ChevronsLeftRight size={24} />
          </div>
        </div>
    </div>
  );
};

export default BeforeAfterSlider;
