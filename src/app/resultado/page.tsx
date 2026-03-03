'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, MoveHorizontal, Sparkles, Smartphone, Video, Palette, Rocket, Zap, Clock, Shield } from 'lucide-react';
import UpsellFlow from '@/components/upsell-flow';
import TestimonialCarousel from '@/components/testimonial-carousel';
import BeforeAfterSlider from '@/components/before-after-slider';
import MemberAreaDemo from '@/components/member-area-demo';
import Script from 'next/script';

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function AnimatedNumber({ target, prefix = '', suffix = '', duration = 2000 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let c = 0; const inc = target / 60;
    const t = setInterval(() => { c += inc; if (c >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(c)); }, duration / 60);
    return () => clearInterval(t);
  }, [started, target, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item py-4 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between gap-4"><h4 className="text-sm md:text-base font-bold text-gray-900 flex-1">{q}</h4><div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all" style={{ background: open ? 'var(--turquoise)' : '#F7F8FA', color: open ? '#fff' : '#666' }}><span className="text-sm font-bold">{open ? '−' : '+'}</span></div></div>
      {open && <p className="mt-2 text-gray-600 text-sm leading-relaxed animate-fade-in-up">{a}</p>}
    </div>
  );
}

function Countdown() {
  const [t, setT] = useState({ h: 2, m: 34, s: 17 });
  useEffect(() => { const i = setInterval(() => setT(p => { let { h, m, s } = p; s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; m = 59; s = 59; } return { h, m, s }; }), 1000); return () => clearInterval(i); }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-1.5 justify-center">
      {[pad(t.h), pad(t.m), pad(t.s)].map((v, i) => (
        <div key={i} className="flex items-center gap-1.5"><div className="countdown-digit text-xl px-2.5 py-1.5 min-w-[45px]">{v}</div>{i < 2 && <span className="text-lg font-black text-gray-400">:</span>}</div>
      ))}
    </div>
  );
}

