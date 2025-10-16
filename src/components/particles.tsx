"use client";

import React, { useMemo } from 'react';

interface Particle {
  id: number;
  style: React.CSSProperties;
}

const GoldenParticles = ({ count = 30, visible = false }: { count?: number, visible?: boolean }) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2.5}s`,
        animationDuration: `${1.5 + Math.random() * 2}s`,
      },
    }));
  }, [count]);

  if (!visible) return null;

  return (
    <div className="particle-container">
      {particles.map(({ id, style }) => (
        <div key={id} className="particle" style={style} />
      ))}
    </div>
  );
};

export default GoldenParticles;
