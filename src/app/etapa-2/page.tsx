'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle } from 'lucide-react';

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
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#F8F8F8] to-white p-5 pt-8 pb-8">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
      <div className="relative z-10 flex flex-col items-center w-full max-w-md text-center">
        <Progress value={progress} className="h-2.5 w-full mb-8 shadow-inner bg-gray-200" />
        
        <div className="mb-8 flex flex-col items-center">
          <div className='w-10 h-1 bg-accent mb-2 rounded-full animate-golden-glow'></div>
          <div className='flex items-center gap-2'>
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-black">Agora escolha a combinação ideal de cor e textura:</h2>
            <Brain className="w-7 h-7 text-accent animate-pulse" />
          </div>
          <p className="text-accent -mt-1 font-semibold">para um piso de luxo</p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
          {colorTextureOptions.map(option => (
            <button 
              key={option.id} 
              onClick={() => handleChoice(option.label)} 
              className={cn(
                "p-4 rounded-xl border-2 text-lg font-bold transition-all duration-250 ease-in-out transform w-full h-16 flex items-center justify-center shadow-[0_4px_14px_rgba(255,215,0,0.2)]", 
                colorTextureChoice === option.label 
                  ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-lg' 
                  : 'bg-white hover:scale-105 hover:shadow-md border-transparent text-black',
                isCompleted && colorTextureChoice !== option.label ? 'opacity-50' : ''
              )}
              disabled={isCompleted}
            >
              {option.label}
              {colorTextureChoice === option.label && <span className="ml-2 animate-fade-in-up">✅</span>}
            </button>
          ))}
        </div>
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 w-full">
              <p className="font-headline text-lg font-semibold text-black flex items-center justify-center gap-2"><CheckCircle size={22}/> Excelente escolha!</p>
              <p className="text-black/80 text-base mt-1">Você desbloqueou um novo estilo de efeito marmorizado.</p>
            </div>

            <div className="w-full text-center mt-2">
              <p className="text-sm font-medium text-gray-600">Etapa 2 de 3 concluída ✅</p>
            </div>
            <Button 
              className="mt-5 w-full rounded-full text-lg h-14 bg-gradient-to-r from-accent to-[#FFC300] text-black shadow-[0_0_16px_rgba(255,215,0,0.5)] hover:scale-105 active:scale-97" 
              onClick={handleNext}
            >
              <span className="animate-pulse mr-2">🚀</span> IR PARA O ÚLTIMO DESAFIO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
