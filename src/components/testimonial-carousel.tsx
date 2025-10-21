'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import WistiaPlayer from './wistia-player';

type TestimonialCarouselProps = {
  videoIds: string[];
};

export default function TestimonialCarousel({ videoIds }: TestimonialCarouselProps) {
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {videoIds.map(videoId => (
          <CarouselItem key={videoId} className="md:basis-1/2">
            <div className="p-1 aspect-w-9 aspect-h-16">
                <WistiaPlayer mediaId={videoId} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='-left-4 text-white bg-black/50 border-accent/50 hover:bg-accent hover:text-black' />
      <CarouselNext className='-right-4 text-white bg-black/50 border-accent/50 hover:bg-accent hover:text-black' />
    </Carousel>
  );
}
