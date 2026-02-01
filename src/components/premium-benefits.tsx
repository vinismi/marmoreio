
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function PremiumBenefitsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const systemItems = [
        { emoji: "🎬", text: "Curso completo em vídeo (do zero ao avançado)", highlight: false },
        { emoji: "📱", text: "Guia de posicionamento nas redes sociais", highlight: true },
        { emoji: "📸", text: "Modelos de posts prontos para atrair clientes", highlight: true },
        { emoji: "🎯", text: "Como encontrar clientes que pagam R$150-300/m²", highlight: true },
        { emoji: "📋", text: "Plano de ação até R$15K/mês em contratos", highlight: true },
        { emoji: "💬", text: "Acompanhamento e suporte VIP no WhatsApp", highlight: false },
        { emoji: "🎨", text: "+300 modelos de marmorizado para copiar", highlight: false },
        { emoji: "🏆", text: "Certificado Profissional incluso", highlight: false },
    ];

    return (
        <div ref={sectionRef} className="relative w-full max-w-3xl mx-auto py-6 px-4">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[200%] bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 blur-[80px] rounded-full" />
            </div>

            {/* Main Content */}
            <div className={cn(
                "relative z-10 transition-all duration-1000 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>

                {/* NOT JUST A COURSE Badge */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 via-red-500/30 to-red-500/20 border border-red-500/50 mb-4">
                        <span className="text-base">⚠️</span>
                        <span className="text-sm md:text-base font-black text-white uppercase tracking-wide">Isso NÃO é só um curso</span>
                    </div>

                    <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                        É o <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400">SISTEMA COMPLETO</span>
                        <br />
                        <span className="text-xl min-[400px]:text-2xl sm:text-3xl text-white/80">para você fechar</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 text-3xl min-[400px]:text-4xl sm:text-5xl"
                            style={{ filter: 'drop-shadow(0 0 20px rgba(74, 222, 128, 0.4))' }}>
                            +R$15K/mês em contratos
                        </span>
                    </h2>
                </div>

                {/* What You Get - Clean List */}
                <div className="bg-gradient-to-b from-white/5 to-transparent rounded-2xl border border-white/10 p-5 md:p-6 backdrop-blur-sm">
                    <p className="text-center text-sm md:text-base text-amber-400 font-bold uppercase tracking-wider mb-5">
                        📦 O que você recebe hoje:
                    </p>

                    <div className="grid grid-cols-1 gap-2.5">
                        {systemItems.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                                    item.highlight
                                        ? "bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 border border-amber-500/30 hover:border-amber-400/50"
                                        : "bg-black/40 border border-white/5 hover:border-white/20",
                                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                                )}
                                style={{ transitionDelay: `${200 + index * 80}ms` }}
                            >
                                <span className="text-xl md:text-2xl flex-shrink-0">{item.emoji}</span>
                                <span className={cn(
                                    "text-sm md:text-base font-medium flex-1",
                                    item.highlight ? "text-amber-100" : "text-white"
                                )}>{item.text}</span>
                                <span className="text-green-400 text-lg">✓</span>
                            </div>
                        ))}
                    </div>

                    {/* Highlight Box */}
                    <div className={cn(
                        "mt-5 p-4 rounded-xl bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/30 transition-all duration-1000",
                        isVisible ? "opacity-100" : "opacity-0"
                    )} style={{ transitionDelay: '900ms' }}>
                        <p className="text-center text-sm md:text-base text-green-300 font-medium">
                            🚀 <span className="font-bold">O diferencial:</span> Não é só técnica de pintura — é um plano completo para você <span className="text-white font-bold">dominar as redes sociais</span>, atrair clientes de alto padrão e <span className="text-white font-bold">fechar contratos de R$5.000 a R$30.000</span>.
                        </p>
                    </div>

                    {/* Value Stack */}
                    <div className={cn(
                        "mt-5 pt-5 border-t border-white/10 text-center transition-all duration-1000",
                        isVisible ? "opacity-100" : "opacity-0"
                    )} style={{ transitionDelay: '1000ms' }}>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <span className="text-gray-400 text-sm line-through">Valor real: R$ 997</span>
                            <span className="text-xs font-bold bg-green-500 text-black px-2 py-1 rounded uppercase">98% OFF</span>
                        </div>
                        <p className="mt-3 text-white/70 text-sm md:text-base">
                            Tudo isso por <span className="text-green-400 font-bold text-lg">menos de R$15</span> — o preço de uma pizza 🍕
                        </p>
                    </div>
                </div>

                {/* Bottom Hook */}
                <div className={cn(
                    "mt-6 text-center transition-all duration-1000",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )} style={{ transitionDelay: '1100ms' }}>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                        <span className="text-amber-400 font-bold">Seu primeiro contrato</span> já paga 10x o investimento
                        <br />
                        <span className="text-white font-black">e você ganha todas as ferramentas para escalar.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