export default function ResultadoPage() {
  const [startUpsell, setStartUpsell] = useState(false);
  const [bonusVis, setBonusVis] = useState([false, false, false, false, false]);
  const [showSticky, setShowSticky] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const revenueSection = useInView(0.15);
  const sellSection = useInView(0.15);

  const checkoutComplete = "https://www.ggcheckout.com/checkout/v5/m4slNQAn5ssCpFqXUmtS";
  const openCheckout = (url: string) => { const p = window.location.search; window.open(`${url}${url.includes('?') ? '&' : '?'}${p.substring(1)}`, '_blank'); };

  const transformations = [
    { id: 1, before: 'https://i.postimg.cc/j5SZ43ty/1-antes.png', after: 'https://i.postimg.cc/cHkT97L3/1-depois.png', label: 'Sala de Estar — De R$40/m² para R$250/m²', priority: true },
    { id: 2, before: 'https://i.postimg.cc/85ztmXNT/2-antes.png', after: 'https://i.postimg.cc/Tw3CJNfb/2-depois.png', label: 'Banheiro Premium — Contrato de R$8.500', priority: false },
    { id: 3, before: 'https://i.postimg.cc/d1V4jNwd/3-antes.png', after: 'https://i.postimg.cc/k4gfvYqK/3-depois.png', label: 'Hall de Entrada — Projeto de R$12.000', priority: false },
  ];




  const faqs = [
    { q: 'Preciso ter experiência com pintura?', a: 'Não! O curso foi desenhado do zero.' },
    { q: 'Em quanto tempo vejo resultado?', a: 'A maioria fecha o primeiro contrato em até 7 dias.' },
    { q: 'Quais materiais vou precisar?', a: 'Incluímos guia completo com as melhores tintas e onde comprar com desconto.' },
    { q: 'Como funciona o suporte VIP?', a: 'Grupo exclusivo no WhatsApp com suporte em tempo real.' },
    { q: 'O acesso é vitalício?', a: 'Sim! Pagamento único, acesso para sempre, atualizações incluídas.' },
    { q: 'E se eu não gostar?', a: '30 dias de garantia. Devolvemos 100% sem perguntas.' },
  ];

  useEffect(() => {
    const timers = Array.from({ length: 5 }, (_, i) => setTimeout(() => setBonusVis(p => { const n = [...p]; n[i] = true; return n; }), 500 + i * 200));
    const h = () => setShowSticky(window.scrollY > 800);
    window.addEventListener('scroll', h);
    return () => { timers.forEach(clearTimeout); window.removeEventListener('scroll', h); };
  }, []);

  if (startUpsell) return <UpsellFlow />;

  return (
    <main className="overflow-x-hidden bg-white">

      {/* ===== HERO ===== */}
      <section className="relative py-16 px-4 text-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A1628 0%, #0F2035 40%, #0A1628 100%)' }}>
        {/* Animated bg particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-float" style={{
              width: `${8 + i * 4}px`, height: `${8 + i * 4}px`,
              background: i % 2 === 0 ? 'rgba(0,194,203,0.15)' : 'rgba(245,166,35,0.12)',
              left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`,
              animationDuration: `${3 + i * 0.7}s`, animationDelay: `${i * 0.3}s`,
            }} />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 animate-fade-in-up" style={{ background: 'linear-gradient(135deg, rgba(0,194,203,0.15), rgba(245,166,35,0.1))', border: '1px solid rgba(0,194,203,0.3)', backdropFilter: 'blur(10px)' }}>
            <span className="text-xl animate-float" style={{ animationDuration: '2s' }}>🏆</span>
            <span className="font-black text-sm uppercase tracking-wider" style={{ color: 'var(--turquoise)' }}>Análise Completa</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black mb-3 text-white animate-fade-in-up" style={{ fontFamily: 'Sora', animationDelay: '0.1s' }}>
            Seu Perfil Foi <span className="text-gradient-turquoise">Analisado!</span>
          </h1>

          {/* Revenue highlight */}
          <div className="my-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Potencial de faturamento identificado</p>
            <div className="inline-block relative">
              <div className="absolute -inset-4 rounded-2xl opacity-30 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(0,194,203,0.4), transparent 70%)' }} />
              <span className="relative text-5xl md:text-7xl font-black text-gradient-turquoise" style={{ fontFamily: 'Sora' }}>R$15K+</span>
            </div>
            <p className="text-lg text-gray-300 font-medium mt-2">por mês com pintura marmorizada</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: '🎯', value: '3', label: 'Projetos/mês' },
              { icon: '📅', value: '8', label: 'Dias de trabalho' },
              { icon: '💰', value: '85%', label: 'Margem de lucro' },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-lg">{s.icon}</span>
                <p className="text-xl font-black text-white mt-1" style={{ fontFamily: 'Sora' }}>{s.value}</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bonuses unlocked */}
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.4s', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
            <span className="text-sm font-bold text-gray-300">5 bônus exclusivos desbloqueados — <span style={{ color: '#22c55e' }}>R$235 em conteúdo grátis</span></span>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, white, transparent)' }} />
      </section>

      {/* ===== REVENUE DEMONSTRATION ===== */}
      <section className="py-16 px-4 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A1628, #0F2035, #0A1628)' }}>
        <div ref={revenueSection.ref} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--amber-brand)' }}>💰 Simulação Real</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Sora' }}>
              Como Você Vai Faturar <span className="text-gradient-turquoise">+R$15 Mil/Mês</span>
            </h2>
            <p className="text-gray-400 text-lg">Veja a matemática por trás do sucesso dos nossos alunos</p>
          </div>

          {/* Contract Simulation */}
          <div className={`transition-all duration-1000 ${revenueSection.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Step-by-step visual flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { step: '1️⃣', title: 'Cliente te Encontra', desc: 'Pelo Instagram ou indicação', icon: '📲', delay: 0 },
                { step: '2️⃣', title: 'Você Envia o Orçamento', desc: 'Com nosso script pronto', icon: '📋', delay: 200 },
                { step: '3️⃣', title: 'Contrato Fechado!', desc: 'Cliente paga adiantado', icon: '🤝', delay: 400 },
              ].map((s, i) => (
                <div key={i} className={`relative p-5 rounded-2xl text-center transition-all duration-700 ${revenueSection.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${s.delay + 300}ms`, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--turquoise)' }}>{s.step}</p>
                  <h4 className="text-lg font-black text-white mb-1" style={{ fontFamily: 'Sora' }}>{s.title}</h4>
                  <p className="text-sm text-gray-400">{s.desc}</p>
                  {i < 2 && <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-2xl" style={{ color: 'var(--turquoise)' }}>→</div>}
                </div>
              ))}
            </div>

            {/* 3 Real Projects */}
            <div className={`rounded-3xl overflow-hidden transition-all duration-1000 ${revenueSection.vis ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: '800ms', background: 'linear-gradient(135deg, rgba(0,194,203,0.1), rgba(245,166,35,0.05))', border: '2px solid rgba(0,194,203,0.2)' }}>
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">📋 3 Projetos Simples no Mês</p>
                  <div className="h-px w-20 mx-auto" style={{ background: 'var(--turquoise)' }} />
                </div>

                {/* 3 Projects cards */}
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { emoji: '🛋️', room: 'Sala de Estar', area: '40m²', price: 'R$180/m²', total: 'R$7.200', cost: 'R$1.080', profit: 'R$6.120', days: '3 dias', color: 'var(--turquoise)' },
                    { emoji: '🚿', room: 'Banheiro', area: '18m²', price: 'R$200/m²', total: 'R$3.600', cost: 'R$540', profit: 'R$3.060', days: '2 dias', color: 'var(--amber-brand)' },
                    { emoji: '🛏️', room: 'Quarto Casal', area: '30m²', price: 'R$180/m²', total: 'R$5.400', cost: 'R$810', profit: 'R$4.590', days: '3 dias', color: '#7C4DFF' },
                  ].map((p, i) => (
                    <div key={i} className={`p-4 rounded-2xl flex items-center gap-4 transition-all duration-700 ${revenueSection.vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                      style={{ transitionDelay: `${1000 + i * 250}ms`, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="text-3xl flex-shrink-0">{p.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-black text-white">{p.room}</h4>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: p.color }}>{p.days}</span>
                        </div>
                        <p className="text-[11px] text-gray-400">{p.area} × {p.price} = {p.total}</p>
                        <p className="text-[10px] text-gray-500">Material: -{p.cost}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-500 uppercase">Lucro</p>
                        <p className="text-lg font-black" style={{ fontFamily: 'Sora', color: '#22c55e' }}>{p.profit}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="p-5 rounded-2xl mb-6" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center justify-between mb-2.5 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-sm text-gray-400">Faturamento total (3 projetos)</span>
                    <span className="text-base font-bold text-white">R$ 16.200</span>
                  </div>
                  <div className="flex items-center justify-between mb-2.5 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-sm text-gray-400">(-) Materiais e tintas</span>
                    <span className="text-base font-bold text-red-400">- R$ 2.430</span>
                  </div>
                  <div className="flex items-center justify-between mb-2.5 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-sm text-gray-400">Dias trabalhados no mês</span>
                    <span className="text-base font-bold text-white">Apenas 8 dias</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold" style={{ color: '#22c55e' }}>💰 LUCRO LÍQUIDO MENSAL</span>
                    <span className="text-2xl font-black" style={{ fontFamily: 'Sora', color: '#22c55e' }}>
                      <AnimatedNumber target={13770} prefix="R$" duration={2500} />
                    </span>
                  </div>
                </div>

                {/* Premium Days comparison */}
                <div className="mt-8 relative animate-fade-in-up" style={{ animationDelay: '1s' }}>
                  <div className="text-center mb-6">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white mb-2" style={{ background: 'linear-gradient(135deg, #E91E63, #9A1440)', boxShadow: '0 4px 15px rgba(233,30,99,0.3)' }}>A Verdade Que Não Te Contam</span>
                    <h3 className="text-2xl font-black text-white" style={{ fontFamily: 'Sora' }}>CLT vs <span className="text-gradient-turquoise">Ser o Seu Próprio Chefe</span></h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden" style={{ border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    {/* Vida Comum (CLT) */}
                    <div className="p-8 relative" style={{ background: 'linear-gradient(180deg, rgba(30,15,20,0.9), rgba(15,10,12,0.95))' }}>
                      <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🏢</div>
                      <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> A Vida Comum (CLT)</p>

                      <div className="space-y-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-red-950/50 flex items-center justify-center text-red-500 border border-red-900/50 flex-shrink-0">⏳</div>
                          <div>
                            <p className="text-2xl font-black text-white" style={{ fontFamily: 'Sora' }}>22 Dias</p>
                            <p className="text-xs text-gray-400 leading-tight mt-1">Trabalhando de seg a sex,<br />bater ponto e pegar trânsito</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-red-950/50 flex items-center justify-center text-red-500 border border-red-900/50 flex-shrink-0">💸</div>
                          <div>
                            <p className="text-2xl font-black text-red-400" style={{ fontFamily: 'Sora' }}>R$ 2.500</p>
                            <p className="text-xs text-gray-400 leading-tight mt-1">Salário médio fixo,<br />sem perspectiva de aumento</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vida Premium */}
                    <div className="p-8 relative" style={{ background: 'linear-gradient(180deg, rgba(0,194,203,0.15), rgba(0,194,203,0.05))', borderLeft: '1px solid rgba(0,194,203,0.2)' }}>
                      <div className="absolute top-0 right-0 w-full h-full pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(0,194,203,0.2), transparent 60%)' }} />
                      <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🏖️</div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: 'var(--turquoise)' }}><span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--turquoise)' }} /> A Vida Especialista</p>

                      <div className="space-y-5 relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white border flex-shrink-0" style={{ background: 'rgba(0,194,203,0.2)', borderColor: 'rgba(0,194,203,0.4)', boxShadow: '0 0 15px rgba(0,194,203,0.2)' }}>⚡</div>
                          <div>
                            <p className="text-2xl font-black text-white" style={{ fontFamily: 'Sora' }}>Apenas 8 Dias</p>
                            <p className="text-xs text-gray-300 leading-tight mt-1">Fazendo os seus horários,<br />com 22 dias livres no mês</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white border flex-shrink-0" style={{ background: 'rgba(34,197,94,0.2)', borderColor: 'rgba(34,197,94,0.4)', boxShadow: '0 0 15px rgba(34,197,94,0.2)' }}>💰</div>
                          <div>
                            <p className="text-3xl font-black" style={{ fontFamily: 'Sora', color: '#22c55e' }}>R$ 13.770</p>
                            <p className="text-xs text-gray-300 leading-tight mt-1">Lucro limpo no seu bolso,<br />sendo o seu próprio chefe</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center p-6 rounded-2xl relative overflow-hidden animate-subtle-pulse" style={{ background: 'linear-gradient(135deg, rgba(0,194,203,0.15), rgba(245,166,35,0.1))', border: '1px solid rgba(0,194,203,0.3)' }}>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(var(--turquoise) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <p className="relative z-10 text-xl font-black text-white leading-snug">
                    <span className="text-gradient-turquoise text-2xl mb-1 block">Mais de 5x o lucro.</span>
                    Trabalhando <span style={{ color: 'var(--amber-brand)' }}>menos da metade</span> do tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VSL ===== */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A1628 0%, #0F2035 50%, #0A1628 100%)' }}>
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-25%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[100px]" style={{ background: 'var(--turquoise)' }} />
          <div className="absolute bottom-[-25%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[100px]" style={{ background: 'var(--amber-brand)' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full mb-8" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', backdropFilter: 'blur(10px)' }}>
            <span className="text-red-500 text-sm animate-pulse">🔴</span>
            <span className="font-black text-xs md:text-sm uppercase tracking-widest text-red-500">Atenção: Assista Antes Que Saia do Ar</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Sora' }}>
            A Estratégia Exata Para <br className="hidden md:block" />
            <span className="text-gradient-turquoise">Faturar Múltiplos Dígitos</span> Em 30 Dias
          </h2>

          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Dê o play abaixo e veja como transformar um trabalho simples em um negócio premium altamente lucrativo.
          </p>

          {/* Video Player */}
          <div className="relative mx-auto w-full max-w-[360px] rounded-[24px] overflow-hidden transition-all duration-500 hover:scale-[1.02]" style={{ border: '2px solid rgba(0,194,203,0.3)', boxShadow: '0 30px 60px -15px rgba(0,194,203,0.4), 0 0 30px rgba(0,194,203,0.2)' }}>
            <Script src="https://fast.wistia.com/player.js" />
            <Script src="https://fast.wistia.com/embed/x1i6o6xfse.js" type="module" />
            <style dangerouslySetInnerHTML={{
              __html: `
               wistia-player[media-id='x1i6o6xfse']:not(:defined) { 
                 background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/x1i6o6xfse/swatch'); 
                 display: block; 
                 filter: blur(5px); 
                 padding-top: 177.78%; 
               }
             `}} />
            {/* @ts-ignore */}
            <wistia-player media-id="x1i6o6xfse" aspect="0.5625"></wistia-player>
          </div>

          <div className="mt-8 text-center text-sm font-bold text-gray-500 flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>O vídeo revela o passo a passo completo</span>
          </div>
        </div>

        {/* Bottom wave/gradient to transition into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #F7F8FA, transparent)' }} />
      </section>

      {/* ===== HOW TO SELL - Visual Bold ===== */}
      <section className="py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7F8FA 0%, #FFFFFF 100%)' }}>
        <div ref={sellSection.ref} className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--turquoise)' }}>✨ Sistema Completo de Vendas</p>
            <h2 className="text-3xl md:text-5xl font-black" style={{ fontFamily: 'Sora', color: '#111' }}>
              Tudo Para Você <span style={{ color: 'var(--turquoise)' }}>Vender,<br />Fechar e Faturar</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">Não basta saber pintar — você precisa de um sistema completo de vendas</p>
          </div>

          {/* Big visual metrics row */}
          <div className={`grid grid-cols-3 gap-0 rounded-3xl overflow-hidden mb-10 transition-all duration-700 ${sellSection.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ border: '2px solid #E8EBF0', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
            {[
              { stat: '+5K', label: 'Seguidores/mês', sub: 'Pelo Instagram otimizado', icon: '📲', color: '#E91E63', bg: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%)' },
              { stat: '87%', label: 'Taxa de Fechamento', sub: 'Usando nosso script', icon: '💼', color: 'var(--turquoise)', bg: 'linear-gradient(135deg, #F0FFFE 0%, #FFFFFF 100%)' },
              { stat: 'R$15K', label: 'Faturamento/Mês', sub: 'Com apenas 3 projetos', icon: '🚀', color: '#F5A623', bg: 'linear-gradient(135deg, #FFFBF0 0%, #FFFFFF 100%)' },
            ].map((m, i) => (
              <div key={i} className="p-6 md:p-8 text-center" style={{ background: m.bg, borderRight: i < 2 ? '1px solid #E8EBF0' : 'none' }}>
                <div className="text-3xl md:text-4xl mb-3">{m.icon}</div>
                <p className="text-2xl md:text-4xl font-black mb-1" style={{ fontFamily: 'Sora', color: m.color }}>{m.stat}</p>
                <p className="text-xs md:text-sm font-black text-gray-800 mb-1">{m.label}</p>
                <p className="text-[10px] md:text-xs text-gray-400 hidden md:block">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* 3 Visual pillars - horizontal stack */}
          <div className="flex flex-col gap-4">
            {[
              {
                num: '01',
                icon: '📲',
                title: 'Instagram que Vende',
                desc: 'Perfil profissional otimizado para atrair clientes premium que pagam R$150–300/m²',
                points: ['Templates prontos de posts', 'Estratégia de conteúdo', 'Como atrair +5K seguidores/mês'],
                gradient: 'linear-gradient(135deg, #E91E63, #C2185B)',
                bgLight: 'rgba(233,30,99,0.04)',
                borderColor: 'rgba(233,30,99,0.15)',
                accentColor: '#E91E63',
              },
              {
                num: '02',
                icon: '💼',
                title: 'Orçamento que Fecha',
                desc: '87% dos alunos fecham o primeiro contrato na primeira semana usando nosso script',
                points: ['Script de apresentação completo', 'Justificativa de valor premium', 'Proposta profissional WhatsApp'],
                gradient: 'linear-gradient(135deg, #00C2CB, #009AA2)',
                bgLight: 'rgba(0,194,203,0.04)',
                borderColor: 'rgba(0,194,203,0.15)',
                accentColor: 'var(--turquoise)',
              },
              {
                num: '03',
                icon: '🚀',
                title: 'Plano de R$15K/Mês',
                desc: 'Sistema completo para escalar: quantidade de projetos, agenda e indicações automáticas',
                points: ['Quantos projetos por mês', 'Agenda de visitas otimizada', 'Sistema de indicações automáticas'],
                gradient: 'linear-gradient(135deg, #F5A623, #D4880A)',
                bgLight: 'rgba(245,166,35,0.04)',
                borderColor: 'rgba(245,166,35,0.15)',
                accentColor: '#F5A623',
              },
            ].map((pillar, i) => (
              <div key={i}
                className={`flex items-start gap-5 p-5 md:p-7 rounded-2xl transition-all duration-700 ${sellSection.vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${i * 150}ms`, background: pillar.bgLight, border: `1.5px solid ${pillar.borderColor}` }}>
                {/* Big number */}
                <div className="flex-shrink-0 hidden md:block">
                  <span className="text-7xl font-black leading-none opacity-[0.07]" style={{ fontFamily: 'Sora', color: '#111' }}>{pillar.num}</span>
                </div>
                {/* Icon circle */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg" style={{ background: pillar.gradient }}>
                  {pillar.icon}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Sora' }}>{pillar.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{pillar.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.points.map((pt, j) => (
                      <span key={j} className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-white"
                        style={{ border: `1px solid ${pillar.borderColor}`, color: '#444' }}>
                        <span style={{ color: pillar.accentColor }}>✓</span> {pt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BONUSES ===== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black" style={{ fontFamily: 'Sora', color: '#111' }}>
              <span style={{ color: 'var(--amber-brand)' }}>R$235 em Bônus</span> Exclusivos
            </h2>
            <p className="mt-2 text-gray-500">Inclusos gratuitamente no seu acesso</p>
          </div>
          <div className="flex flex-col gap-5">
            {/* Bonus 1 */}
            {[
              {
                num: 1,
                name: 'Guia de Precificação Lucrativa',
                desc: 'Saiba exatamente quanto cobrar por cada m² para ter o máximo de lucro.',
                val: 'R$47',
                gradient: 'linear-gradient(135deg, #00C2CB, #009AA2)',
                shadow: 'rgba(0,194,203,0.3)',
                icon: (
                  <svg viewBox="0 0 80 80" className="w-full h-full animate-float" style={{ animationDuration: '4s' }}>
                    <defs>
                      <linearGradient id="coinG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F5A623" /><stop offset="100%" stopColor="#D4880A" /></linearGradient>
                    </defs>
                    <ellipse cx="40" cy="58" rx="22" ry="6" fill="#D4880A" opacity="0.3" />
                    <rect x="22" y="36" width="36" height="16" rx="3" fill="url(#coinG)" stroke="#B8860B" strokeWidth="1.5" />
                    <text x="40" y="48" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Sora">R$</text>
                    <rect x="22" y="24" width="36" height="16" rx="3" fill="url(#coinG)" stroke="#B8860B" strokeWidth="1.5" />
                    <text x="40" y="36" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Sora">R$</text>
                    <rect x="22" y="12" width="36" height="16" rx="3" fill="url(#coinG)" stroke="#B8860B" strokeWidth="1.5" />
                    <text x="40" y="24" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Sora">R$</text>
                    <circle cx="58" cy="16" r="10" fill="#22c55e" stroke="white" strokeWidth="2">
                      <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="58" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">✓</text>
                  </svg>
                ),
              },
              {
                num: 2,
                name: 'Pack de Artes para Instagram',
                desc: '+50 templates prontos para postar e atrair clientes premium no Instagram.',
                val: 'R$97',
                gradient: 'linear-gradient(135deg, #E91E63, #C2185B)',
                shadow: 'rgba(233,30,99,0.3)',
                icon: (
                  <svg viewBox="0 0 80 80" className="w-full h-full" style={{ animation: 'float 3.5s ease-in-out infinite' }}>
                    <defs>
                      <linearGradient id="phoneG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E91E63" /><stop offset="100%" stopColor="#C2185B" /></linearGradient>
                    </defs>
                    <rect x="22" y="8" width="36" height="64" rx="8" fill="url(#phoneG)" stroke="#AD1457" strokeWidth="1.5" />
                    <rect x="26" y="18" width="28" height="40" rx="2" fill="white" opacity="0.95" />
                    <circle cx="40" cy="66" r="3" fill="white" opacity="0.5" />
                    <rect x="34" y="10" width="12" height="3" rx="1.5" fill="white" opacity="0.3" />
                    {/* Mini grid inside */}
                    <rect x="28" y="20" width="12" height="12" rx="1" fill="#FCE4EC" />
                    <rect x="42" y="20" width="12" height="12" rx="1" fill="#F8BBD0" />
                    <rect x="28" y="34" width="12" height="12" rx="1" fill="#F48FB1" />
                    <rect x="42" y="34" width="12" height="12" rx="1" fill="#FCE4EC" />
                    <rect x="28" y="48" width="26" height="8" rx="1" fill="#E91E63" opacity="0.3" />
                    {/* Notification ping */}
                    <circle cx="56" cy="14" r="6" fill="#F5A623">
                      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="56" y="17" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">!</text>
                  </svg>
                ),
              },
              {
                num: 3,
                name: 'Lista de Materiais Econômicos',
                desc: 'Onde comprar tintas e materiais mais baratos. Economize até 60%!',
                val: 'R$37',
                gradient: 'linear-gradient(135deg, #00C2CB, #00838F)',
                shadow: 'rgba(0,194,203,0.3)',
                icon: (
                  <svg viewBox="0 0 80 80" className="w-full h-full animate-float" style={{ animationDuration: '3s' }}>
                    <defs>
                      <linearGradient id="paintG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00C2CB" /><stop offset="100%" stopColor="#00838F" /></linearGradient>
                    </defs>
                    {/* Paint bucket */}
                    <path d="M24 30 L24 60 Q24 66 30 66 L50 66 Q56 66 56 60 L56 30 Z" fill="url(#paintG)" stroke="#006064" strokeWidth="1.5" />
                    <rect x="20" y="26" width="40" height="8" rx="3" fill="url(#paintG)" stroke="#006064" strokeWidth="1.5" />
                    {/* Handle */}
                    <path d="M60 30 Q68 30 68 22 Q68 14 60 14 L50 14" fill="none" stroke="#006064" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Paint drip */}
                    <path d="M56 40 Q62 42 60 50 Q58 56 56 50" fill="#00C2CB" opacity="0.7">
                      <animate attributeName="d" values="M56 40 Q62 42 60 50 Q58 56 56 50;M56 40 Q64 44 62 54 Q58 62 56 50;M56 40 Q62 42 60 50 Q58 56 56 50" dur="3s" repeatCount="indefinite" />
                    </path>
                    {/* Shine */}
                    <rect x="30" y="34" width="4" height="12" rx="2" fill="white" opacity="0.3" />
                  </svg>
                ),
              },
              {
                num: 4,
                name: 'Guia de Vendas para Iniciantes',
                desc: 'Como vender seus primeiros projetos por WhatsApp e indicações.',
                val: 'R$67',
                gradient: 'linear-gradient(135deg, #F5A623, #E65100)',
                shadow: 'rgba(245,166,35,0.3)',
                icon: (
                  <svg viewBox="0 0 80 80" className="w-full h-full">
                    <defs>
                      <linearGradient id="rocketG" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#F5A623" /><stop offset="100%" stopColor="#FF6D00" /></linearGradient>
                    </defs>
                    {/* Rocket body */}
                    <g style={{ animation: 'float 2.5s ease-in-out infinite' }}>
                      <path d="M40 10 Q32 28 32 44 L48 44 Q48 28 40 10 Z" fill="url(#rocketG)" stroke="#E65100" strokeWidth="1.5" />
                      <circle cx="40" cy="32" r="5" fill="white" opacity="0.9" />
                      <circle cx="40" cy="32" r="2.5" fill="#F5A623" />
                      {/* Fins */}
                      <path d="M32 38 L22 48 L32 44 Z" fill="#FF6D00" />
                      <path d="M48 38 L58 48 L48 44 Z" fill="#FF6D00" />
                      {/* Flame */}
                      <path d="M35 44 Q40 58 45 44" fill="#ef4444">
                        <animate attributeName="d" values="M35 44 Q40 58 45 44;M36 44 Q40 62 44 44;M35 44 Q40 58 45 44" dur="0.5s" repeatCount="indefinite" />
                      </path>
                      <path d="M37 44 Q40 54 43 44" fill="#FFA726">
                        <animate attributeName="d" values="M37 44 Q40 54 43 44;M38 44 Q40 58 42 44;M37 44 Q40 54 43 44" dur="0.4s" repeatCount="indefinite" />
                      </path>
                    </g>
                    {/* Stars */}
                    <circle cx="18" cy="20" r="2" fill="#F5A623" opacity="0.6"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" /></circle>
                    <circle cx="62" cy="26" r="1.5" fill="#F5A623" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.8s" repeatCount="indefinite" /></circle>
                    <circle cx="24" cy="58" r="1.5" fill="#F5A623" opacity="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.2s" repeatCount="indefinite" /></circle>
                  </svg>
                ),
              },
              {
                num: 5,
                name: 'Transforme em Renda Principal',
                desc: 'Plano completo para sair do emprego e fazer do marmorizado sua profissão.',
                val: 'R$37',
                gradient: 'linear-gradient(135deg, #7C4DFF, #512DA8)',
                shadow: 'rgba(124,77,255,0.3)',
                icon: (
                  <svg viewBox="0 0 80 80" className="w-full h-full animate-float" style={{ animationDuration: '3.5s' }}>
                    <defs>
                      <linearGradient id="crownG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F5A623" /><stop offset="100%" stopColor="#FF6F00" /></linearGradient>
                    </defs>
                    {/* Trophy */}
                    <path d="M28 28 L28 46 Q28 56 40 58 Q52 56 52 46 L52 28 Z" fill="url(#crownG)" stroke="#E65100" strokeWidth="1.5" />
                    <rect x="34" y="58" width="12" height="6" rx="1" fill="#D4880A" />
                    <rect x="30" y="64" width="20" height="4" rx="2" fill="#D4880A" />
                    {/* Handles */}
                    <path d="M28 32 Q18 32 18 40 Q18 48 28 48" fill="none" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M52 32 Q62 32 62 40 Q62 48 52 48" fill="none" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Star */}
                    <polygon points="40,32 42,38 48,38 43,42 45,48 40,44 35,48 37,42 32,38 38,38" fill="white" opacity="0.9">
                      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                    </polygon>
                    {/* Sparkles */}
                    <circle cx="22" cy="18" r="2" fill="#F5A623"><animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" /></circle>
                    <circle cx="58" cy="16" r="1.5" fill="#F5A623"><animate attributeName="r" values="1.5;2.5;1.5" dur="1.8s" repeatCount="indefinite" /></circle>
                    <circle cx="40" cy="14" r="2.5" fill="#F5A623"><animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" /></circle>
                  </svg>
                ),
              },
            ].map((b, i) => (
              <div key={i} className={cn("rounded-2xl p-6 text-center transition-all duration-700 hover:scale-[1.02]", bonusVis[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
                style={{ background: '#F7F8FA', border: '1px solid #E8EBF0' }}>
                {/* Badge */}
                <span className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${b.gradient}`, color: 'white' }}>
                  Bônus {b.num}
                </span>
                {/* Animated Icon */}
                <div className="w-20 h-20 mx-auto mb-4">{b.icon}</div>
                {/* Content */}
                <h4 className="text-lg font-black text-gray-900 mb-2" style={{ fontFamily: 'Sora' }}>{b.name}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{b.desc}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-400 line-through">{b.val}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-black text-white" style={{ background: '#22c55e' }}>GRÁTIS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEFORE/AFTER ===== */}
      <section className="py-16 px-4" style={{ background: '#F7F8FA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--turquoise)' }}>Obras Reais</p>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Sora' }}>Resultados que Valem <span className="text-gradient-turquoise">R$12–28 MIL</span></h2>
          <div className="flex items-center justify-center gap-2 mb-10 mt-4 animate-pulse"><MoveHorizontal className="w-5 h-5 text-gray-400" /><span className="text-xs font-bold uppercase tracking-widest text-gray-400">Arraste para comparar</span><MoveHorizontal className="w-5 h-5 text-gray-400" /></div>
          <div className="flex flex-col gap-10">
            {transformations.map((t, i) => (
              <div key={t.id}><div className="rounded-xl overflow-hidden shadow-xl" style={{ border: '1px solid #E8EBF0' }}><BeforeAfterSlider before={t.before} after={t.after} priority={t.priority} /></div><p className="mt-3 text-sm font-bold text-gray-700">{t.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEMBER AREA DEMO ===== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--turquoise)' }}>👀 Prévia Exclusiva</p>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Sora' }}>
            Veja Por Dentro da <span className="text-gradient-turquoise">Área de Membros</span>
          </h2>
          <p className="text-gray-500 mb-10">É isso que você vai acessar assim que garantir sua vaga</p>
          <MemberAreaDemo />
        </div>
      </section>

      {/* ===== TESTIMONIALS & PRICING ===== */}
      <>
        {/* Testimonials */}
        <section ref={testimonialsRef} className="py-20 px-4" style={{ background: 'linear-gradient(160deg, #0A1628 0%, #0F2035 50%, #0A1628 100%)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-5" style={{ background: 'rgba(0,194,203,0.12)', border: '1px solid rgba(0,194,203,0.3)' }}>
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--turquoise)' }}>Depoimentos Reais em Vídeo</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: 'Sora' }}>
                Veja Quem Já <span className="text-gradient-turquoise">Transformou Sua Vida</span>
              </h2>
              <p className="mt-3 text-gray-400 text-lg">Alunos reais • Resultados verificados • Assista agora</p>
            </div>

            {/* Big visual social proof bar */}
            <div className="grid grid-cols-3 gap-0 rounded-3xl overflow-hidden mb-12" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              {[
                { v: '1.847+', l: 'Alunos Treinados', icon: '👨‍🎓', c: 'var(--turquoise)' },
                { v: 'R$12.300', l: 'Faturamento Médio/Mês', icon: '💰', c: '#22c55e' },
                { v: 'R$94K', l: 'Maior Projeto Fechado', icon: '🏆', c: 'var(--amber-brand)' }
              ].map((s, i) => (
                <div key={i} className="text-center py-8 px-4" style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="text-2xl md:text-4xl font-black" style={{ fontFamily: 'Sora', color: s.c }}>{s.v}</p>
                  <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-wider mt-1.5">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 mb-16">
              <TestimonialCarousel videoIds={['6tdjfbsqle', 'xab9r7nndh']} />
              <TestimonialCarousel videoIds={['ihs0hcvo3h', 'foutga0xyz']} />
            </div>

            {/* 3 Written Testimonials - SUPER IMPACTFUL */}
            <div>
              <div className="text-center mb-10">
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'var(--turquoise)' }}>💬 Relatos de Alunos</p>
                <h3 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Sora' }}>O Que Estão Dizendo</h3>
              </div>
              <div className="flex flex-col gap-5">
                {/* Testimonial 1 */}
                <div className="relative rounded-3xl p-7 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,194,203,0.12), rgba(0,194,203,0.04))', border: '1.5px solid rgba(0,194,203,0.25)' }}>
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--turquoise), transparent)' }} />
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #00C2CB, #009AA2)' }}>M</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="font-black text-white text-sm">Marcos A.</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--turquoise)' }}>Pintor • São Paulo, SP</p>
                        </div>
                        <div className="flex gap-0.5 flex-shrink-0">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div>
                      </div>
                      <blockquote className="text-gray-300 leading-relaxed text-sm md:text-base">
                        Em 3 semanas de curso já fechei meu <strong className="text-white">primeiro projeto de R$8.400</strong>. Antes eu cobrava R$35/m² e a galera regateava. Agora apresento o orçamento com confiança e os clientes <strong className="text-white">pagam sem questionar</strong>. O script de vendas foi o divisor de águas pra mim.
                      </blockquote>
                      <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-black" style={{ color: '#22c55e' }}>+R$8.400 no 1º projeto ✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="relative rounded-3xl p-7 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(245,166,35,0.03))', border: '1.5px solid rgba(245,166,35,0.2)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #F5A623, #D4880A)' }}>J</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="font-black text-white text-sm">Juliana R.</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#F5A623' }}>Pintora • Belo Horizonte, MG</p>
                        </div>
                        <div className="flex gap-0.5 flex-shrink-0">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div>
                      </div>
                      <blockquote className="text-gray-300 leading-relaxed text-sm md:text-base">
                        Nunca imaginei que sairia de R$2.800 por mês no emprego para <strong className="text-white">R$14.600 em apenas 40 dias</strong>. Os 300 modelos prontos de efeito foram o que me diferenciou da concorrência. Os clientes ficam sem palavras quando mostro o portfólio. <strong className="text-white">Meu marido também largou o emprego</strong> pra me ajudar.
                      </blockquote>
                      <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)' }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F5A623' }} />
                        <span className="text-xs font-black" style={{ color: '#F5A623' }}>De R$2.800 → R$14.600/mês ✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial 3 - Biggest impact */}
                <div className="relative rounded-3xl p-7 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.12), rgba(124,77,255,0.03))', border: '1.5px solid rgba(124,77,255,0.25)' }}>
                  <div className="absolute -bottom-6 -right-6 text-9xl opacity-5 pointer-events-none select-none">🏆</div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #7C4DFF, #512DA8)' }}>R</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="font-black text-white text-sm">Roberto S.</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#A78BFA' }}>Pintor Especialista • Rio de Janeiro, RJ</p>
                        </div>
                        <div className="flex gap-0.5 flex-shrink-0">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div>
                      </div>
                      <blockquote className="text-gray-300 leading-relaxed text-sm md:text-base">
                        Fiz meu <strong className="text-white">maior projeto em 8 anos de carreira</strong>: um apartamento completo por <strong className="text-white">R$94.000</strong>. O cliente me achou pelo Instagram usando a estratégia do curso. O método de orçamento Premium me deu confiança de apresentar esse valor sem tremer. <strong className="text-white">Valeu cada centavo</strong> dos R$14,99.
                      </blockquote>
                      <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)' }}>
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        <span className="text-xs font-black text-purple-300">Projeto de R$94.000 fechado ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7F8FA 0%, #FFFFFF 100%)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-red-500 text-sm font-black mb-5 animate-pulse" style={{ background: 'rgba(239,68,68,0.07)', border: '1.5px solid rgba(239,68,68,0.25)' }}>🔥 OFERTA POR TEMPO LIMITADO</div>
              <h2 className="text-3xl md:text-5xl font-black mb-2" style={{ fontFamily: 'Sora', color: '#111' }}>Escolha Seu Plano</h2>
              <p className="text-gray-500 mb-5">Oferta expira em:</p>
              <div className="mb-6"><Countdown /></div>
              <div className="max-w-xs mx-auto p-4 rounded-2xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <div className="w-full rounded-full overflow-hidden mb-2" style={{ height: '12px', background: '#E8EBF0' }}><div className="h-full rounded-full" style={{ width: '83%', background: 'linear-gradient(90deg, #ef4444, #F5A623)' }} /></div>
                <p className="text-sm text-gray-500">83/100 vagas — <span className="font-black text-red-500">restam apenas 17</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
              {/* Basic plan - dimmed */}
              <div className="card-alt p-7 opacity-75 order-2 md:order-1 flex flex-col">
                <div className="mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Plano</span>
                  <h3 className="text-2xl font-black text-gray-500 mt-1" style={{ fontFamily: 'Sora' }}>Básico</h3>
                  <p className="text-4xl font-black text-gray-600 mt-3">R$5,99</p>
                  <p className="text-xs text-gray-400 mt-1">Acesso por 30 dias</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2.5 text-sm text-gray-500"><CheckCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />Conteúdo escrito</li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-500"><CheckCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />Lista de materiais</li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-300 line-through">Aulas em Vídeo HD</li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-300 line-through">+300 Modelos Prontos</li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-300 line-through">5 Bônus Exclusivos</li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-300 line-through">Certificado Profissional</li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-300 line-through">Suporte VIP</li>
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-12 text-gray-400" style={{ border: '1px solid #E8EBF0' }} onClick={() => setStartUpsell(true)}>Quero só o básico</Button>
                <p className="text-center text-xs text-gray-400 mt-3">⚠️ Sem vídeos, sem modelos, sem suporte</p>
              </div>

              {/* COMPLETE PLAN — mega premium CTA */}
              <div className="relative order-1 md:order-2" style={{ filter: 'drop-shadow(0 25px 60px rgba(0,194,203,0.18))' }}>
                {/* Animated glow */}
                <div className="absolute -inset-1 rounded-3xl opacity-50" style={{ background: 'linear-gradient(135deg, var(--turquoise), #7C4DFF, var(--amber-brand))', filter: 'blur(16px)' }} />
                <div className="relative rounded-3xl overflow-hidden" style={{ border: '2px solid rgba(0,194,203,0.7)', background: 'white' }}>
                  {/* TOP BANNER */}
                  <div className="relative py-3 px-6 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)' }}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px)' }} />
                    <p className="relative text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" /> MAIS ESCOLHIDO — MELHOR CUSTO-BENEFÍCIO
                    </p>
                  </div>

                  <div className="p-6 md:p-8">
                    {/* Plan name */}
                    <div className="text-center mb-6">
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--turquoise)' }}>Plano</span>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-1" style={{ fontFamily: 'Sora' }}>COMPLETO + BÔNUS</h3>
                      <p className="text-sm text-gray-500 mt-1">Tudo para dominar e lucrar com marmorizado</p>
                    </div>

                    {/* Big price */}
                    <div className="text-center py-5 mb-6 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,194,203,0.07), rgba(0,194,203,0.02))', border: '1.5px solid rgba(0,194,203,0.18)' }}>
                      <div className="flex items-center justify-center gap-3 mb-1">
                        <span className="text-gray-400 text-lg line-through">R$97,90</span>
                        <span className="text-sm font-black text-white px-3 py-1 rounded-full" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>85% OFF</span>
                      </div>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-xl font-black text-gray-400 mb-2">R$</span>
                        <span className="font-black leading-none" style={{ fontFamily: 'Sora', color: 'var(--turquoise)', fontSize: 'clamp(64px, 18vw, 96px)' }}>14</span>
                        <span className="text-4xl font-black mb-2" style={{ color: 'var(--turquoise)' }}>,99</span>
                      </div>
                      <p className="text-xs font-bold text-gray-400 mt-2">💳 Pagamento único • Acesso vitalício</p>
                    </div>

                    {/* What's included — visual checklist */}
                    <div className="mb-6">
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 text-center">Tudo que você recebe no plano completo:</p>
                      <div className="flex flex-col gap-2">
                        {[
                          { icon: '🎬', label: 'Aulas em Vídeo HD — do zero ao avançado', highlight: true },
                          { icon: '🎨', label: '+300 Modelos Prontos de Efeito Marmorizado', highlight: true },
                          { icon: '📲', label: 'Instagram que Vende — sistema de posicionamento', highlight: false },
                          { icon: '📋', label: 'Posts Prontos + Estratégia de Conteúdo', highlight: false },
                          { icon: '💼', label: 'Script de Orçamento com 87% de fechamento', highlight: false },
                          { icon: '🚀', label: 'Plano Completo para Faturar R$15K/mês', highlight: false },
                          { icon: '💬', label: 'Suporte VIP Exclusivo no WhatsApp', highlight: false },
                          { icon: '🎁', label: '5 Bônus Exclusivos — valor de R$235 GRÁTIS', highlight: true },
                          { icon: '📜', label: 'Certificado Profissional de Conclusão', highlight: false },
                        ].map((item, i) => (
                          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${item.highlight ? 'font-black' : 'font-medium'}`}
                            style={{ background: item.highlight ? 'rgba(0,194,203,0.06)' : 'transparent', border: item.highlight ? '1px solid rgba(0,194,203,0.12)' : 'none' }}>
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <span className={`text-sm flex-1 ${item.highlight ? 'text-gray-900' : 'text-gray-700'}`}>{item.label}</span>
                            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#22c55e' }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shimmer CTA button */}
                    <style dangerouslySetInnerHTML={{ __html: `@keyframes ctaShimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(300%) skewX(-20deg); } }` }} />
                    <button
                      onClick={() => openCheckout(checkoutComplete)}
                      className="relative w-full overflow-hidden rounded-2xl font-black text-lg text-white mb-4"
                      style={{ height: '70px', background: 'linear-gradient(135deg, #00C2CB 0%, #009AA2 50%, #007A81 100%)', boxShadow: '0 10px 35px rgba(0,194,203,0.45), 0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.2s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 50px rgba(0,194,203,0.55)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 35px rgba(0,194,203,0.45)'; }}>
                      <div className="absolute top-0 w-16 h-full opacity-40" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', animation: 'ctaShimmer 2.5s ease-in-out infinite' }} />
                      <span className="relative flex items-center justify-center gap-2 text-lg font-black tracking-wide">
                        🔓 QUERO O PLANO COMPLETO — R$14,99 →
                      </span>
                    </button>

                    {/* Access method */}
                    <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                      <p className="text-center text-xs font-black text-gray-600 mb-3">📩 Você recebe acesso por:</p>
                      <div className="flex gap-2 mb-3">
                        <div className="flex-1 bg-white rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm border border-green-100">
                          <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-900">WhatsApp</p>
                            <p className="text-[9px] text-gray-400 uppercase tracking-wider">Acesso imediato</p>
                          </div>
                        </div>
                        <span className="text-gray-300 font-bold self-center">+</span>
                        <div className="flex-1 bg-white rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm border border-pink-100">
                          <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-900">E-mail</p>
                            <p className="text-[9px] text-gray-400 uppercase tracking-wider">Backup seguro</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2.5 px-4 rounded-full text-center text-sm font-black" style={{ background: '#A3E6CD', color: '#047857' }}>
                        ⚡ Acesso liberado em poucos minutos!
                      </div>
                    </div>

                    {/* Trust seal */}
                    <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                      <span>🔒</span> 7 dias de garantia incondicional • Sem perguntas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-xl mx-auto card-clean p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5" style={{ background: 'rgba(34,197,94,0.08)', border: '2px solid rgba(34,197,94,0.2)' }}>🛡️</div>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Sora', color: '#111' }}>Garantia Incondicional de 30 Dias</h2>
            <p className="text-gray-600 text-sm leading-relaxed">Se não ficar satisfeito, devolvemos <strong>100% do seu dinheiro</strong>. Sem perguntas.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4" style={{ background: '#F7F8FA' }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8"><h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'Sora', color: '#111' }}>Perguntas Frequentes</h2></div>
            <div className="card-clean px-5">{faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}</div>
          </div>
        </section>
      </>

      {/* Sticky */}
      {showSticky && (
        <div className="sticky-cta"><div className="max-w-sm mx-auto flex items-center gap-3"><div className="flex-1"><p className="text-xs font-bold text-gray-800">🔥 R$14,99 — Últimas vagas!</p></div><button className="btn-cta px-5 h-10 rounded-xl text-sm font-black flex-shrink-0" onClick={() => openCheckout(checkoutComplete)}>GARANTIR →</button></div></div>
      )}
    </main>
  );
}
