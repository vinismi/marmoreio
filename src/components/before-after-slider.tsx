'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleUp = () => {
    setIsDragging(false);
  };

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
    window.addEventListener('touchmove', handleTouchMove);
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
    <div
      ref={containerRef}
      className="group relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-lg cursor-ew-resize select-none"
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
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
        />
      </div>

      {/* Before Image (Bottom Layer) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={before}
          alt="Antes"
          fill
          className="object-cover pointer-events-none"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 bg-accent cursor-ew-resize transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(255,215,0,0.7)]"
        style={{
          left: `calc(${sliderPosition}% - 2px)`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-accent flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 animate-handle-pulse">
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-black" />
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-black" />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
