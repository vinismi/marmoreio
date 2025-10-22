'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Box, Gem, AlertTriangle, ShieldCheck } from 'lucide-react';
import GoldenParticles from '@/components/particles';
import UpsellFlow from '@/components/upsell-flow';
import TestimonialCarousel from '@/components/testimonial-carousel';
import BeforeAfterSlider from '@/components/before-after-slider';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

const bonuses = [
    { name: '💰 Como viver de pintura marmorizada', before: 'R$ 9,99', now: 'GRÁTIS' },
    { name: '🔥 Transforme a técnica em renda extra ou principal', before: 'R$ 12,99', now: 'GRÁTIS' },
    { name: '📊 Guia completo de precificação', before: 'R$ 7,99', now: 'GRÁTIS' },
    { name: '🎯 Como achar clientes que pagam bem', before: 'R$ 14,99', now: 'GRÁTIS' },
    { name: '🎨 Melhores tintas, resinas e pigmentos', before: 'R$ 8,99', now: 'GRÁTIS' },
];

const videoTestimonials1 = ["6tdjfbsqle", "xab9r7nndh"];
const videoTestimonials2 = ["ihs0hcvo3h", "foutga0xyz"];

const transformations = [
  { id: 't1', before: 'https://i.postimg.cc/N0LdhbSS/1-antes.png', after: 'https://i.postimg.cc/13vvYb79/1-depois.png' },
  { id: 't2', before: 'https://i.postimg.cc/VkKKH2Zm/2-antes.png', after: 'https://i.postimg.cc/Z5wwDXsJ/2-depois.png' },
  { id: 't3', before: 'https://i.postimg.cc/bvdmXL4P/3-antes.png', after: 'https://i.postimg.cc/wjwwbnfr/3-depois.png' },
];


// SVG para o ícone do WhatsApp
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.75 13.96c.25.01.5.03.75.06v-1.1c-.25.02-.5.04-.75.05m-1.5 2.1c.25.02.5.04.75.06v-1.1c-.25.02-.5.04-.75.05m-1.5 2.08c.25.02.5.04.75.06v-1.1c-.25.02-.5.04-.75.05m-1.5 2.09c.25.02.5.04.75.06v-1.1c-.25.02-.5.04-.75.05M12 2C6.48 2 2 6.48 2 12c0 1.62.4 3.14 1.11 4.51L2 22l5.63-1.44A9.922 9.922 0 0 0 12 22a10 10 0 0 0 10-10c0-5.52-4.48-10-10-10m5.25 13.98c-.25.03-.5.05-.75.08v1.1c.25-.03.5-.05.75-.07m1.5-2.08c-.25.03-.5.05-.75.08v1.1c.25-.03.5-.05.75-.07m1.5-2.08c-.25.03-.5.05-.75.08v1.1c.25-.03.5-.05. ৭৫-.07m-6-1.02h-.03c-.52 0-1.02-.2-1.38-.57l-.09-.08l-2.7-2.64c-.2-.2-.34-.43-.43-.69c-.04-.13-.06-.26-.06-.39c0-.52.21-1.02.57-1.38l.08-.09c.36-.36.86-.57 1.38-.57h.02c.52 0 1.01.2 1.38.57l.09.08l2.69 2.64c.21.2.35.43.44.69c.04.13.06.26.06.39c0 .52-.21 1.02-.57 1.38l-.08.09a1.948 1.948 0 0 1-1.38.57M12 4.04A7.96 7.96 0 0 1 18.06 17.5a7.923 7.923 0 0 1-3.63 1.88l-1 .23l-3.32.85l.86-3.29l.21-.82a7.923 7.923 0 0 1 1.88-3.63A7.96 7.96 0 0 1 12 4.04"
    ></path>
  </svg>
);

