
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
import { Award, Sparkles, Trophy, Zap } from 'lucide-react';
import BeforeAfterCarousel from '@/components/before-after-carousel';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/funil');
  }, [router]);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="dark relative flex min-h-screen flex-col items-center justify-center bg-black p-5 pb-20 text-center text-foreground">
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
              className="font-headline text-4xl font-extrabold uppercase leading-tight tracking-tight text-white animate-fade-in-up max-w-4xl pt-12 sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ textShadow: '0 0 15px rgba(0,0,0,0.7)', animationDelay: '0.2s', lineHeight: '1.2' }}
            >
              TRANSFORME QUALQUER PAREDE OU PISO EM UM <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD86A] to-[#E8B449]" style={{textShadow: '0 0 35px hsla(var(--accent), 0.9), 0 2px 2px rgba(0,0,0,0.5)'}}>MÁRMORE DE LUXO. <span className="align-middle text-5xl sm:text-6xl md:text-7xl lg:text-8xl">💎</span></span>
            </h1>
            
            <div className="mt-8 mb-4 w-3/5 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto opacity-70"></div>

            <p 
              className="mt-4 text-lg md:text-xl font-medium text-white/95 animate-fade-in-up max-w-sm sm:max-w-md md:max-w-3xl mx-auto pb-2"
              style={{ animationDelay: '0.4s', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              A técnica que mais gera contratos para pintores em 2025.
            </p>

            <div 
              className="my-6 flex flex-col gap-6 text-white/90 text-base md:text-xl animate-fade-in-up max-w-sm sm:max-w-md md:max-w-3xl mx-auto"
              style={{ animationDelay: '0.6s', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              <p className="flex items-center justify-center gap-4">
                <Trophy className="text-[#FFD86A] size-7 md:size-8 drop-shadow-[0_0_8px_#FFD86A]" />
                <span className='font-semibold'>Pintores comuns estão fechando contratos altos</span>
              </p>
              <p className="flex items-center justify-center gap-4">
                <Sparkles className="text-[#FFD86A] size-7 md:size-8 drop-shadow-[0_0_8px_#FFD86A]" />
                <span className='font-semibold'>Materiais simples com resultado de luxo imediato</span>
              </p>
              <p className="flex items-center justify-center gap-4">
                <Zap className="text-[#FFD86A] size-7 md:size-8 drop-shadow-[0_0_8px_#FFD86A]" />
                <span className='font-semibold'>Aprenda rápido e aplique no mesmo dia</span>
              </p>
            </div>
            
            <p 
              className="text-base md:text-lg text-white/80 animate-fade-in-up mt-6 max-w-sm sm:max-w-md md:max-w-2xl mx-auto"
              style={{ animationDelay: '0.8s', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              Você aprende do zero e cria efeitos iguais aos profissionais que mais faturam hoje.
            </p>
            
            <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-8 mb-8 opacity-70"></div>
        </div>

      </section>
      
      <div className="z-20 w-full -mt-48">
          <ShowcaseCarousel />
      </div>
      
      <section className="dark relative bg-black pt-12 pb-24 px-4">
        <div className="relative z-10 flex w-full flex-col items-center gap-6">
             <div className="z-40 w-full max-w-xs sm:max-w-md mt-10">
                <Link href="/funil" passHref legacyBehavior>
                    <a className='w-full'>
                        <Button 
                            size="lg" 
                            className="button-shine-gradient text-black hover:text-black text-sm md:text-lg font-bold w-full rounded-full h-16 animate-fade-in-up animate-subtle-pulse shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95"
                            style={{ animationDelay: '1.2s' }}
                        >
                            QUERO PARTICIPAR DO TREINAMENTO
                        </Button>
                    </a>
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
