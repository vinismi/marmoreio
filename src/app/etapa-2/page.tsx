'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle, Rocket } from 'lucide-react';
import Link from 'next/link';

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
    setIsCompleted(true);
  };
  
  const progress = isCompleted ? 66 : 33;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#FDFBFB] to-[#EBEDEE] p-5">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Progress value={progress} className="mb-8 h-2.5 w-full shadow-inner" />
        
        <div className="mb-8 flex flex-col items-center animate-fade-in-up">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-3xl font-extrabold text-black">Agora a combinação ideal de cor e textura:</h2>
            <Brain className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <p className="text-gradient-gold animated-text-gradient -mt-1 font-semibold text-lg">para uma casa de luxo</p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {colorTextureOptions.map(option => (
            <button 
              key={option.id} 
              onClick={() => handleChoice(option.label)} 
              className={cn(
                "p-4 rounded-xl border-2 text-lg font-bold transition-all duration-300 ease-in-out transform w-full h-20 flex items-center justify-center shadow-lg", 
                colorTextureChoice === option.label 
                  ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-[0_8px_24px_rgba(255,215,0,0.4)]' 
                  : 'bg-white hover:scale-105 hover:shadow-xl border-transparent text-black shadow-black/10',
                isCompleted && colorTextureChoice !== option.label ? 'opacity-50 blur-[2px] grayscale' : ''
              )}
              disabled={isCompleted}
            >
              {option.label}
              {colorTextureChoice === option.label && <span className="ml-2 animate-bounce">✅</span>}
            </button>
          ))}
        </div>
        
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full" style={{ animationDelay: '0.4s' }}>
            <div className="w-full rounded-lg bg-green-500/10 p-4 border border-green-500/20">
              <p className="font-headline text-lg font-semibold text-black flex items-center justify-center gap-2"><CheckCircle size={22}/> Excelente escolha!</p>
              <p className="text-black/80 text-base mt-1">Você desbloqueou um novo estilo de efeito marmorizado.</p>
            </div>
            
            <Link href={`/etapa-3?aestheticChoice=${encodeURIComponent(aestheticChoice)}&colorTextureChoice=${encodeURIComponent(colorTextureChoice)}`} passHref legacyBehavior>
              <a className='w-full'>
                <Button 
                  className="button-shine-gradient mt-5 w-full rounded-full text-lg h-14 font-bold text-black"
                >
                  <Rocket className="mr-2"/> IR PARA O ÚLTIMO DESAFIO
                </Button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
