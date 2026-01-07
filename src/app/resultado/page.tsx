'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Box, Gem, AlertTriangle, ShieldCheck, CheckCircle, MoveHorizontal, Sparkles, Smartphone, Video, Palette, Rocket, Coins, Zap, Clock, CreditCard, Shield } from 'lucide-react';
import GoldenParticles from '@/components/particles';
import UpsellFlow from '@/components/upsell-flow';
import WistiaWebPlayer from '@/components/wistia-web-player';
import TestimonialCarousel from '@/components/testimonial-carousel';
import WistiaEmbed from '@/components/wistia-embed';
import BeforeAfterSlider from '@/components/before-after-slider';
import { assessMarmorizedPattern } from '@/ai/flows/marmorized-pattern-assessment';

export default function ResultadoPage() {
  const router = useRouter();
  const [startUpsell, setStartUpsell] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [bonusItemsVisible, setBonusItemsVisible] = useState([false, false, false, false, false]);
  const plansRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);

  // URLs de checkout
  const basicCheckoutUrl = "https://www.ggcheckout.com/checkout/v4/kinHlxMmxB9mSAelkzX5";
  const completeCheckoutUrl = "https://www.ggcheckout.com/checkout/v4/m4slNQAn5ssCpFqXUmtS";

  // Helper to open checkout with UTMs
  const openCheckout = (url: string) => {
    const params = window.location.search;
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}${params.substring(1)}`, '_blank');
  };

  // Hero Image Data (simulated from previous context)
  const heroImage = {
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    description: 'Luxury marble texture background',
    imageHint: 'dark marble luxury gold veins'
  };

  // Transformations Data
  const transformations = [
    {
      id: 1,
      before: 'https://i.postimg.cc/j5SZ43ty/1-antes.png',
      after: 'https://i.postimg.cc/cHkT97L3/1-depois.png',
      priority: true
    },
    {
      id: 2,
      before: 'https://i.postimg.cc/85ztmXNT/2-antes.png',
      after: 'https://i.postimg.cc/Tw3CJNfb/2-depois.png',
      priority: false
    },
    {
      id: 3,
      before: 'https://i.postimg.cc/d1V4jNwd/3-antes.png',
      after: 'https://i.postimg.cc/k4gfvYqK/3-depois.png',
      priority: false
    }
  ];

  // Bônus Data
  const bonuses = [
    { name: "Como viver de pintura marmorizada", before: "R$ 9,99" },
    { name: "Transforme a técnica em renda extra ou principal", before: "R$ 12,99" },
    { name: "Guia completo de precificação", before: "R$ 7,99" },
    { name: "Como achar clientes que pagam bem", before: "R$ 14,99" },
    { name: "Melhores tintas, resinas e pigmentos", before: "R$ 8,99" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Animate bonus items appearing one by one
    const timers = bonuses.map((_, index) => {
      return setTimeout(() => {
        setBonusItemsVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 500 + (index * 200));
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (startUpsell) {
    return <UpsellFlow />;
  }

  return (
    <main className="overflow-x-hidden bg-black">
      {/* Bonus Section */}
      <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#0A0A0A] to-[#1E1500] p-6 text-foreground overflow-hidden origin-top transition-transform duration-300">
        <GoldenParticles visible={true} count={60} />
        {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} fill className="object-cover z-0 opacity-10 mix-blend-overlay" data-ai-hint={heroImage.imageHint} priority />}

        {/* Ambient Glow Behind Title */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center">

          {/* Badge de Conquista */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)] mb-8 animate-fade-in-up">
            <span className="text-xl">🏆</span>
            <span className="font-bold text-amber-400 tracking-wide uppercase text-sm md:text-base">Conquista Desbloqueada</span>
          </div>

          <h2 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter animate-fade-in-up mb-6" style={{ animationDelay: '200ms', lineHeight: 0.9 }}>
            <span className="block text-white mb-2 text-2xl md:text-4xl font-bold tracking-normal opacity-80">Parabéns!</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
              VOCÊ GANHOU <br /> OS BÔNUS!
            </span>
          </h2>

          <div className="w-full max-w-3xl mx-auto my-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <p className="text-lg md:text-2xl text-gray-200 font-medium leading-relaxed">
              Todos esses itens eram pagos... mas por ter completado o treino, você acabou de liberar o <span className="text-green-400 font-black bg-green-400/10 px-2 py-1 rounded border border-green-400/20 shadow-[0_0_15px_rgba(74,222,128,0.3)]">ACESSO GRATUITO</span> a todos eles!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mt-4 px-2">
            {bonuses.map((bonus, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "group relative flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/50 hover:bg-black/60",
                    bonusItemsVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  )}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl md:text-3xl shadow-lg shadow-amber-500/20">
                    {['💰', '🔥', '📊', '🎯', '🎨'][index]}
                  </div>

                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-white text-base md:text-lg leading-tight mb-1 group-hover:text-amber-300 transition-colors">{bonus.name}</h4>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-red-400/70 line-through font-medium">{bonus.before}</span>
                      <span className="text-green-400 font-bold bg-green-400/10 px-1.5 rounded text-xs md:text-sm border border-green-400/20">GRÁTIS HOJE</span>
                    </div>
                  </div>

                  <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="text-green-400 w-6 h-6" />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 animate-bounce">
            <p className="text-amber-400/80 text-sm font-bold tracking-widest uppercase">Role para baixo para ver mais</p>
            <div className="w-px h-8 bg-gradient-to-b from-amber-400/0 via-amber-400 to-amber-400/0 mx-auto mt-2"></div>
          </div>
        </div>
      </div>

      {/* Transformations Section */}
      <section className="relative bg-black py-16 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-400 tracking-wider uppercase">Resultados Reais de Alunos</span>
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            TRANSFORMAÇÕES <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">INCRÍVEIS</span>
          </h2>

          {/* Interactive Instruction */}
          <div className="flex items-center justify-center gap-3 mb-12 animate-pulse">
            <MoveHorizontal className="text-white/50 w-6 h-6" />
            <p className="text-sm md:text-base text-white/70 font-bold uppercase tracking-widest border-b border-white/20 pb-0.5">
              Arraste para comparar
            </p>
            <MoveHorizontal className="text-white/50 w-6 h-6" />
          </div>

          <div className="flex flex-col items-center gap-16">
            {transformations.map((t, index) => (
              <div key={t.id} className="relative w-full group animate-fade-in-up" style={{ animationDelay: `${200 + index * 100}ms` }}>
                {/* Decorative border/glow for each slider */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-white/10 to-amber-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
                  <BeforeAfterSlider
                    before={t.before}
                    after={t.after}
                    priority={t.priority}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Info Section - Compact Version */}
      <section className="relative bg-[#080808] py-12 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black opacity-40"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="font-headline text-2xl md:text-4xl font-black text-white mb-2">
              O QUE VOCÊ VAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">DOMINAR</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {[
              { icon: Gem, title: 'Acesso Vitalício', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
              { icon: Video, title: 'Aulas em Vídeo', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
              { icon: Palette, title: '300 Modelos', color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
              { icon: Rocket, title: 'Resultado Rápido', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
              { icon: Coins, title: 'Renda Real', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
              { icon: Smartphone, title: '100% Online', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
            ].map((item, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center justify-center p-4 rounded-xl border ${item.border} bg-[#111] hover:bg-[#161616] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`p-2.5 rounded-full ${item.bg} ${item.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-xs md:text-sm text-center text-white leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll REALLY Receive Section */}
      <section className="relative bg-[#050505] py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Por dentro da plataforma
            </span>
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            VEJA O QUE TE ESPERA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700">POR DENTRO DO CURSO</span>
          </h2>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Uma área de membros exclusiva, moderna e fácil de usar. Assista onde quiser: no seu computador, tablet ou celular.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end justify-center">

            {/* Desktop Mockup */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative mx-auto bg-[#1a1a1a] rounded-t-xl border-t border-l border-r border-[#333] p-2 pb-0 shadow-2xl w-full max-w-lg">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-32 bg-[#111] rounded-b-lg flex items-center justify-center gap-2 z-20">
                  <div className="w-1 h-1 rounded-full bg-[#333]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0f0]"></div>
                </div>
                <div className="relative overflow-hidden rounded-t-lg bg-black aspect-video border border-[#333]">
                  <WistiaWebPlayer mediaId="gfij5gu2lb" aspect={1.7777777778} />
                </div>
              </div>
              <div className="relative mx-auto bg-[#222] h-4 w-full max-w-[560px] rounded-b-xl shadow-xl border-t border-[#333]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#333] rounded-b-md"></div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
                <Box className="w-4 h-4 text-amber-500" /> Versão para Computador
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
              {/* Phone Frame */}
              <div className="relative mx-auto bg-[#1a1a1a] rounded-[3rem] border-[6px] border-[#2a2a2a] shadow-2xl w-[300px] overflow-hidden ring-1 ring-white/10">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-20 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-4 bg-[#111] rounded-full opacity-50"></div>
                </div>

                {/* Screen */}
                <div className="relative bg-black aspect-[9/16] w-full overflow-hidden rounded-[2.5rem]">
                  <WistiaWebPlayer mediaId="k69ofj609q" aspect={0.5625} />
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20 pointer-events-none"></div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
                <Smartphone className="w-4 h-4 text-amber-500" /> Versão para Celular
              </div>
            </div>
          </div>

          <div className="mt-20 max-w-3xl mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-500" /> <span>Acesso Vitalício</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-500" /> <span>Certificado Incluso</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-500" /> <span>Suporte VIP</span>
              </div>
            </div>

            <Button
              size="lg"
              className="button-shine-gradient text-black hover:text-black font-bold w-full max-w-md mx-auto rounded-full h-auto py-4 md:h-16 text-base md:text-xl animate-subtle-pulse shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] active:scale-95 transition-all duration-300"
              onClick={() => scrollTo(plansRef)}
            >
              QUERO ACESSAR A PLATAFORMA
            </Button>
            <p className="mt-4 text-sm text-gray-500">Acesso liberado imediatamente após a compra.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="flex flex-col items-center justify-center gap-8 bg-black py-16 px-6 md:py-24">
        <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center text-white">Quem aprendeu essa técnica está mudando de vida</h2>
        <div className='w-full max-w-4xl mx-auto'>
          <div className="space-y-8">
            <TestimonialCarousel videoIds={['6tdjfbsqle', 'xab9r7nndh']} />
            <TestimonialCarousel videoIds={['ihs0hcvo3h', 'foutga0xyz']} />
          </div>
        </div>
        <p className="mt-8 text-center text-lg md:text-xl max-w-3xl text-white/80">Assim como eles, você também pode começar do zero e dominar o efeito marmorizado. Agora é só escolher como quer começar.</p>
      </section>

      {/* Plans Section */}
      <section ref={plansRef} className="relative py-20 px-4 overflow-hidden bg-[#050505]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10">

          {/* Header Agressivo */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6 animate-pulse">
              <Clock className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-red-500 tracking-wider uppercase">Oferta por tempo limitado</span>
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-6 leading-none">
              SUA NOVA VIDA <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600">COMEÇA AGORA</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Você já viu o potencial. Já viu os resultados. <br className="hidden md:block" />
              Agora só falta você tomar a decisão que vai mudar o seu jogo financeiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">

            {/* Plano Básico (Decoy) */}
            <div className="order-2 md:order-1 flex flex-col p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-300 opacity-80 hover:opacity-100 scale-95">
              <div className="mb-4">
                <h3 className="font-headline text-xl font-bold text-gray-400">Acesso Básico</h3>
                <p className="text-sm text-gray-500">Apenas o essencial</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">R$ 5,99</span>
                <span className="text-sm text-gray-500 ml-2">pagamento único</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-400">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Acesso ao conteúdo escrito</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Lista de materiais</li>
                <li className="flex items-center gap-2 text-gray-600 line-through"><Video className="w-4 h-4" /> Aulas em Vídeo</li>
                <li className="flex items-center gap-2 text-gray-600 line-through"><Gem className="w-4 h-4" /> 5 Bônus Exclusivos</li>
                <li className="flex items-center gap-2 text-gray-600 line-through"><ShieldCheck className="w-4 h-4" /> Certificado Profissional</li>
              </ul>
              <Button
                variant="outline"
                className="w-full rounded-xl border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white font-semibold h-12"
                onClick={() => setStartUpsell(true)}
              >
                Quero apenas o básico
              </Button>
            </div>

            {/* Plano Completo (Hero) */}
            <div className="order-1 md:order-2 relative flex flex-col p-1 rounded-3xl bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-700 shadow-[0_0_60px_rgba(245,158,11,0.5)] transform md:scale-110 z-20 animate-fade-in-up hover:shadow-[0_0_80px_rgba(245,158,11,0.7)] transition-all duration-500" style={{ animationDelay: '200ms' }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-2 rounded-full font-black text-base uppercase tracking-wide shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center gap-2 whitespace-nowrap animate-pulse z-30">
                <Sparkles className="w-5 h-5 fill-current" /> OPORTUNIDADE ÚNICA
              </div>

              <div className="flex-1 bg-[#0a0a0a] rounded-[22px] p-6 md:p-8 overflow-hidden relative border-2 border-amber-500/50">
                {/* Background Shine */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="mb-8 relative z-10 text-center border-b border-white/10 pb-6">
                  <h3 className="font-headline text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">COMPLETO + BÔNUS</h3>
                  <p className="text-amber-400 font-bold text-sm uppercase tracking-widest">O pacote definitivo para lucrar</p>
                </div>

                <div className="mb-8 relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-gray-500 text-xl line-through font-medium">R$ 97,90</span>
                    <span className="text-xs font-bold bg-green-500 text-black px-2 py-1 rounded uppercase">85% OFF</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-7xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">14,99</span>
                    <span className="text-xl font-bold text-gray-400 self-start mt-4">R$</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-3 font-medium">Pagamento único • Sem mensalidades</p>
                </div>

                <div className="flex flex-col gap-3 mb-10 relative z-10">
                  {[
                    { title: "Curso Completo em Vídeo", desc: "Do zero ao avançado", icon: Video },
                    { title: "5 Bônus Exclusivos", desc: "Desbloqueados hoje", icon: Gem },
                    { title: "Acesso Vitalício", desc: "Assista onde quiser", icon: Zap },
                    { title: "Suporte VIP", desc: "Direto no WhatsApp", icon: Smartphone }
                  ].map((item, i) => (
                    <div key={i} className="relative overflow-hidden group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative p-2.5 rounded-lg bg-black/50 border border-white/10 group-hover:border-amber-500/50 group-hover:text-amber-400 text-white/70 transition-colors shadow-lg">
                        <item.icon className="w-5 h-5" />
                      </div>

                      <div className="relative flex-1">
                        <h4 className="font-bold text-white text-base leading-tight group-hover:text-amber-100 transition-colors">{item.title}</h4>
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wider mt-0.5 group-hover:text-amber-500/70 transition-colors">{item.desc}</p>
                      </div>

                      <div className="relative">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-black text-xl h-20 shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                  onClick={() => openCheckout(completeCheckoutUrl)}
                >
                  <span className="relative z-10 flex flex-col items-center justify-center leading-tight">
                    <span className="flex items-center gap-2">QUERO ACESSO TOTAL <Rocket className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></span>
                    <span className="text-xs font-medium opacity-90 uppercase tracking-wide mt-1">Desconto encerra em breve</span>
                  </span>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out"></div>
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-gray-500 uppercase tracking-wider font-bold">
                  <Shield className="w-3 h-3" /> Compra 100% Segura e Garantida
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-amber-400 font-bold text-lg mb-2">⚡ O primeiro trabalho paga o curso.</p>
            <p className="text-gray-400 text-sm">
              Pense comigo: com R$ 14,99 você não compra nem uma pizza hoje em dia. Mas com esse conhecimento, você pode faturar R$ 300, R$ 500 ou até R$ 1.000 em um único dia de trabalho. <span className="text-white font-bold">O risco é zero e o retorno é infinito.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Guarantee and Support Section */}
      <section ref={guaranteeRef} id="garantia" className="relative bg-black text-white py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-marble.png')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
        <div className="relative z-10 container mx-auto flex flex-col items-center justify-center gap-8 max-w-4xl text-center">
          {/* Guarantee Block */}
          <div className="flex flex-col items-center">
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
        </div>
      </section>


    </main>
  );
}