function ResultContent() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const [startUpsell, setStartUpsell] = useState(false);
  
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

  if (startUpsell) {
    return <UpsellFlow />;
  }

  return (
    <main className="overflow-x-hidden bg-black">
      {/* Bonus Section */}
       <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#0A0A0A] to-[#1E1500] p-6 text-foreground overflow-hidden origin-top transition-transform duration-300">
          <GoldenParticles visible={true} count={40} />
          {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} fill className="object-cover z-0 opacity-5" data-ai-hint={heroImage.imageHint} priority />}
          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
            <div className="w-full text-center mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <p className="font-bold text-sm md:text-base text-accent animate-pulse" style={{textShadow: '0 0 8px hsl(var(--accent))'}}>🔥 CONQUISTA DESBLOQUEADA – ACESSO VIP LIBERADO 🔥</p>
            </div>
            <h2 className="font-headline text-3xl font-extrabold md:text-5xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <span>🎉</span>
              <span className="text-accent animate-golden-glow" style={{ textShadow: '0 0 15px rgba(255, 215, 0, 0.4)'}}>VOCÊ CONSEGUIU!</span>
            </h2>
             <p className="text-lg md:text-xl mb-8 text-foreground/90 max-w-3xl animate-fade-in-up" style={{ animationDelay: '600ms', lineHeight: '1.6' }}>Todos esses módulos eram pagos... mas por ter completado o treino da IA, você acabou de desbloquear o <span className="text-[#9FFF8C] font-bold" style={{textShadow: '0 0 8px rgba(144, 255, 120, 0.6)'}}>acesso gratuito!</span></p>
            
            <div className="w-full max-w-2xl space-y-3">
              {bonuses.map((bonus, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-left p-4 rounded-xl border border-amber-500/40 bg-gradient-to-br from-black/20 to-amber-900/20 backdrop-blur-sm shadow-golden transition-all duration-500 hover:scale-[1.03] hover:shadow-amber-500/30",
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
            
          </div>
      </div>
      
      {/* Transformations Section */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ textShadow: '0 0 8px rgba(255,215,0,0.4)' }}>
            Veja o poder da técnica marmorizada 🧱✨
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-4">
            Esses resultados foram feitos por alunos que aplicaram as técnicas ensinadas no curso.
          </p>
          <p className="text-sm md:text-base text-gray-400 mb-10">
            Arraste a linha nas imagens e veja o antes e depois das pinturas feitas com a técnica do curso.
          </p>
          
          <div className="flex flex-col items-center gap-20">
            {transformations.map(t => (
              <BeforeAfterSlider
                key={t.id}
                before={t.before}
                after={t.after}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="flex flex-col items-center justify-center gap-8 bg-background py-16 px-6 md:py-24">
        <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center">Quem aprendeu essa técnica está mudando de vida</h2>
        <div className='w-full max-w-6xl mx-auto space-y-8'>
          <TestimonialCarousel videoIds={videoTestimonials1} />
          <TestimonialCarousel videoIds={videoTestimonials2} />
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
            <h2 className="font-headline text-3xl font-extrabold md:text-4xl mb-2 text-white">🚀 Você chegou até o fim e agora é a hora de decidir.</h2>
            <p className="text-lg text-white/80 mb-10 max-w-3xl md:text-xl">A técnica tá aí, o desconto tá liberado e os bônus estão prontos pra você aplicar. <br/>⚡ <span className='font-bold'>O primeiro piso marmorizado que você fizer paga o curso inteiro.</span></p>
            
            <div className="grid grid-cols-1 gap-12 w-full md:grid-cols-2 md:gap-8 max-w-4xl mx-auto">
                {/* Plano Básico */}
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#111] border border-amber-500/25 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-amber-500/10 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <Box className="w-16 h-16 text-amber-400 mb-4"/>
                    <h3 className="font-headline text-2xl font-bold mb-2 text-white">Plano Básico</h3>
                    <p className="mb-6 h-12 text-base md:h-16 text-white/70">Curso essencial: fundamentos e aplicação do piso marmorizado.</p>
                    <p className="text-4xl font-extrabold mb-4 text-amber-400">R$ 5,99</p>
                    <Button 
                      size="lg" 
                      className="w-full rounded-full bg-amber-400 text-black hover:bg-amber-300 font-bold text-base shadow-[0_4px_14px_rgba(255,215,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,215,0,0.5)] transition-all"
                      onClick={() => setStartUpsell(true)}
                    >
                      QUERO O ACESSO BÁSICO
                    </Button>
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
                    <Button 
                      size="lg" 
                      className="w-full rounded-full bg-black text-amber-400 hover:bg-gray-800 font-bold text-base shadow-lg hover:shadow-2xl transition-all"
                      onClick={() => window.open('https://www.ggcheckout.com/checkout/v2/m4slNQAn5ssCpFqXUmtS', '_blank')}
                    >
                      GARANTIR O PACOTE COMPLETO
                    </Button>
                </div>
            </div>

            <p className="mt-12 text-lg text-white font-semibold">👉 Escolha seu acesso e começa ainda hoje. Quem tá aplicando, já tá faturando.</p>
            
            <div className="mt-16 w-full max-w-3xl">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-8"></div>
              <div className="bg-[#2B1C00]/80 border border-amber-600 rounded-lg p-6 text-center animate-fade-in-up" style={{animationDelay: '600ms'}}>
                  <p className="text-base md:text-lg font-semibold text-white/90 leading-relaxed">
                    <AlertTriangle className="inline-block w-6 h-6 mr-2 text-amber-400 animate-pulse" />
                    <span className="font-bold text-amber-400">Oferta exclusiva</span> para quem completou o treino da IA. Ao sair da página, o desbloqueio pode ser perdido.
                  </p>
              </div>
            </div>
        </div>
      </section>

      {/* Guarantee and Support Section */}
      <section ref={guaranteeRef} id="garantia" className="relative bg-black text-white py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-marble.png')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
        <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center gap-12 max-w-6xl">
          {/* Guarantee Block */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck className="w-12 h-12 text-accent" />
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-white">
                Garantia Incondicional de 7 Dias 🕒
              </h3>
            </div>
            <p className="text-base md:text-lg text-gray-300 max-w-xl">
              Se por qualquer motivo você não ficar satisfeito com o conteúdo, pode solicitar reembolso integral dentro de 7 dias. Sem burocracia. Sem perguntas. 100% do seu dinheiro de volta.
            </p>
            <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          </div>

          {/* WhatsApp Support Block */}
          <div className="flex-1 flex flex-col items-center text-center">
            <p className="text-lg text-white mb-4">
              Ainda tem dúvidas? Fale com nossa equipe agora mesmo 👇
            </p>
            <Button 
              size="lg"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg w-full max-w-sm rounded-full h-16 shadow-[0_0_18px_rgba(37,211,102,0.5)] hover:scale-105 transition-all duration-300 animate-subtle-pulse"
              onClick={() => window.open('https://wa.me/34988790436?text=Olá,%20tenho%20uma%20dúvida%20sobre%20o%20curso%20de%20piso%20marmorizado', '_blank')}
            >
              <WhatsAppIcon className="w-6 h-6 mr-3" />
              Falar com Suporte no WhatsApp
            </Button>
            <p className="text-sm text-white/80 mt-4">
              Suporte 24h por dia | Resposta em até alguns minutos 💬
            </p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/34988790436?text=Olá,%20tenho%20uma%20dúvida%20sobre%20o%20curso%20de%20piso%2marmorizado"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg animate-float"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </main>
  );
}


export default function ResultPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResultContent />
    </Suspense>
  );
}
