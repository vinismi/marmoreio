
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
    <section className="relative w-full my-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <h3 className="text-center font-headline text-lg md:text-xl text-accent mb-6 px-4" style={{ textShadow: '0 0 10px rgba(255,215,0,0.4)'}}>
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
        <CarouselContent className="-ml-0">
          {showcaseImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0 basis-full">
              <div className="p-0">
                <div className="overflow-hidden transition-all duration-300 group">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={1920}
                      height={1080}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                      priority={index < 2}
                    />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 fill-current" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 fill-current" />
      </Carousel>
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
}
