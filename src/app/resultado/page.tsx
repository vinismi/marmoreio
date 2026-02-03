'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Box, Gem, AlertTriangle, ShieldCheck, CheckCircle, MoveHorizontal, Sparkles, Smartphone, Video, Palette, Rocket, Coins, Zap, Clock, CreditCard, Shield, Users, FileText } from 'lucide-react';
import GoldenParticles from '@/components/particles';
import UpsellFlow from '@/components/upsell-flow';
import WistiaWebPlayer from '@/components/wistia-web-player';
import TestimonialCarousel from '@/components/testimonial-carousel';
import WistiaEmbed from '@/components/wistia-embed';
import BeforeAfterSlider from '@/components/before-after-slider';
import { assessMarmorizedPattern } from '@/ai/flows/marmorized-pattern-assessment';
import SocialProofToast from '@/components/social-proof-toast';

export default function ResultadoPage() {
  const router = useRouter();
  const [startUpsell, setStartUpsell] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [bonusItemsVisible, setBonusItemsVisible] = useState([false, false, false, false, false]);
  const plansRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);

  // URLs de checkout
  const basicCheckoutUrl = "https://www.ggcheckout.com/checkout/v5/kinHlxMmxB9mSAelkzX5"; // R$5,99
  const completeCheckoutUrl = "https://www.ggcheckout.com/checkout/v5/m4slNQAn5ssCpFqXUmtS"; // R$14,99

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

  // Bônus Data - Originais
  const bonuses = [
    { name: "Como viver de pintura marmorizada", before: "R$ 47,00" },
    { name: "Transforme a técnica em renda extra ou principal", before: "R$ 37,00" },
    { name: "Guia completo de precificação", before: "R$ 67,00" },
    { name: "Como achar clientes que pagam bem", before: "R$ 47,00" },
    { name: "Melhores tintas, resinas e pigmentos", before: "R$ 37,00" },
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
      <SocialProofToast />
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
            <span className="text-sm font-bold text-amber-400 tracking-wider uppercase">💎 Obras Reais de Alunos</span>
          </div>

          <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 animate-fade-in-up leading-tight" style={{ animationDelay: '100ms' }}>
            OBRAS QUE NOSSOS ALUNOS COBRARAM <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500">R$ 12-28 MIL</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 mb-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            (Usando Exatamente o Que Você Vai Aprender)
          </p>

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

      {/* What You'll Receive Section - Ultra Premium Design */}
      <section className="relative bg-gradient-to-b from-[#080808] via-[#0d0d0d] to-[#050505] py-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/5 to-transparent rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/30 mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">🎁 Acesso Completo Liberado</span>
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Tudo que você vai{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                receber
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Sistema completo para dominar o marmorizado e faturar <span className="text-green-400 font-bold">R$ 15.000/mês</span> ou mais
            </p>
          </div>

          {/* Benefits Grid - Ultra Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              {
                title: "Técnicas Completas de Marmorização",
                subtitle: "Do básico ao avançado, passo a passo",
                icon: Palette,
                gradient: "from-pink-500 via-rose-500 to-red-500",
                glowColor: "rgba(244,63,94,0.4)"
              },
              {
                title: "Aulas em Vídeo HD",
                subtitle: "Aprenda no seu ritmo com conteúdo gravado",
                icon: Video,
                gradient: "from-violet-500 via-purple-500 to-indigo-500",
                glowColor: "rgba(139,92,246,0.4)"
              },
              {
                title: "Guia Completo de Precificação",
                subtitle: "Saiba exatamente quanto cobrar",
                icon: Coins,
                gradient: "from-amber-400 via-yellow-500 to-orange-500",
                glowColor: "rgba(245,158,11,0.4)"
              },
              {
                title: "Como Encontrar Clientes Premium",
                subtitle: "Técnicas para atrair quem paga bem",
                icon: Users,
                gradient: "from-cyan-400 via-sky-500 to-blue-500",
                glowColor: "rgba(14,165,233,0.4)"
              },
              {
                title: "Posicionamento em Redes Sociais",
                subtitle: "Destaque-se e atraia clientes pelo Instagram",
                icon: Smartphone,
                gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
                glowColor: "rgba(236,72,153,0.4)"
              },
              {
                title: "Modelos de Posts Prontos",
                subtitle: "Copie e cole para suas redes",
                icon: FileText,
                gradient: "from-emerald-400 via-green-500 to-teal-500",
                glowColor: "rgba(16,185,129,0.4)"
              },
              {
                title: "Plano de Ação R$15K/mês",
                subtitle: "Roteiro para escalar seus ganhos",
                icon: Rocket,
                gradient: "from-orange-400 via-red-500 to-pink-500",
                glowColor: "rgba(249,115,22,0.4)"
              },
              {
                title: "Acesso Vitalício + Atualizações",
                subtitle: "Nunca mais pague nada extra",
                icon: Zap,
                gradient: "from-lime-400 via-emerald-500 to-green-500",
                glowColor: "rgba(132,204,22,0.4)"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in-up overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${item.glowColor} 0%, transparent 60%)`,
                  }}
                ></div>

                {/* Animated Border Glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, ${item.gradient.split(' ').filter(c => c.startsWith('from-') || c.startsWith('via-') || c.startsWith('to-')).map(c => c.replace('from-', '').replace('via-', '').replace('to-', '')).join(',')})` }}></div>

                {/* Icon Container */}
                <div className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 8px 32px ${item.glowColor}` }}
                >
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow-lg" />
                </div>

                {/* Content */}
                <div className="relative flex-1 min-w-0">
                  <h3 className="font-bold text-white text-base md:text-lg leading-tight mb-1 group-hover:text-white transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors truncate">
                    {item.subtitle}
                  </p>
                </div>

                {/* Checkmark with Glow */}
                <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] transition-all duration-300">
                  <CheckCircle className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA - Premium */}
          <div className="mt-14 text-center animate-fade-in-up" style={{ animationDelay: '900ms' }}>
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:shadow-[0_0_60px_rgba(245,158,11,0.3)] transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-amber-400 font-black text-lg md:text-xl">+R$ 500 em bônus</p>
                <p className="text-amber-400/60 text-sm font-medium">Inclusos gratuitamente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gate Section - Replaces Area de Membros */}
      <section className="relative bg-[#050505] py-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black opacity-50"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              Vídeo Exclusivo para Você
            </span>
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-8 leading-tight animate-fade-in-up">
            VEJA COMO FUNCIONA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700">NA PRÁTICA</span>
          </h2>

          {/* Single Vertical Video */}
          <div className="relative group animate-fade-in-up max-w-[320px] mx-auto mb-12" style={{ animationDelay: '300ms' }}>
            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>

            {/* Phone Frame */}
            <div className="relative mx-auto bg-[#1a1a1a] rounded-[2.5rem] border-[4px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10">
              <div className="relative bg-black aspect-[9/16] w-full overflow-hidden">
                <WistiaWebPlayer mediaId="2tj2pzmgz2" aspect={0.5625} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-amber-400/60 text-sm font-bold uppercase tracking-widest animate-pulse">
              <Smartphone className="w-4 h-4" /> Assista até o final
            </div>
          </div>

          {/* Unlock Button */}
          {!isUnlocked && (
            <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <Button
                size="lg"
                className="button-shine-gradient text-black hover:text-black font-black w-full max-w-md mx-auto rounded-full h-20 text-lg md:text-xl shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] active:scale-95 transition-all duration-300 border-2 border-amber-400/30"
                onClick={() => {
                  setIsUnlocked(true);
                  setTimeout(() => {
                    testimonialsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                QUERO DESBLOQUEAR MEU ACESSO AGORA
              </Button>
              <p className="mt-4 text-gray-500 text-sm font-medium">Clique no botão acima para liberar os planos e bônus.</p>
            </div>
          )}
        </div>
      </section>

      {/* Conditional Content - Only visible after unlock */}
      {isUnlocked && (
        <div className="animate-fade-in">
          {/* Testimonials */}
          <section ref={testimonialsRef} className="flex flex-col items-center justify-center gap-8 bg-black py-16 px-6 md:py-24">
            {/* ... Testimonials Content ... */}

            {/* Stats Header */}
            <div className="text-center mb-8">
              <h2 className="font-headline text-2xl md:text-4xl font-black text-white mb-8">
                🏆 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">+1.847 PINTORES JÁ DOMINARAM A TÉCNICA</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">Veja Os Resultados Reais (e o $$ Que Eles Estão Faturando)</p>

              {/* Big Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl p-4 md:p-6">
                  <p className="text-2xl md:text-4xl font-black text-white">1.847</p>
                  <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Alunos Treinados</p>
                </div>
                <div className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-4 md:p-6">
                  <p className="text-2xl md:text-4xl font-black text-green-400">R$ 12.300</p>
                  <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Faturamento Médio/Mês</p>
                </div>
                <div className="bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-4 md:p-6">
                  <p className="text-2xl md:text-4xl font-black text-amber-400">R$ 94 MIL</p>
                  <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Maior Projeto de Aluno</p>
                </div>
              </div>
            </div>

            <div className='w-full max-w-4xl mx-auto'>
              <div className="space-y-8">
                <TestimonialCarousel videoIds={['6tdjfbsqle', 'xab9r7nndh']} />
                <TestimonialCarousel videoIds={['ihs0hcvo3h', 'foutga0xyz']} />
              </div>
            </div>
            <p className="mt-8 text-center text-lg md:text-xl max-w-3xl text-white/80">Assim como eles, você também pode começar <span className="text-amber-400 font-bold">do zero</span> e dominar o efeito marmorizado. Agora é só <span className="text-green-400 font-bold">escolher como quer começar</span>.</p>
          </section>

          {/* Plans Section */}
          <section ref={plansRef} className="relative py-20 px-4 overflow-hidden bg-[#050505]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-5xl relative z-10">

              {/* Header Agressivo */}
              <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-4 animate-pulse">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-red-500 tracking-wider uppercase">⚠️ TURMA FECHA EM 100 ALUNOS</span>
                </div>
                <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[0.95]">
                  ÚLTIMA TURMA ABERTA EM 2026
                </h2>
                <h3 className="font-headline text-2xl md:text-4xl font-black mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600">PARE DE COBRAR R$ 40/m² POR PINTURA SIMPLES</span>
                </h3>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                  Você já viu o potencial. Já viu os resultados.<br className="hidden md:block" />
                  <span className="text-white font-bold">Agora só falta VOCÊ tomar a decisão</span> que vai mudar seu jogo financeiro.
                </p>
              </div>

              {/* Barra de Urgência - Vagas */}
              <div className="w-full max-w-md mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20 rounded-xl p-4 border border-red-500/30">
                  <p className="text-sm text-gray-400 mb-2 text-center font-medium">VAGAS PREENCHIDAS</p>
                  <div className="w-full bg-black/50 rounded-full h-4 border border-white/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '83%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">83/100</span>
                    <span className="text-sm font-bold text-red-400 animate-pulse">🔥 RESTAM APENAS 17 VAGAS</span>
                  </div>
                </div>
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

                    {/* Benefits List - Clean & Premium */}
                    <div className="mb-8 relative z-10">
                      <div className="divide-y divide-white/5">
                        {[
                          { title: "Curso Completo em Vídeo", desc: "Do zero ao avançado", icon: Video },
                          { title: "Posicionamento nas Redes", desc: "Atraia clientes premium", icon: Smartphone },
                          { title: "Posts Prontos + Estratégia", desc: "Copie e ganhe seguidores", icon: Palette },
                          { title: "Plano até R$15K/mês", desc: "Passo a passo completo", icon: Rocket },
                          { title: "Acompanhamento VIP", desc: "Suporte no WhatsApp", icon: Zap }
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                          >
                            {/* Icon */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-amber-400" />
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white text-sm leading-tight">{item.title}</h4>
                              <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                            </div>

                            {/* Check */}
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full rounded-xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-500 hover:via-green-400 hover:to-emerald-400 text-white font-black text-lg md:text-xl h-20 shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group border-2 border-green-400/30"
                      onClick={() => openCheckout(completeCheckoutUrl)}
                    >
                      <span className="relative z-10 flex flex-col items-center justify-center leading-tight">
                        <span className="flex items-center gap-2 text-base md:text-xl">COMEÇAR MINHA TRANSFORMAÇÃO <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                        <span className="text-[10px] md:text-xs font-medium opacity-90 uppercase tracking-wider mt-1">🎉 Oferta Especial de Ano Novo</span>
                      </span>
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out"></div>
                    </Button>

                    {/* Trust badges - More Professional */}
                    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-lg">🔒</span>
                        <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">Compra Segura</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-lg">⚡</span>
                        <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">Acesso Imediato</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-lg">✅</span>
                        <span className="text-[9px] md:text-[10px] text-green-400 font-medium">30 Dias Garantia</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                      <Shield className="w-3 h-3" /> Seus dados estão protegidos
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
                  <ShieldCheck className="w-12 h-12 text-green-400" />
                  <h3 className="font-headline text-2xl md:text-3xl font-bold text-white">
                    🛡️ Garantia Incondicional de 30 Dias
                  </h3>
                </div>
                <p className="text-base md:text-lg text-gray-300 max-w-xl mb-4">
                  Se por qualquer motivo você não ficar satisfeito com o conteúdo, pode solicitar reembolso integral dentro de 30 dias. Sem burocracia. Sem perguntas. 100% do seu dinheiro de volta.
                </p>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-6 py-3 mt-2">
                  <p className="text-green-400 font-bold text-sm md:text-base">
                    🎁 BÔNUS: Se não gostar, devolvemos 100% + <span className="text-white">R$ 50,00</span> pelo seu tempo investido
                  </p>
                </div>
                <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
