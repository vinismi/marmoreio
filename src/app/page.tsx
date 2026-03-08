'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ShowcaseCarousel from '@/components/showcase-carousel';

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.prefetch('/funil'); }, [router]);

  return (
    <main className="bg-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fanRevealLeft {
          0%   { opacity:0; transform: translateX(0) rotate(0deg) scale(0.8) translateY(30px); }
          100% { opacity:1; transform: translateX(-110px) rotate(-18deg) scale(0.85) translateY(10px); }
        }
        @keyframes fanRevealRight {
          0%   { opacity:0; transform: translateX(0) rotate(0deg) scale(0.8) translateY(30px); }
          100% { opacity:1; transform: translateX(110px) rotate(18deg) scale(0.85) translateY(10px); }
        }
        @keyframes fanRevealCenter {
          0%   { opacity:0; transform: translateY(30px) scale(0.9); }
          100% { opacity:1; transform: translateY(0) scale(1); }
        }
        .fan-left   { animation: fanRevealLeft   1.0s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .fan-right  { animation: fanRevealRight  1.0s cubic-bezier(0.22,1,0.36,1) 0.4s  both; }
        .fan-center { animation: fanRevealCenter 1.0s cubic-bezier(0.22,1,0.36,1) 0.08s both; }
      `}} />

      {/* ===== HERO ===== */}
      <section className="relative flex flex-col items-center text-center pt-12 pb-6"
        style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F5FDFF 60%, #FFFFFF 100%)' }}>

        {/* Bg orbs — pointer-events-none, no overflow hidden aqui */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute rounded-full" style={{ width: '300px', height: '300px', top: '-60px', left: '-60px', background: 'radial-gradient(circle, rgba(0,194,203,0.06) 0%, transparent 70%)' }} />
          <div className="absolute rounded-full" style={{ width: '300px', height: '300px', bottom: '-60px', right: '-60px', background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)' }} />
        </div>

        {/* ── FAN DE IMAGENS ATUALIZADO ──
            Layout fiel à referência: as imagens escapam 110px pras laterais mantendo-as totalmente visíveis
        */}
        <div className="relative flex justify-center items-end" style={{ zIndex: 1, width: '100%', height: '320px', flexShrink: 0, marginTop: '20px' }}>

          {/* ESQUERDA */}
          <div className="fan-left absolute" style={{
            width: '180px', height: '240px',
            bottom: '40px',
            transformOrigin: 'center center',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '6px solid white',
            boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
            zIndex: 10,
          }}>
            <Image src="https://i.postimg.cc/QtLxLhPc/01.jpg" alt="Mármore 1"
              fill style={{ objectFit: 'cover' }} priority />
          </div>

          {/* DIREITA */}
          <div className="fan-right absolute" style={{
            width: '180px', height: '240px',
            bottom: '40px',
            transformOrigin: 'center center',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '6px solid white',
            boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
            zIndex: 10,
          }}>
            <Image src="https://i.postimg.cc/B6WQW4yc/02.webp" alt="Mármore 2"
              fill style={{ objectFit: 'cover' }} priority />
          </div>

          {/* CENTRAL */}
          <div className="fan-center absolute" style={{
            width: '210px', height: '280px',
            bottom: '20px',
            transformOrigin: 'bottom center',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '7px solid white',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            zIndex: 20,
          }}>
            <Image src="https://i.postimg.cc/Ssw9vDpc/04.jpg" alt="Mármore 3"
              fill style={{ objectFit: 'cover' }} priority />
          </div>
        </div>

        {/* Conteúdo texto */}
        <div className="relative px-5 flex flex-col items-center gap-3.5 mt-4" style={{ zIndex: 1, maxWidth: '400px', width: '100%' }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full shadow-sm"
            style={{ background: 'white', border: '1px solid rgba(0,194,203,0.22)' }}>
            <span style={{ fontSize: '13px' }}>💎</span>
            <span style={{ color: 'var(--turquoise)', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Método #1 de Pintura Premium no Brasil
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black leading-tight text-gray-900 text-center"
            style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.75rem', lineHeight: 1.08 }}>
            Saia da Pintura Comum e se Torne um{' '}
            <span className="text-gradient-turquoise">Especialista de Elite</span>
          </h1>

          {/* Subheadline */}
          <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
            Domine o efeito <strong style={{ color: '#111' }}>mármore realista</strong> e comece a cobrar{' '}
            <strong style={{ color: 'var(--turquoise)' }}>7x mais</strong> pelo seu trabalho — em até 7 dias.
          </p>

          {/* Micro-stats */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            {[
              { val: '1.8k+', label: 'alunos' },
              { val: '7 dias', label: 'resultado' },
              { val: 'R$300/m²', label: 'valor médio' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: '14px', color: '#111' }}>{s.val}</span>
                <span style={{ fontSize: '9px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOWCASE — galeria ===== */}
      <section className="py-10 px-4" style={{ background: '#F7F8FA' }}>
        {/* Título */}
        <div className="text-center mb-6" style={{ maxWidth: '360px', margin: '0 auto 24px' }}>
          <span style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: '999px',
            fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em',
            background: 'rgba(0,194,203,0.1)', color: 'var(--turquoise)', border: '1px solid rgba(0,194,203,0.2)',
            marginBottom: '10px',
          }}>
            ✦ Galeria de Resultados
          </span>
          <h2 className="font-black text-gray-900 leading-tight" style={{ fontFamily: 'Sora', fontSize: '1.25rem' }}>
            Efeitos Incríveis Que Você Vai{' '}
            <span className="text-gradient-turquoise">Dominar e Postar</span>
          </h2>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#6B7280', lineHeight: 1.6 }}>
            Cada efeito que você aprende vira conteúdo premium para o seu Instagram
          </p>
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {['🏛️ Branco Luxo', '🖤 Negro Dourado', '🎨 Colorido', '✨ Perolado'].map((tag, i) => (
              <span key={i} style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 700, color: '#374151', background: 'white', border: '1px solid #E8EBF0' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ShowcaseCarousel />
      </section>

      {/* ===== QUIZ CTA ===== */}
      <section className="py-8 px-4 bg-white">
        <div style={{ maxWidth: '360px', margin: '0 auto' }}>
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', textAlign: 'center', background: 'linear-gradient(135deg, #0A1628 0%, #0F2035 100%)', boxShadow: '0 20px 50px rgba(0,194,203,0.22)' }}>

            {/* Floating particles */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-float" style={{
                  position: 'absolute',
                  width: `${5 + i * 3}px`, height: `${5 + i * 3}px`,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? 'rgba(0,194,203,0.22)' : 'rgba(245,166,35,0.18)',
                  left: `${12 + i * 22}%`, top: `${18 + (i % 2) * 45}%`,
                  animationDuration: `${3 + i * 0.7}s`, animationDelay: `${i * 0.5}s`,
                }} />
              ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div className="animate-float" style={{ width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', background: 'linear-gradient(135deg, rgba(0,194,203,0.22), rgba(0,194,203,0.08))', border: '1px solid rgba(0,194,203,0.4)' }}>
                🎯
              </div>

              <div>
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--turquoise)', marginBottom: '6px' }}>Quiz Personalizado</p>
                <h2 style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: '1.2rem', color: 'white', lineHeight: 1.2 }}>
                  Descubra Seu Potencial de Faturamento
                </h2>
                <p style={{ marginTop: '8px', color: '#9CA3AF', fontSize: '12px', lineHeight: 1.6 }}>
                  Responda 5 perguntas rápidas e receba um <strong style={{ color: '#E5E7EB' }}>plano personalizado</strong> para começar a lucrar.
                </p>
              </div>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { icon: '🎨', text: 'Qual estilo você quer dominar' },
                  { icon: '💰', text: 'Seu potencial de faturamento' },
                  { icon: '🚀', text: 'Plano personalizado para você' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px', borderRadius: '12px', textAlign: 'left', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: '14px' }}>{item.icon}</span>
                    <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/funil" style={{ width: '100%', display: 'block' }}>
                <button className="btn-cta animate-subtle-pulse" style={{ width: '100%', height: '52px', borderRadius: '16px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.05em' }}>
                  COMEÇAR O QUIZ AGORA →
                </button>
              </Link>

              <p style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>🔒</span> Grátis e sem compromisso
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
