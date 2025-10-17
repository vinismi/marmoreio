"use client";

import React, { useState, useEffect, useMemo } from 'react';

interface Particle {
  id: number;
  style: React.CSSProperties;
}

const GoldenParticles = ({ count = 30, visible = false }: { count?: number, visible?: boolean }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    if (!isClient) {
      return [];
    }
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      },
    }));
  }, [count, isClient]);

  if (!visible || !isClient) return null;

  return (
    <div className="particle-container">
      {particles.map(({ id, style }) => (
        <div key={id} className="particle" style={style} />
      ))}
    </div>
  );
};

export default GoldenParticles;
