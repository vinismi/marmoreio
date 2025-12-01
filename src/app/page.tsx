
'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import ShowcaseCarousel from '@/components/showcase-carousel';
import GoldenParticles from '@/components/particles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PremiumBenefitsSection from '@/components/premium-benefits';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/funil');
  }, [router]);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="dark relative flex min-h-screen flex-col items-center justify-center bg-black p-5 pb-8 text-center text-foreground">
        <GoldenParticles visible={true} count={20} />
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-20"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/95"></div>
        </div>

        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-6 px-4 pt-12 md:px-6 md:pt-0">
          <h1
            className="font-headline text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white animate-fade-in-up w-full max-w-6xl pt-12 text-center px-1"
            style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)', animationDelay: '0.2s' }}
          >
            TRANSFORME QUALQUER PAREDE OU PISO EM UM <br className="hidden md:block" />
            <span className="relative inline-block mt-2 md:mt-4">
              {/* Main Text with Gradient */}
              <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600"
                style={{ filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.4))' }}>
                MÁRMORE DE LUXO.
              </span>

              {/* Diamond */}
              <span className="align-middle text-4xl min-[400px]:text-5xl sm:text-7xl md:text-8xl lg:text-9xl ml-1 md:ml-4 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.4)] animate-float inline-block">💎</span>
            </span>
          </h1>

          <div className="mt-4 mb-2 w-3/5 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto opacity-70"></div>

          {/* New Premium Benefits Section */}
          <PremiumBenefitsSection />

          <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-4 mb-4 opacity-70"></div>
        </div>
      </section>
      <section className="dark relative bg-black py-4">
        <div className="z-20 w-full md:-mt-20">
          <ShowcaseCarousel />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4">
          <div className="z-40 w-full max-w-xs sm:max-w-md md:max-w-lg mt-10">
            <Link href="/funil" className='w-full'>

              <Button
                size="lg"
                className="button-shine-gradient text-black hover:text-black text-base md:text-lg font-bold w-full rounded-full h-16 animate-fade-in-up animate-subtle-pulse shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95"
                style={{ animationDelay: '1.2s' }}
              >
                QUERO PARTICIPAR DO TREINAMENTO
              </Button>

            </Link>
          </div>

          <div className="z-30 mt-8">
            <Badge variant="secondary" className="animate-fade-in-up bg-black/30 border-white/20 text-white shadow-lg" style={{ animationDelay: '1.4s' }}>
              🔥 +7.000 pintores já aplicaram essa técnica!
            </Badge>
          </div>
        </div>
      </section>
    </main>
  );
}
