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
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-secondary p-5">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
      <div className="relative z-10 flex flex-col items-center w-full max-w-md text-center">
        <Progress value={progress} className="h-2.5 w-full mb-8" />
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-8">Agora escolha a combinação ideal de cor e textura: 🧠</h2>
        <p className="text-secondary-foreground/80 -mt-6 mb-8">para um piso de luxo</p>
        <div className="grid grid-cols-1 gap-6 w-full">
          {colorTextureOptions.map(option => (
            <button 
              key={option.id} 
              onClick={() => handleChoice(option.label)} 
              className={cn(
                "p-6 rounded-xl border-4 text-lg font-bold transition-all duration-250 ease-in-out transform w-full h-24 flex items-center justify-center", 
                colorTextureChoice === option.label 
                  ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-lg' 
                  : 'bg-background hover:scale-105 hover:shadow-md border-transparent',
                isCompleted && colorTextureChoice !== option.label ? 'opacity-50' : ''
              )}
              disabled={isCompleted}
            >
              {option.label}
              {colorTextureChoice === option.label && <span className="ml-2">✅</span>}
            </button>
          ))}
        </div>
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full">
            <p className="text-lg font-semibold">Excelente escolha!</p>
            <p className="text-secondary-foreground/80 text-base">Você desbloqueou um novo estilo de efeito marmorizado.</p>
            <div className="w-full text-center mt-2">
              <p className="text-sm font-medium">Etapa 2 de 3 concluída ✅</p>
            </div>
            <Button className="mt-5 w-full rounded-full text-lg" onClick={handleNext}>
              🚀 IR PARA O ÚLTIMO DESAFIO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
