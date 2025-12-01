
'use client';

import { useEffect, useRef, useState } from 'react';
import { Trophy, Sparkles, Zap } from 'lucide-react';
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
            { threshold: 0.2 } // Ativa quando 20% do elemento estiver visível
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

    return (
        <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto py-10 px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/5 blur-[100px] rounded-full" />
            </div>

            {/* Title Section */}
            <div className={cn(
                "text-center mb-10 transition-all duration-1000 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                    A TÉCNICA QUE MAIS GERA
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 animate-gradient-x mt-2 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                        CONTRATOS EM 2025
                    </span>
                </h2>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full shadow-[0_0_10px_#f59e0b]" />
            </div>

            {/* Benefits Container */}
            <div className="relative flex flex-col gap-8 md:gap-12">
                {/* Connecting Line (Desktop) */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden md:block -translate-x-1/2" />

                {/* Item 1: Trophy */}
                <div className={cn(
                    "relative flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-all duration-1000 delay-300 transform group",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                )}>
                    {/* Icon Wrapper */}
                    <div className="relative z-10 flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border border-amber-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] group-hover:border-amber-400 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* Content Box */}
                    <div className="flex-1 text-center md:text-left md:w-1/2 md:pr-12 md:text-right md:order-first">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                            Contratos de Alto Valor
                        </h3>
                        <p className="text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                            Pintores comuns estão fechando obras que antes pareciam impossíveis.
                        </p>
                    </div>
                    <div className="hidden md:block md:w-1/2" /> {/* Spacer for alignment */}
                </div>

                {/* Item 2: Sparkles (Reversed Layout) */}
                <div className={cn(
                    "relative flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-all duration-1000 delay-500 transform group",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                )}>
                    <div className="hidden md:block md:w-1/2" /> {/* Spacer */}

                    {/* Icon Wrapper */}
                    <div className="relative z-10 flex-shrink-0 md:order-first">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border border-yellow-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2)] group-hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] group-hover:border-yellow-400 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] group-hover:rotate-180 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Content Box */}
                    <div className="flex-1 text-center md:text-left md:w-1/2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                            Resultado de Luxo Imediato
                        </h3>
                        <p className="text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                            Materiais simples se transformam em acabamentos premium instantaneamente.
                        </p>
                    </div>
                </div>

                {/* Item 3: Zap */}
                <div className={cn(
                    "relative flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-all duration-1000 delay-700 transform group",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                )}>
                    {/* Icon Wrapper */}
                    <div className="relative z-10 flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border border-orange-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.2)] group-hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] group-hover:border-orange-400 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Zap className="w-10 h-10 md:w-12 md:h-12 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)] group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* Content Box */}
                    <div className="flex-1 text-center md:text-left md:w-1/2 md:pr-12 md:text-right md:order-first">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                            Aplicação no Mesmo Dia
                        </h3>
                        <p className="text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                            Aprenda rápido e comece a faturar sem perder tempo com teorias complexas.
                        </p>
                    </div>
                    <div className="hidden md:block md:w-1/2" /> {/* Spacer */}
                </div>

                {/* Bottom CTA Text */}
                <div className={cn(
                    "mt-10 text-center transition-all duration-1000 delay-1000 transform",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Você aprende <span className="text-amber-400 font-bold">do zero</span> e cria efeitos iguais aos profissionais que <span className="text-amber-400 font-bold">mais faturam hoje</span>.
                    </p>
                </div>

            </div>
        </div>
    );
}
