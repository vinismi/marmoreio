
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

        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-4 px-4 pt-8 md:px-6 md:pt-0">
          {/* Urgency Badge - Animated */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/30 via-orange-500/20 to-red-500/30 border border-red-500/50 mb-6 animate-fade-in-up animate-pulse">
            <span className="text-xl">🔥</span>
            <span className="text-base md:text-lg font-black text-white tracking-wider uppercase">ÚLTIMA TURMA 2026</span>
            <span className="text-xl">🔥</span>
          </div>

          {/* Main Headline - Bigger & Bolder */}
          <div className="animate-fade-in-up w-full text-center px-2" style={{ animationDelay: '0.2s' }}>
            {/* Line 1: "FATURE" */}
            <h1 className="font-headline text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] text-white mb-2"
              style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
              FATURE
            </h1>

            {/* Line 2: Price in Green */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="font-headline text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-emerald-400"
                style={{ textShadow: '0 0 30px rgba(74, 222, 128, 0.5)' }}>
                R$ 8-15K
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl animate-bounce">💰</span>
            </div>

            {/* Line 3: "/MÊS" */}
            <p className="font-headline text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-black text-white/80 mb-4">
              POR MÊS
            </p>
          </div>

          {/* Sub-headline with Golden Accent */}
          <div className="animate-fade-in-up mt-2" style={{ animationDelay: '0.3s' }}>
            <p className="font-headline text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-black text-center">
              <span className="text-white">COM </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500"
                style={{ filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))' }}>
                EFEITO MÁRMORE
              </span>
              <span className="ml-2 text-2xl sm:text-3xl md:text-4xl animate-float inline-block">💎</span>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="text-green-400 text-xs font-bold">✓ +1.847 Alunos</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
              <span className="text-amber-400 text-xs font-bold">⚡ Resultado em 7 Dias</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/20">
              <span className="text-white/80 text-xs font-bold">🏆 #1 Brasil</span>
            </div>
          </div>

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
                className="button-shine-gradient text-black hover:text-black text-base md:text-lg font-black w-full rounded-full h-16 animate-fade-in-up animate-subtle-pulse shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95 hover:-translate-y-1 transition-transform flex flex-col items-center justify-center gap-0.5"
                style={{ animationDelay: '1.2s' }}
              >
                <span>QUERO FATURAR R$ 8-15K/MÊS →</span>
                <span className="text-[10px] md:text-xs font-medium opacity-80">🎉 Oferta de Ano Novo • Última Turma 2026</span>
              </Button>

            </Link>

            {/* Trust Badges - Professional */}
            <div className="grid grid-cols-3 gap-2 mt-4 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
              <div className="flex flex-col items-center gap-0.5 text-center">
                <span className="text-sm">⚡</span>
                <span className="text-[9px] md:text-[10px] text-white/60 font-medium">Acesso Imediato</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 text-center">
                <span className="text-sm">🔒</span>
                <span className="text-[9px] md:text-[10px] text-white/60 font-medium">30 Dias Garantia</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 text-center">
                <span className="text-sm">🔥</span>
                <span className="text-[9px] md:text-[10px] text-amber-400 font-medium">17 Vagas</span>
              </div>
            </div>
          </div>

          <div className="z-30 mt-8">
            <Badge variant="secondary" className="animate-fade-in-up bg-black/30 border-white/20 text-white shadow-lg" style={{ animationDelay: '1.4s' }}>
              🏆 +1.847 pintores já dominaram essa técnica!
            </Badge>
          </div>
        </div>
      </section>
    </main>
  );
}
