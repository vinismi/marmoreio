
'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const showcaseImages = [
  PlaceHolderImages.find(img => img.id === 'showcase-1'),
  PlaceHolderImages.find(img => img.id === 'showcase-2'),
  PlaceHolderImages.find(img => img.id === 'showcase-3'),
  PlaceHolderImages.find(img => img.id === 'showcase-4'),
].filter(Boolean) as (typeof PlaceHolderImages)[0][];

export default function ShowcaseCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  return (
    <div className="relative w-full my-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>

      {/* Título Premium */}
      <div className="text-center mb-10 px-4">
        <h3 className="inline-block text-2xl md:text-4xl font-black uppercase tracking-tight text-white relative z-10">
          <span className="absolute -inset-1 blur-xl bg-amber-500/20 rounded-full"></span>
          <span className="relative z-10">
            Veja como simples superfícies se <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 animate-gradient-x">
              transformam em obras de arte
            </span>
          </span>
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4 rounded-full shadow-[0_0_10px_#f59e0b]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-12">
        {/* Efeitos de Fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-amber-500/5 blur-3xl rounded-[3rem] -z-10 pointer-events-none"></div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.play()}
          opts={{
            loop: true,
            align: 'center',
          }}
        >
          <CarouselContent className="-ml-4">
            {showcaseImages.map((image, index) => (
              <CarouselItem key={index} className={cn("pl-4 basis-full md:basis-1/2 lg:basis-1/3")}>
                <div className="p-2">
                  <div className="relative overflow-hidden transition-all duration-500 group rounded-2xl border border-white/10 shadow-2xl shadow-black/50 hover:shadow-amber-500/20 hover:border-amber-500/30 hover:-translate-y-2">
                    {/* Overlay Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={800}
                      className="aspect-[3/4] w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      data-ai-hint={image.imageHint}
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Caption on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <p className="text-white font-bold text-lg drop-shadow-md border-l-4 border-amber-500 pl-3">
                        Acabamento Premium
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 border-none bg-black/50 backdrop-blur-md text-white hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-amber-500/50 group">
            <ChevronLeft className="w-6 h-6 group-hover:scale-125 transition-transform" />
          </CarouselPrevious>
          <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 border-none bg-black/50 backdrop-blur-md text-white hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-amber-500/50 group">
            <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
          </CarouselNext>

          {/* Mobile Navigation (Visible only on small screens) */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 border-white/10 bg-white/5 text-white hover:bg-amber-500 hover:text-black" />
            <CarouselNext className="static translate-y-0 w-12 h-12 border-white/10 bg-white/5 text-white hover:bg-amber-500 hover:text-black" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
