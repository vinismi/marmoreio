'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Cpu, Sparkles } from 'lucide-react';
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
    return (
        <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-b from-[#111] to-[#2B1A00] p-5 text-white animate-fade-in-up">
            <GoldenParticles visible={true} count={50} />
            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center rounded-2xl border border-amber-500/30 bg-black/30 p-8 text-center shadow-2xl shadow-amber-500/10 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent border border-accent/20">
                   <Sparkles className="h-5 w-5" />
                   Parabéns! Desconto exclusivo desbloqueado!
                </div>
                <h1 className="font-headline text-3xl font-extrabold md:text-4xl" style={{ textShadow: '0 0 10px rgba(255,215,0,0.6)'}}>
                    🎉 Você desbloqueou um desconto exclusivo de última chance!
                </h1>
                <p className="mt-2 max-w-xl text-base text-white/80 md:text-lg">
                    Por ter completado o treino interativo da IA, você ganhou acesso total com bônus por apenas R$9,99.
                </p>

                <div className="my-8 w-full rounded-lg border-2 border-dashed border-accent bg-accent/10 p-6">
                    <p className="text-lg font-semibold">Oferta Especial</p>
                    <h3 className="font-headline text-2xl font-bold text-white">Curso Completo + Todos os Bônus</h3>
                    <p className="text-2xl font-extrabold text-accent">de <del className="text-red-400/80">R$14,99</del> por apenas R$9,99</p>
                </div>

                <div className="flex w-full flex-col items-center gap-4">
                     <Button 
                        className="button-shine-gradient w-full rounded-full text-lg h-14 font-bold text-black animate-subtle-pulse"
                        onClick={() => window.open('https://www.ggcheckout.com/checkout/v2/Yj4f7amE5UXaHzZUt3Uz', '_blank')}
                    >
                        <Sparkles className="mr-2"/> SIM, QUERO O PACOTE COMPLETO COM DESCONTO
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full rounded-full border-accent/50 bg-transparent text-white/80 h-12 hover:bg-accent/10 hover:text-white"
                        onClick={() => window.open('https://www.ggcheckout.com/checkout/v2/kinHlxMmxB9mSAelkzX5', '_blank')}
                    >
                        Continuar com apenas a versão básica (R$5,99)
                    </Button>
                </div>

                <p className="mt-6 text-xs text-white/60">
                    Oferta válida apenas nesta tela. Após sair, o valor volta ao normal.
                </p>
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
