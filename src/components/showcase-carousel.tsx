
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
    <section className="relative w-full max-w-4xl mx-auto my-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <h3 className="text-center font-headline text-lg md:text-xl text-accent mb-6" style={{ textShadow: '0 0 10px rgba(255,215,0,0.4)'}}>
        Veja como simples superfícies se transformam em obras de arte ✨
      </h3>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        opts={{
            loop: true,
            align: 'start',
        }}
      >
        <CarouselContent className="-ml-4">
          {showcaseImages.map((image, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="overflow-hidden rounded-xl border border-amber-500/25 shadow-lg shadow-amber-500/10 transition-all duration-300 group hover:shadow-amber-500/20">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={400}
                      height={500}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                      priority={index < 3}
                    />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-current" />
        <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-current" />
      </Carousel>
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
}
