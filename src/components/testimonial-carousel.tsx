'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import WistiaWebPlayer from './wistia-web-player';

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
        {videoIds.map((videoId, index) => (
          <CarouselItem key={`${videoId}-${index}`} className="md:basis-1/2">
            <div className="p-1">
              <WistiaWebPlayer mediaId={videoId} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='-left-4 text-white bg-black/50 border-accent/50 hover:bg-accent hover:text-black' />
      <CarouselNext className='-right-4 text-white bg-black/50 border-accent/50 hover:bg-accent hover:text-black' />
    </Carousel>
  );
}
