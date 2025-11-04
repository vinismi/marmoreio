'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import ShowcaseCarousel from '@/components/showcase-carousel';
import GoldenParticles from '@/components/particles';
import Link from 'next/link';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="dark relative flex min-h-screen flex-col items-center justify-center bg-black p-5 pb-12 text-center text-foreground md:pb-5">
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
        
        <div className="relative z-10 flex flex-col items-center gap-6 p-4 origin-top scale-[.8] sm:scale-100 transition-transform duration-300">
            <h1 
              className="font-headline text-3xl font-extrabold uppercase tracking-normal text-white md:text-5xl lg:text-6xl animate-fade-in-up max-w-4xl"
              style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)', animationDelay: '0.2s' }}
            >
              TRANSFORME QUALQUER PAREDE OU PISO EM UM <span className="text-gradient-gold animated-text-gradient" style={{textShadow: '0 0 22px hsla(var(--accent), 0.7)'}}>MÁRMORE DE LUXO. 💎</span>
            </h1>
            
            <div 
              className="flex flex-col gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <p className="max-w-3xl text-lg text-white/90 md:text-xl">Aprenda a técnica que está fazendo pintores comuns faturarem com pisos e paredes marmorizadas usando materiais simples e baratos.</p>
              <div className="mt-2 rounded-lg bg-amber-400/10 px-4 py-2 border border-amber-400/20 max-w-2xl mx-auto">
                <p className="text-base text-white/80 md:text-base">Participe do treino interativo gratuito e desbloqueie bônus exclusivos pra dominar essa arte valorizada.</p>
              </div>
            </div>

            <div className="z-20 w-full">
              <ShowcaseCarousel />
            </div>

            <div className="z-40 w-full max-w-md mt-6">
                <Link href="/funil" passHref legacyBehavior>
                    <a className='w-full'>
                        <Button 
                            size="lg" 
                            className="button-shine-gradient text-black hover:text-black text-lg font-bold w-full rounded-full h-14 md:text-lg animate-fade-in-up animate-subtle-pulse shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95"
                            style={{ animationDelay: '0.8s' }}
                        >
                            <Zap className="mr-2 group-hover:animate-pulse" /> 🔥 QUERO PARTICIPAR DO TREINAMENTO INTERATIVO
                        </Button>
                    </a>
                </Link>
            </div>
            
            <div className="z-30 mt-4">
              <Badge variant="secondary" className="animate-fade-in-up bg-black/30 border-white/20 text-white shadow-lg" style={{ animationDelay: '1s' }}>
                🔥 +7.000 pintores já aplicaram essa técnica!
              </Badge>
            </div>
        </div>
      </section>
    </main>
  );
}
