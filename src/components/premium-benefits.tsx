
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function PremiumBenefitsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    const systemItems = [
        { emoji: '🎬', text: 'Curso completo em vídeo (do zero ao avançado)', highlight: false },
        { emoji: '📱', text: 'Guia de posicionamento nas redes sociais', highlight: true },
        { emoji: '📸', text: 'Modelos de posts prontos para atrair clientes', highlight: true },
        { emoji: '🎯', text: 'Como encontrar clientes que pagam R$150-300/m²', highlight: true },
        { emoji: '📋', text: 'Plano de ação até R$15K/mês em contratos', highlight: true },
        { emoji: '💬', text: 'Acompanhamento e suporte VIP no WhatsApp', highlight: false },
        { emoji: '🎨', text: '+300 modelos de marmorizado para copiar', highlight: false },
        { emoji: '🏆', text: 'Certificado Profissional incluso', highlight: false },
    ];

    return (
        <div ref={sectionRef} className="relative w-full max-w-3xl mx-auto py-6 px-4">
            <div className={cn(
                'relative z-10 transition-all duration-1000 transform',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}>
                {/* Badge */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-black tracking-wide"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
                        <span>⚠️</span> Isso NÃO é só um curso
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                        É o <span style={{ color: 'var(--turquoise)' }}>SISTEMA COMPLETO</span>
                        <br />
                        <span className="text-xl sm:text-2xl text-white/70">para você fechar</span>
                        <br />
                        <span className="text-4xl sm:text-5xl" style={{ color: 'var(--turquoise)' }}>+R$15K/mês em contratos</span>
                    </h2>
                </div>

                {/* What you get */}
                <div className="rounded-2xl p-5 md:p-6"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                    <p className="text-center text-sm md:text-base font-bold uppercase tracking-wider mb-5"
                        style={{ color: 'var(--turquoise)' }}>
                        📦 O que você recebe hoje:
                    </p>

                    <div className="grid grid-cols-1 gap-2.5">
                        {systemItems.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'flex items-center gap-3 p-3 rounded-xl transition-all duration-300',
                                    item.highlight
                                        ? 'border'
                                        : 'border',
                                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                )}
                                style={{
                                    background: item.highlight ? 'rgba(0,194,203,0.12)' : 'rgba(255,255,255,0.05)',
                                    borderColor: item.highlight ? 'rgba(0,194,203,0.35)' : 'rgba(255,255,255,0.08)',
                                    transitionDelay: `${200 + index * 80}ms`,
                                }}
                            >
                                <span className="text-xl md:text-2xl flex-shrink-0">{item.emoji}</span>
                                <span className={cn(
                                    'text-sm md:text-base font-medium flex-1',
                                    item.highlight ? 'text-white' : 'text-white/80'
                                )}>{item.text}</span>
                                <span className="text-lg font-bold flex-shrink-0" style={{ color: 'var(--turquoise)' }}>✓</span>
                            </div>
                        ))}
                    </div>

                    {/* Value */}
                    <div className="mt-5 pt-5 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <span className="text-gray-400 text-sm line-through">Valor real: R$ 997</span>
                            <span className="text-xs font-bold text-black px-2 py-1 rounded uppercase" style={{ background: '#22c55e' }}>98% OFF</span>
                        </div>
                        <p className="mt-3 text-white/70 text-sm md:text-base">
                            Tudo isso por <span className="font-bold text-lg" style={{ color: 'var(--turquoise)' }}>menos de R$15</span> — o preço de uma pizza 🍕
                        </p>
                    </div>
                </div>

                {/* Bottom Hook */}
                <div className="mt-6 text-center">
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                        <span className="font-bold" style={{ color: 'var(--turquoise)' }}>Seu primeiro contrato</span> já paga 10x o investimento
                        <br />
                        <span className="text-white font-black">e você ganha todas as ferramentas para escalar.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
