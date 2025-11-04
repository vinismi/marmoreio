'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Box, Gem, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';
import GoldenParticles from '@/components/particles';
import UpsellFlow from '@/components/upsell-flow';
import TestimonialCarousel from '@/components/testimonial-carousel';
import BeforeAfterSlider from '@/components/before-after-slider';
import WistiaEmbed from '@/components/wistia-embed';

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
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.29 4.94L2 22l5.09-1.34a9.87 9.87 0 0 0 4.86 1.24h.01c5.46 0 9.91-4.45 9.91-9.91C22 6.45 17.55 2 12.05 2zM17 15.23c-.11.31-.41.59-1.2.78s-1.42.23-2.15.11a7.84 7.84 0 0 1-3.78-2.14c-.62-.62-1.12-1.36-1.36-1.74s-.37-1.31-.78-2.04c-.12-.73-.08-1.36.11-2.15s.47-1.09.78-1.2c.31-.11.63-.16.88-.16s.5.04.71.08c.21.04.38.08.5.2s.2.28.23.46.04.33.04.42-.04.15-.08.2c-.04.04-.08.08-.12.12l-.28.32c-.12.12-.2.24-.28.36s-.12.28-.08.42.16.33.32.54c.16.21.36.42.58.67s.46.5.71.75.5.46.75.71.46.38.67.58c.21.16.38.28.54.32s.28,0,.42-.08.28-.2.36-.28.2-.16.32-.28l.28-.24c.12-.12.24-.2.36-.28s.28-.12.42-.08.33.16.54.32c.21.16.38.36.58.58s.36.46.46.71c.11.25.16.54.16.84-.01.3-.05.59-.17.88z" />
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
              {bonuses.map((bonus, index) => {
                  return (
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
                )
              })}
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
                priority={t.id === 't1'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Receive Section */}
      <section className="dark relative bg-black py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-marble.png')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="rounded-xl border border-amber-500/30 bg-black/30 p-8 shadow-golden backdrop-blur-sm">
            <h3 className="font-headline text-2xl font-bold text-accent mb-4 text-center">✨ Como funciona o curso Efeito Marmorizado:</h3>
            <ul className="space-y-4 text-base text-left md:text-lg text-white/90 max-w-3xl mx-auto">
              <li className="flex items-start gap-3"><span className='text-xl pt-1'>💡</span><span>O acesso é instantâneo e vitalício, liberado assim que o pagamento é confirmado.</span></li>
              <li className="flex items-start gap-3"><span className='text-xl pt-1'>📘</span><span>Dentro da plataforma, você vai encontrar mais de 300 modelos e efeitos diferentes de pintura marmorizada, com instruções passo a passo.</span></li>
              <li className="flex items-start gap-3"><span className='text-xl pt-1'>🧰</span><span>Todo o conteúdo é 100% online e pode ser acessado pelo celular, tablet ou computador, de onde quiser.</span></li>
              <li className="flex items-start gap-3"><span className='text-xl pt-1'>⚙️</span><span>Você aprenderá desde os fundamentos até os efeitos avançados incluindo pisos, paredes e combinações profissionais com brilho e resina.</span></li>
              <li className="flex items-start gap-3"><span className='text-xl pt-1'>🎨</span><span>É o material mais completo do mercado pra quem quer aprender de verdade e começar a aplicar ainda hoje.</span></li>
            </ul>
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
      </section>

      {/* What You'll REALLY Receive Section */}
      <section className="dark relative bg-black py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-marble.png')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h2 
            className="font-headline text-3xl md:text-4xl font-extrabold text-accent mb-4"
            style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.2)' }}
          >
            VEJA EXATAMENTE O QUE VOCÊ VAI RECEBER AO ENTRAR HOJE 👇
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-12">Assista aos vídeos abaixo e veja como é o acesso completo à plataforma disponível pra computador 💻 e celular 📱. Você vai aprender passo a passo em uma área profissional e fácil de usar.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
            {/* Desktop Video */}
            <div className="w-full max-w-xl mx-auto rounded-lg border border-amber-500/30 p-1.5 shadow-2xl shadow-amber-500/10">
              <div className="overflow-hidden rounded-md">
                <WistiaEmbed mediaId="gfij5gu2lb" />
              </div>
            </div>

            {/* Mobile Video */}
            <div className="w-full max-w-xs mx-auto rounded-lg border border-amber-500/30 p-1.5 shadow-2xl shadow-amber-500/10">
              <div className="overflow-hidden rounded-md">
                <WistiaEmbed mediaId="k69ofj609q" />
              </div>
            </div>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4">Tudo isso é 100% online e vitalício acesse quando e onde quiser.</p>
            <p className="text-base md:text-lg text-gray-300">Seja pelo computador, tablet ou celular, você vai aprender com clareza, suporte e acesso completo à comunidade exclusiva.</p>
            
            <div className="mt-8">
              <Button 
                size="lg" 
                className="button-shine-gradient text-black hover:text-black text-base md:text-lg font-bold w-full max-w-md mx-auto rounded-full h-16 md:h-14 animate-subtle-pulse shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95"
                onClick={() => scrollTo(plansRef)}
              >
                🟨 QUERO TER ACESSO À PLATAFORMA AGORA
              </Button>
            </div>
          </div>
        </div>
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
                     <div className="w-full text-left text-black/80 font-medium px-4 my-6 space-y-3">
                        <h4 className='font-headline text-lg text-black font-bold text-center mb-4'>💎 Você vai receber:</h4>
                        <p className='flex items-center gap-2'><CheckCircle className='w-5 h-5 text-green-800' /> Acesso vitalício à plataforma</p>
                        <p className='flex items-center gap-2'><CheckCircle className='w-5 h-5 text-green-800' /> Mais de 300 modelos e efeitos exclusivos</p>
                        <p className='flex items-center gap-2'><CheckCircle className='w-5 h-5 text-green-800' /> Guia completo para pisos, paredes e técnicas de brilho</p>
                        <p className='flex items-center gap-2'><CheckCircle className='w-5 h-5 text-green-800' /> Suporte via WhatsApp e e-mail após a compra</p>
                        <p className='font-bold mt-3'>✅ Todos os 5 bônus desbloqueados:</p>
                        <ol className="list-decimal list-inside space-y-2 pl-2">
                           <li>💰 Como viver de pintura marmorizada</li>
                           <li>🔥 Transforme a técnica em renda extra ou principal</li>
                           <li>📊 Guia completo de precificação profissional</li>
                           <li>🎯 Como achar clientes que pagam bem</li>
                           <li>🎨 Melhores tintas, resinas e pigmentos do mercado</li>
                        </ol>
                        <p className='text-center font-bold text-black mt-4'>✨ Tudo isso liberado imediatamente após a compra!</p>
                    </div>

                    <div className='my-4'>
                      <p className="text-5xl font-extrabold text-black">R$ 14,99</p>
                      <p className="text-base text-black/70"><del>de R$ 53,99</del></p>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full rounded-full bg-black text-amber-400 hover:bg-gray-800 font-bold text-base shadow-lg hover:shadow-2xl transition-all h-auto py-3 leading-tight flex flex-col"
                      onClick={() => window.open('https://www.ggcheckout.com/checkout/v2/m4slNQAn5ssCpFqXUmtS', '_blank')}
                    >
                      GARANTIR O PACOTE COMPLETO
                      <span className="text-xs font-normal opacity-80 mt-1">Acesso imediato + todos os bônus liberados agora 🔓</span>
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
              onClick={() => window.open('https://wa.me/5534988790436?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20curso!', '_blank')}
            >
              <WhatsAppIcon className="w-8 h-8 mr-3" />
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
        href="https://wa.me/5534988790436?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20curso!"
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
