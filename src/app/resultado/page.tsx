'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Box, Gem, Sparkles, AlertTriangle } from 'lucide-react';
import GoldenParticles from '@/components/particles';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

const bonuses = [
    { name: '💰 Como viver de pintura marmorizada', before: 'R$ 9,99', now: 'GRÁTIS' },
    { name: '🔥 Transforme a técnica em renda extra ou principal', before: 'R$ 12,99', now: 'GRÁTIS' },
    { name: '📊 Guia completo de precificação', before: 'R$ 7,99', now: 'GRÁTIS' },
    { name: '🎯 Como achar clientes que pagam bem', before: 'R$ 14,99', now: 'GRÁTIS' },
    { name: '🎨 Melhores tintas, resinas e pigmentos', before: 'R$ 8,99', now: 'GRÁTIS' },
];

const testimonials = [
    { quote: "Aprendi com o método e comecei a fazer pisos decorativos no meu bairro. Hoje já estou cobrando R$ 220/m².", author: "Rafael, SP" },
    { quote: "Comecei com o básico e agora faço paredes marmorizadas, os clientes amam!", author: "Carlos, MG" },
    { quote: "O curso me ensinou o que ninguém mostra no YouTube: como cobrar e onde achar material bom e barato.", author: "Tiago, PR" },
];

