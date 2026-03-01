
'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const showcaseImages = [
  {
    id: 'showcase-1',
    imageUrl: 'https://i.postimg.cc/tCTnGNrd/1.webp',
    description: 'Efeito marmorizado elegante',
    label: 'Mármore Branco Luxo',
  },
  {
    id: 'showcase-2',
    imageUrl: 'https://i.postimg.cc/QxtKZJ6b/2.webp',
    description: 'Acabamento premium de luxo',
    label: 'Mármore com Veias Douradas',
  },
  {
    id: 'showcase-3',
    imageUrl: 'https://i.postimg.cc/y6n3GbTT/3.jpg',
    description: 'Transformação marmorizada',
    label: 'Mármore Moderno',
  },
  {
    id: 'showcase-4',
    imageUrl: 'https://i.postimg.cc/tR6mtFdc/D-NQ-NP-834485-MLB69719549184-052023-O.webp',
    description: 'Mármore clássico',
    label: 'Mármore Clássico Elegante',
  },
];

export default function ShowcaseCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div className="relative w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="relative max-w-5xl mx-auto px-4 md:px-12">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.play()}
          opts={{ loop: true, align: 'center' }}
        >
          <CarouselContent className="-ml-4">
            {showcaseImages.map((image, index) => (
              <CarouselItem key={index} className={cn("pl-4 basis-full md:basis-1/2 lg:basis-1/3")}>
                <div className="p-2">
                  <div className="relative overflow-hidden rounded-2xl transition-all duration-500 group shadow-lg hover:shadow-xl"
                    style={{ border: '1px solid #E8EBF0' }}>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      style={{ background: 'linear-gradient(to top, rgba(0,194,203,0.8), transparent 50%)' }} />

                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={800}
                      className="aspect-[3/4] w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110 next-image-fade-in"
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                    />

                    {/* Caption on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <p className="text-white font-bold text-base drop-shadow-md"
                        style={{ borderLeft: '4px solid var(--amber-brand)', paddingLeft: '12px' }}>
                        {image.label}
                      </p>
                    </div>

                    {/* Corner badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold text-white z-10"
                      style={{ background: 'rgba(0,194,203,0.9)', opacity: 0 }}
                      data-hover-show>
                      Premium
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 border-none text-white transition-all duration-300 shadow-lg group"
            style={{ background: 'var(--turquoise)' }}
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-125 transition-transform" />
          </CarouselPrevious>
          <CarouselNext
            className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 border-none text-white transition-all duration-300 shadow-lg group"
            style={{ background: 'var(--turquoise)' }}
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
          </CarouselNext>

          <div className="flex md:hidden justify-center gap-4 mt-6">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 text-white border-none"
              style={{ background: 'var(--turquoise)' }} />
            <CarouselNext className="static translate-y-0 w-12 h-12 text-white border-none"
              style={{ background: 'var(--turquoise)' }} />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
