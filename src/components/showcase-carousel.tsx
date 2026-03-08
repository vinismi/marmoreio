
'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const showcaseImages = [
  {
    id: 'showcase-1',
    imageUrl: 'https://i.postimg.cc/tCTnGNrd/1.webp',
    label: 'Mármore Branco Luxo',
    tag: 'Clássico',
    tagColor: '#00C2CB',
  },
  {
    id: 'showcase-2',
    imageUrl: 'https://i.postimg.cc/QxtKZJ6b/2.webp',
    label: 'Veias Douradas',
    tag: 'Premium',
    tagColor: '#F5A623',
  },
  {
    id: 'showcase-3',
    imageUrl: 'https://i.postimg.cc/y6n3GbTT/3.jpg',
    label: 'Mármore Moderno',
    tag: 'Tendência',
    tagColor: '#7C4DFF',
  },
  {
    id: 'showcase-4',
    imageUrl: 'https://i.postimg.cc/WpZf60mH/efeito-marmorizado-11.jpg',
    label: 'Negro Impactante',
    tag: 'Luxo',
    tagColor: '#E91E63',
  },
  {
    id: 'showcase-5',
    imageUrl: 'https://i.postimg.cc/jqfkQy63/kk4.jpg',
    label: 'Colorido Artístico',
    tag: 'Criativo',
    tagColor: '#22c55e',
  },
  {
    id: 'showcase-6',
    imageUrl: 'https://i.postimg.cc/cHkT97L3/1-depois.png',
    label: 'Rústico Artesanal',
    tag: 'Natural',
    tagColor: '#FF6D00',
  },
];

export default function ShowcaseCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div className="w-full">
      <div className="w-full relative max-w-5xl mx-auto md:px-12">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.play()}
          opts={{ loop: true, align: 'center' }}
        >
          <CarouselContent className="ml-0 md:-ml-4 flex items-center">
            {showcaseImages.map((img, i) => (
              <CarouselItem key={i} className="pl-4 basis-[85%] sm:basis-[60%] md:basis-1/3">
                <div className="relative overflow-hidden rounded-2xl group shadow-md hover:shadow-xl transition-all duration-500"
                  style={{ aspectRatio: '3/4', border: '2px solid #E8EBF0' }}>
                  {/* Hover overlay no desktop, Gradiente base no mobile */}
                  <div className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 65%)' }} />
                  <Image
                    src={img.imageUrl}
                    alt={img.label}
                    fill
                    className="object-cover transition-transform duration-700 md:group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, 33vw"
                    quality={85}
                    priority={i < 3}
                  />
                  {/* Badge */}
                  <div className="absolute top-3 xl:top-4 left-3 xl:left-4 z-20 px-3 py-1 rounded-full text-white font-black shadow-md border border-white/20"
                    style={{ fontSize: '11px', background: img.tagColor, letterSpacing: '0.05em' }}>
                    {img.tag}
                  </div>
                  {/* Text details */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 xl:p-6 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-black text-white text-lg xl:text-xl leading-tight drop-shadow-md" style={{ fontFamily: 'Sora' }}>{img.label}</p>
                    <div className="w-8 h-1 rounded-full mt-2.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100" style={{ background: img.tagColor }} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Swipe indicators para mobile apenas para UX */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-5">
          <div className="w-5 h-1.5 rounded-full" style={{ background: 'var(--turquoise)' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