export default function ResultPage() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  
  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const [bonusItemsVisible, setBonusItemsVisible] = useState<boolean[]>(new Array(bonuses.length).fill(false));
  
  useEffect(() => {
    const timers = bonuses.map((_, index) => 
      setTimeout(() => {
        setBonusItemsVisible(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, 200 + index * 150) // Staggered animation
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="overflow-x-hidden bg-black">
      {/* Bonus Section */}
      <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#0A0A0A] to-[#1E1500] p-6 text-foreground overflow-hidden">
          <GoldenParticles visible={true} count={20} />
          {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} fill className="object-cover z-0 opacity-5" data-ai-hint={heroImage.imageHint} />}
          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
            <div className="w-full text-center mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <p className="font-bold text-sm md:text-base text-accent animate-pulse">🔥 CONQUISTA DESBLOQUEADA – ACESSO VIP LIBERADO 🔥</p>
            </div>
            <h2 className="font-headline text-3xl font-extrabold md:text-5xl text-accent mb-3 animate-golden-glow animate-fade-in-up" style={{ animationDelay: '400ms' }}>🎉 VOCÊ CONSEGUIU!</h2>
            <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-3xl animate-fade-in-up" style={{ animationDelay: '600ms' }}>Todos esses módulos eram pagos... mas por ter completado o treino da IA, você acabou de desbloquear o acesso gratuito!</p>
            
            <div className="w-full max-w-2xl space-y-3">
              {bonuses.map((bonus, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-left p-4 rounded-xl border border-amber-500/40 bg-white/5 backdrop-blur-sm shadow-golden transition-all duration-500",
                      bonusItemsVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    )}
                  >
                    <p className="font-headline font-semibold text-base md:text-lg text-white flex-1">{bonus.name}</p>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-red-400 font-semibold">DE: <del>{bonus.before}</del></p>
                      <p className="text-base font-bold text-green-400">🔓 POR: {bonus.now}</p>
                    </div>
                  </div>
                ))}
            </div>

            <p className="mt-8 text-lg md:text-xl max-w-3xl text-foreground/80 animate-fade-in-up" style={{ animationDelay: '800ms' }}>💎 Aproveite: você acabou de liberar o mesmo conteúdo que os profissionais usam para lucrar com pintura decorativa.</p>
            
            <Button variant="ghost" className="mt-6 text-accent hover:text-accent/90 text-lg font-bold animate-fade-in-up" style={{ animationDelay: '1000ms' }} onClick={() => scrollTo(testimonialsRef)}>
                📣 VEJA O QUE DIZEM OS ALUNOS
            </Button>
          </div>
      </div>
      
      {/* Testimonials */}
      <section ref={testimonialsRef} className="flex flex-col items-center justify-center gap-8 bg-background py-16 px-6 md:py-24">
        <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center">Quem aprendeu essa técnica está mudando de vida</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-8 w-full">
            {testimonials.map((t, i) => (
                <Card key={i} className="bg-secondary/50 border-border">
                    <CardContent className="p-6">
                        <p className="text-lg italic">"{t.quote}"</p>
                        <p className="text-right font-bold mt-4">- {t.author}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <p className="mt-8 text-center text-lg md:text-xl max-w-3xl text-foreground/80">Assim como eles, você também pode começar do zero e dominar o efeito marmorizado. Agora é só escolher como quer começar.</p>
        <Button size="lg" className="mt-4 text-lg font-bold w-full max-w-xs rounded-full" onClick={() => scrollTo(plansRef)}>
            🚀 ESCOLHER MEU ACESSO
        </Button>
      </section>

      {/* Plans Section */}
      <section ref={plansRef} className="dark relative flex flex-col items-center justify-center gap-8 bg-black py-16 px-6 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-marble.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black"></div>
        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-extrabold md:text-4xl mb-4">Escolha como quer começar sua jornada</h2>
            <p className="text-lg text-primary-foreground/80 mb-12 max-w-3xl md:text-xl">Você desbloqueou todos os bônus e agora pode escolher entre o acesso básico ou o completo com tudo liberado.</p>
            <div className="grid grid-cols-1 gap-12 w-full md:grid-cols-2 md:gap-8 max-w-4xl mx-auto">
                {/* Plano Básico */}
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#111] border border-amber-500/25 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-amber-500/10 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <Box className="w-16 h-16 text-amber-400 mb-4"/>
                    <h3 className="font-headline text-2xl font-bold mb-2">Plano Básico</h3>
                    <p className="mb-6 h-12 text-base md:h-16 text-white/70">Curso essencial: fundamentos e aplicação do piso marmorizado.</p>
                    <p className="text-4xl font-extrabold mb-4 text-amber-400">R$ 5,99</p>
                    <Button size="lg" className="w-full rounded-full bg-amber-400 text-black hover:bg-amber-300 font-bold text-base shadow-[0_4px_14px_rgba(255,215,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,215,0,0.5)] transition-all">QUERO O ACESSO BÁSICO</Button>
                </div>
                {/* Plano Completo */}
                <div className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-300 shadow-2xl shadow-amber-500/30 transform transition-all duration-300 md:scale-105 hover:scale-110 animate-fade-in-up" style={{animationDelay: '400ms'}}>
                    <div className="absolute -top-4 bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg animate-pulse">🔥 MAIS ESCOLHIDO</div>
                    <Gem className="w-16 h-16 text-black mb-4 drop-shadow-lg"/>
                    <h3 className="font-headline text-3xl font-extrabold text-black mb-2">Plano Completo + Bônus</h3>
                    <p className="mb-6 h-12 text-base md:h-16 text-black/80 font-medium">Curso completo + 5 bônus desbloqueados (renda, precificação, clientes e tintas).</p>
                    <div className='my-4'>
                      <p className="text-5xl font-extrabold text-black">R$ 14,99</p>
                      <p className="text-base text-black/70"><del>de R$ 53,99</del></p>
                    </div>
                    <Button size="lg" className="w-full rounded-full bg-black text-amber-400 hover:bg-gray-800 font-bold text-base shadow-lg hover:shadow-2xl transition-all">GARANTIR O PACOTE COMPLETO</Button>
                </div>
            </div>

            <div className="mt-16 w-full max-w-3xl">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-8"></div>
              <div className="bg-[#2B1C00]/80 border border-amber-600 rounded-lg p-6 text-center animate-fade-in-up" style={{animationDelay: '600ms'}}>
                  <p className="text-base md:text-lg font-semibold text-white/90 leading-relaxed">
                    <AlertTriangle className="inline-block w-6 h-6 mr-2 text-amber-400 animate-pulse" />
                    <span className="font-bold text-amber-400">Oferta exclusiva</span> para quem completou o treino da IA. Ao sair da página, o desbloqueio pode ser perdido.
                  </p>
                  <p className="mt-4 text-base md:text-lg text-white/80">💡 O primeiro piso que você fizer já paga o curso inteiro. <span className='font-bold'>Escolha seu acesso e comece hoje!</span></p>
              </div>
            </div>
        </div>
      </section>
    </main>
  );
}
