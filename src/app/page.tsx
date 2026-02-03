
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
          {/* Single Premium Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-amber-400/60 backdrop-blur-sm animate-fade-in-up">
            <span className="text-amber-400 text-lg">✨</span>
            <span className="text-sm md:text-base font-bold text-amber-200 tracking-widest uppercase">A Técnica Mais Lucrativa do Brasil</span>
            <span className="text-amber-400 text-lg">✨</span>
          </div>

          {/* Main Impact Headline */}
          <div className="animate-fade-in-up w-full text-center mt-2" style={{ animationDelay: '0.15s' }}>
            {/* Big Number - Hero Impact */}
            <div className="relative mb-2">
              <h1 className="font-headline text-6xl min-[400px]:text-7xl sm:text-8xl md:text-9xl font-black leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-300 via-emerald-400 to-green-500"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(74, 222, 128, 0.5))',
                    WebkitTextStroke: '1px rgba(74, 222, 128, 0.3)'
                  }}>
                  +R$15K
                </span>
              </h1>
              <p className="font-headline text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-black text-white/90 -mt-1">
                POR MÊS
              </p>
            </div>

            {/* Technique Name - Golden - BIGGER */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 mb-4">
              <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-amber-400/70"></div>
              <span className="font-headline text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 tracking-wider"
                style={{ filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.6))' }}>
                EFEITO MÁRMORE
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl animate-float">💎</span>
              <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-amber-400/70"></div>
            </div>

            {/* Sub-hook - BIGGER */}
            <p className="text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl font-semibold text-white/80 mt-4 max-w-3xl mx-auto leading-relaxed px-2">
              O método completo que está fazendo <span className="text-white font-bold">pintores comuns</span> faturarem como <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 font-bold">profissionais de elite</span> em apenas 7 dias
            </p>
          </div>

          {/* Trust Indicators - More Premium */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/15 to-emerald-500/10 border border-green-500/40">
              <span className="text-green-400 text-sm font-bold">✓ +1.847 Alunos</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-500/40">
              <span className="text-amber-400 text-sm font-bold">⚡ Resultado em 7 Dias</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/30">
              <span className="text-white/90 text-sm font-bold">🏆 #1 Brasil</span>
            </div>
          </div>

          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 mt-2 animate-pulse">
            <span className="text-base">🔥</span>
            <span className="text-xs sm:text-sm font-black text-red-300 tracking-wider uppercase">Última Turma 2026 • Vagas Limitadas</span>
            <span className="text-base">🔥</span>
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
                <span>COMEÇAR AGORA →</span>
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
