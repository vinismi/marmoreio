
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
import { Sparkles } from 'lucide-react';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch the funnel page for a faster transition
    router.prefetch('/funil');
  }, [router]);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="dark relative flex min-h-screen flex-col items-center justify-center bg-black p-5 pb-20 text-center text-foreground md:pb-5">
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
              className="font-headline text-5xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-7xl lg:text-8xl animate-fade-in-up max-w-4xl"
              style={{ textShadow: '0 0 15px rgba(0,0,0,0.7)', animationDelay: '0.2s', lineHeight: '1.2' }}
            >
              TRANSFORME QUALQUER PAREDE OU PISO EM UM <span className="text-gradient-gold animated-text-gradient" style={{textShadow: '0 0 35px hsla(var(--accent), 0.9), 0 2px 2px rgba(0,0,0,0.5)'}}>MÁRMORE DE LUXO. <span className="text-4xl md:text-6xl align-middle">💎</span></span>
            </h1>
            
            <p 
              className="mt-2 text-lg md:text-xl font-medium text-white/95 animate-fade-in-up"
              style={{ animationDelay: '0.4s', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              A técnica que mais gera contratos para pintores em 2024.
            </p>

            <div 
              className="flex flex-col gap-5 my-6 text-white/90 text-lg md:text-xl animate-fade-in-up"
              style={{ animationDelay: '0.6s', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              <p className="flex items-center justify-center gap-3"><Sparkles className="text-amber-400 size-7" style={{filter: 'drop-shadow(0 0 5px hsl(var(--accent)))'}}/> Pintores comuns estão faturando alto</p>
              <p className="flex items-center justify-center gap-3"><Sparkles className="text-amber-400 size-7" style={{filter: 'drop-shadow(0 0 5px hsl(var(--accent)))'}}/> Materiais simples, resultados de luxo</p>
              <p className="flex items-center justify-center gap-3"><Sparkles className="text-amber-400 size-7" style={{filter: 'drop-shadow(0 0 5px hsl(var(--accent)))'}}/> Aprenda rápido e aplique no mesmo dia</p>
            </div>
            
            <p 
              className="text-base md:text-lg text-white/80 animate-fade-in-up"
              style={{ animationDelay: '0.8s', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              Você aprende do zero e cria efeitos iguais aos profissionais.
            </p>


            <div className="z-20 w-full mt-8">
              <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent mx-auto my-8 animate-fade-in-up" style={{ animationDelay: '1s' }}></div>
              <ShowcaseCarousel />
            </div>

             <div className="z-40 w-full max-w-md mt-10">
                <Link href="/funil" passHref legacyBehavior>
                    <a className='w-full'>
                        <Button 
                            size="lg" 
                            className="button-shine-gradient text-black hover:text-black text-lg font-bold w-full rounded-full h-14 md:text-lg animate-fade-in-up animate-subtle-pulse shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95"
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
