'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Cpu, Sparkles, CheckCircle, Lock } from 'lucide-react';
import GoldenParticles from './particles';

const ProcessingScreen = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white animate-fade-in-up">
            <GoldenParticles visible={true} count={40} />
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                    <div className="absolute h-full w-full animate-spin rounded-full border-2 border-dashed border-accent"></div>
                    <Cpu className="h-12 w-12 text-accent animate-pulse" />
                </div>
                <h2 className="font-headline text-2xl font-bold text-white">🔍 IA verificando seu desempenho...</h2>
                <p className="text-lg text-white/80">Analisando resultados do seu treino interativo...</p>
            </div>
        </div>
    );
};

const OfferScreen = () => {
    const openCheckout = (url: string) => {
        const params = window.location.search;
        const separator = url.includes('?') ? '&' : '?';
        window.open(`${url}${separator}${params.substring(1)}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in overflow-y-auto">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#111] border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] my-auto">
                {/* Top Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"></div>

                <div className="p-6 md:p-8 flex flex-col items-center text-center relative z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-6 animate-pulse">
                        <Sparkles className="w-4 h-4" /> Oferta Exclusiva Desbloqueada
                    </div>

                    {/* Title */}
                    <h2 className="font-headline text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                        NÃO FECHE ESSA TELA! <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">VOCÊ GANHOU UM PRESENTE</span>
                    </h2>

                    <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                        Como recompensa por ter completado o treinamento, liberamos o <span className="text-white font-bold">Pacote Completo + Todos os Bônus</span> por um valor simbólico.
                    </p>

                    {/* Offer Box */}
                    <div className="w-full bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="flex flex-col gap-1 mb-4">
                            <span className="text-gray-500 text-sm line-through">De R$ 14,99</span>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-5xl font-black text-white tracking-tighter">9,99</span>
                                <span className="text-xl font-bold text-amber-400 self-end mb-2">R$</span>
                            </div>
                        </div>

                        <ul className="text-sm text-gray-400 space-y-2 text-left bg-black/30 p-4 rounded-xl border border-white/5">
                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> <span className="text-white">Curso Completo em Vídeo</span></li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> <span className="text-white">5 Bônus Exclusivos (Grátis)</span></li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> <span className="text-white">Acesso Vitalício</span></li>
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="w-full space-y-4">
                        <Button
                            className="w-full h-16 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-black text-lg md:text-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-[1.02] transition-all duration-300 animate-subtle-pulse"
                            onClick={() => openCheckout('https://www.ggcheckout.com/checkout/v4/Yj4f7amE5UXaHzZUt3Uz')}
                        >
                            SIM! QUERO TUDO POR R$ 9,99
                        </Button>

                        <button
                            className="text-xs md:text-sm text-gray-500 hover:text-white transition-colors underline decoration-gray-700 hover:decoration-white underline-offset-4 py-2 px-4"
                            onClick={() => openCheckout('https://www.ggcheckout.com/checkout/v4/kinHlxMmxB9mSAelkzX5')}
                        >
                            Não, obrigado. Quero perder os bônus e pagar R$ 5,99 pelo básico.
                        </button>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-wider font-bold">
                        <Lock className="w-3 h-3" /> Oferta única e intransferível
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function UpsellFlow() {
    const [step, setStep] = useState<'processing' | 'offer'>('processing');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep('offer');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (step === 'processing') {
        return <ProcessingScreen />;
    }

    return <OfferScreen />;
}
