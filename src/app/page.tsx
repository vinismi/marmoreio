'use client';

import Image from 'next/image';
import ShowcaseCarousel from '@/components/showcase-carousel';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

const steps = [
  { num: '01', icon: '🎓', title: 'Domine a Técnica', desc: 'Aulas em vídeo HD passo a passo — do zero ao avançado em até 7 dias', color: '#00C2CB' },
  { num: '02', icon: '📸', title: 'Monte Seu Portfólio', desc: '+300 modelos prontos para atrair clientes que pagam R$150–300/m²', color: '#F5A623' },
  { num: '03', icon: '💰', title: 'Feche Contratos Premium', desc: 'Método de orçamento e vendas para fechar projetos de R$5K a R$30K', color: '#6C63FF' },
];

export default function Home() {
  const router = useRouter();
  const selling = useInView();
  useEffect(() => { router.prefetch('/funil'); }, [router]);

  return (
    <main className="overflow-x-hidden bg-white">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-12 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F5FDFF 40%, #FFFFFF 100%)' }}>

        {/* Decorative elements for light theme */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,194,203,0.05) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.03) 0%, transparent 70%)' }} />

          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-float opacity-40" style={{
              width: `${10 + i * 5}px`, height: `${10 + i * 5}px`,
              background: i % 2 === 0 ? 'rgba(0,194,203,0.2)' : 'rgba(245,166,35,0.15)',
              left: `${10 + i * 16}%`, top: `${15 + (i % 3) * 25}%`,
              animationDuration: `${4 + i * 0.8}s`, animationDelay: `${i * 0.5}s`,
            }} />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          {/* Custom Fan Animations */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes fanLeftMove {
              0% { transform: translateY(60px) rotate(0deg) scale(0.6); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(0) rotate(-14deg) translateX(-30px); opacity: 1; }
            }
            @keyframes fanRightMove {
              0% { transform: translateY(60px) rotate(0deg) scale(0.6); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(0) rotate(14deg) translateX(30px); opacity: 1; }
            }
            .animate-fan-left { animation: fanLeftMove 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
            .animate-fan-right { animation: fanRightMove 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
          `}} />

          {/* Animated 2-Image Fan */}
          <div className="relative w-full max-w-[380px] h-[210px] sm:max-w-[450px] sm:h-[260px] mx-auto mt-2 mb-4 md:mb-8 flex justify-center items-end" style={{ perspective: '1000px' }}>
            {/* Left Image */}
            <div className="absolute w-[160px] h-[210px] sm:w-[200px] sm:h-[260px] rounded-2xl overflow-hidden border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10 animate-fan-left"
              style={{ animationDelay: '0.1s', opacity: 0, transformOrigin: 'bottom right' }}>
              <Image
                src="https://i.postimg.cc/QtLxLhPc/01.jpg"
                alt="Mármore Premium 1"
                width={200}
                height={260}
                className="w-full h-full object-cover next-image-fade-in"
                priority
                quality={75}
              />
            </div>

            {/* Right Image */}
            <div className="absolute w-[160px] h-[210px] sm:w-[200px] sm:h-[260px] rounded-2xl overflow-hidden border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-20 animate-fan-right"
              style={{ animationDelay: '0.3s', opacity: 0, transformOrigin: 'bottom left' }}>
              <Image
                src="https://i.postimg.cc/B6WQW4yc/02.webp"
                alt="Mármore Premium 2"
                width={200}
                height={260}
                className="w-full h-full object-cover next-image-fade-in"
                priority
                quality={75}
              />
            </div>
          </div>

          {/* Elite Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full animate-fade-in-up shadow-sm -mt-4 relative z-30"
            style={{ background: 'white', border: '1px solid rgba(0,194,203,0.2)', backdropFilter: 'blur(10px)', animationDelay: '0.5s' }}>
            <span className="flex items-center justify-center w-6 h-6 bg-[rgba(0,194,203,0.1)] rounded-full text-sm">💎</span>
            <span className="font-extrabold text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--turquoise)' }}>Método #1 de Pintura Premium no Brasil</span>
          </div>

          {/* Epic Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-black leading-[1.02] tracking-tight animate-fade-in-up text-gray-900"
            style={{ fontFamily: 'Sora, sans-serif', animationDelay: '0.1s' }}>
            Saia da Pintura Comum e se Torne um<br />
            <span className="relative inline-block mt-2">
              <span className="text-gradient-turquoise">Especialista de Elite</span>
              <div className="absolute -bottom-2 left-0 w-full h-1.5 rounded-full opacity-30" style={{ background: 'var(--turquoise)' }} />
            </span>
          </h1>

          {/* Sub-headline / Social Proof */}
          <div className="max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
              Domine o efeito <span className="text-gray-900 font-bold">mármore realista</span> que permite você cobrar <span className="text-[var(--turquoise)] font-black">7x mais caro</span> pelo seu trabalho.
            </p>
          </div>

          {/* High Impact Pricing Highlight */}
          <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Valor médio de mercado</span>
            <div className="relative px-8 py-3 rounded-2xl bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,194,203,0.1)]">
              <span className="text-4xl md:text-6xl font-black text-gradient-turquoise" style={{ fontFamily: 'Sora' }}>R$ 300 / m²</span>
              <div className="absolute -top-2 -right-2 bg-amber-400 text-white text-[10px] font-black px-2 py-1 rounded-lg animate-bounce shadow-md">LUCRO ALTO</div>
            </div>
          </div>

          {/* Stats Bar - Premium White Style */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: '👨‍🎓', val: '1.8k+', label: 'Alunos' },
              { icon: '⏱️', val: '7 dias', label: 'Resultado' },
              { icon: '📈', val: '80%', label: 'Margem' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-xl mb-1">{s.icon}</span>
                <p className="text-xl font-black text-gray-900" style={{ fontFamily: 'Sora' }}>{s.val}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Comparison Card */}
          <div className="w-full max-w-lg mt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100">
              <div className="grid grid-cols-2 gap-2 rounded-[2rem] overflow-hidden">
                <div className="relative group">
                  <Image
                    src="https://i.postimg.cc/j5SZ43ty/1-antes.png"
                    alt="Antes"
                    width={400}
                    height={300}
                    className="w-full h-48 md:h-60 object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500 next-image-fade-in"
                    loading="lazy"
                    quality={70}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-4 left-4 text-left">
                    <span className="text-[10px] font-black text-red-500 bg-white px-2 py-0.5 rounded-md uppercase tracking-widest mb-1 inline-block">Mão de Obra Comum</span>
                    <p className="text-white font-black text-lg">R$ 40/m²</p>
                  </div>
                </div>
                <div className="relative group">
                  <Image
                    src="https://i.postimg.cc/cHkT97L3/1-depois.png"
                    alt="Depois"
                    width={400}
                    height={300}
                    className="w-full h-48 md:h-60 object-cover next-image-fade-in"
                    loading="lazy"
                    quality={70}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--turquoise)]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-left">
                    <span className="text-[10px] font-black text-white bg-[var(--turquoise)] px-2 py-0.5 rounded-md uppercase tracking-widest mb-1 inline-block">Especialista Elite</span>
                    <p className="text-white font-black text-xl">R$ 300/m² 🔥</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs font-bold text-gray-400 mt-5 leading-relaxed">
              O MESMO PROFISSIONAL • A MESMA PAREDE<br />
              <span className="text-gray-900 border-b-2 border-[var(--turquoise)]/30">O RESULTADO QUE MUDA O SEU PADRÃO DE VIDA EM 1 SEMANA.</span>
            </p>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #F7F8FA, transparent)' }} />
      </section>

      {/* ===== SHOWCASE ===== */}
      <section className="py-12 px-4" style={{ background: '#F7F8FA' }}>
        <ShowcaseCarousel />
      </section>

      {/* ===== 3 STEPS ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--turquoise)' }}>Método Simples</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: 'Sora', color: '#111' }}>
              3 Passos Para Sair do <span style={{ color: 'var(--turquoise)' }}>R$40/m² para R$300/m²</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative p-8 rounded-2xl text-center overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{ background: `${s.color}08`, border: `2px solid ${s.color}20` }}>
                <div className="absolute top-3 right-4 text-6xl font-black opacity-[0.05]" style={{ color: s.color, fontFamily: 'Sora' }}>{s.num}</div>
                <div className="text-5xl mb-5 transition-transform duration-300 group-hover:scale-110">{s.icon}</div>
                <h3 className="text-lg font-black mb-2" style={{ fontFamily: 'Sora', color: '#111' }}>{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
                <div className="mt-6 h-1 rounded-full w-10 mx-auto transition-all duration-500 group-hover:w-full" style={{ background: s.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISUAL SELLING SYSTEM ===== */}
      <section className="py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A1628 0%, #0F2035 50%, #0A1628 100%)' }}>
        <div ref={selling.ref} className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--turquoise)' }}>✨ Muito Além da Técnica</p>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Sora' }}>
              Não Basta Saber Fazer — <span className="text-gradient-turquoise">Você Precisa Saber Vender</span>
            </h2>
            <p className="mt-3 text-gray-400 text-lg">Nosso método inclui o sistema completo de vendas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                gradient: 'linear-gradient(135deg, #E91E63, #C2185B)',
                icon: '📲',
                title: 'Instagram que Vende',
                items: ['Perfil profissional otimizado', 'Templates prontos de posts', 'Estratégia para clientes premium'],
                stat: '+5K', statLabel: 'seguidores/mês'
              },
              {
                gradient: 'linear-gradient(135deg, #00C2CB, #009AA2)',
                icon: '💼',
                title: 'Orçamento que Fecha',
                items: ['Script de apresentação', 'Justificativa de valor premium', 'Proposta profissional WhatsApp'],
                stat: '87%', statLabel: 'taxa de fechamento'
              },
              {
                gradient: 'linear-gradient(135deg, #F5A623, #D4880A)',
                icon: '🚀',
                title: 'Plano R$15K/mês',
                items: ['Projetos por mês necessários', 'Agenda de visitas otimizada', 'Sistema de indicações'],
                stat: 'R$15K', statLabel: 'faturamento/mês'
              },
            ].map((card, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden transition-all duration-700 ${selling.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="h-1.5 w-full" style={{ background: card.gradient }} />
                <div className="p-6" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5" style={{ background: card.gradient, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>{card.icon}</div>
                  <h3 className="text-xl font-black text-white mb-4" style={{ fontFamily: 'Sora' }}>{card.title}</h3>
                  <ul className="space-y-3 mb-6">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold" style={{ background: card.gradient }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="text-3xl font-black" style={{ fontFamily: 'Sora', backgroundImage: card.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{card.stat}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{card.statLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== START QUIZ CTA ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-md mx-auto text-center">
          <div className="text-5xl mb-6 animate-float">💎</div>
          <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ fontFamily: 'Sora', color: '#111' }}>
            Descubra Seu Potencial de Faturamento
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Responda um quiz rápido e descubra quanto você pode faturar com pintura marmorizada — com um plano personalizado para você
          </p>
          <Link href="/funil">
            <button className="btn-cta w-full h-16 rounded-2xl text-lg font-black tracking-wide animate-subtle-pulse">
              QUERO COMEÇAR AGORA →
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-400">🔒 Rápido, gratuito e sem compromisso</p>
        </div>
      </section>
    </main>
  );
}
