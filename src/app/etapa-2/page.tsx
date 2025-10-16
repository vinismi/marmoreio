'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const colorTextureOptions = [
  { id: 'a', label: 'Branco + Veios dourados' },
  { id: 'b', label: 'Preto espelhado' },
  { id: 'c', label: 'Azul perolado' },
];

export default function Step2Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const aestheticChoice = searchParams.get('aestheticChoice') || '';
  const [colorTextureChoice, setColorTextureChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChoice = (value: string) => {
    setColorTextureChoice(value);
    setTimeout(() => {
      setIsCompleted(true);
    }, 500);
  };
  
  const handleNext = () => {
    router.push(`/etapa-3?aestheticChoice=${encodeURIComponent(aestheticChoice)}&colorTextureChoice=${encodeURIComponent(colorTextureChoice)}`);
  };

  const progress = isCompleted ? 66 : 33;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-secondary p-6">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center mb-8">Agora escolha a combinação ideal de cor e textura para um piso de luxo: 🧠</h2>
        <div className="grid grid-cols-1 gap-6 w-full">
          {colorTextureOptions.map(option => (
            <button 
              key={option.id} 
              onClick={() => handleChoice(option.label)} 
              className={cn("p-6 rounded-xl border-4 text-lg font-bold transition-all duration-300 transform w-full h-24 flex items-center justify-center text-center md:text-xl", colorTextureChoice === option.label ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-lg' : 'bg-background hover:scale-105 hover:shadow-md border-transparent')}
              disabled={isCompleted}
            >
              {option.label}
            </button>
          ))}
        </div>
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full">
            <p className="text-lg font-semibold md:text-lg">Excelente escolha! Você acabou de desbloquear um novo estilo de efeito marmorizado.</p>
            <div className="w-full">
              <Progress value={progress} className="h-4" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
              <p className="text-sm font-medium mt-2 md:text-sm">2 de 3 etapas concluídas 💡</p>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 btn-golden-glow w-full rounded-full" onClick={handleNext}>
              🚀 IR PARA O ÚLTIMO DESAFIO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
