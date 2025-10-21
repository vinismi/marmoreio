'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle, Rocket } from 'lucide-react';
import Link from 'next/link';

const colorTextureOptions = [
  {
    id: 'a',
    label: 'Branco + Veios dourados',
    image: PlaceHolderImages.find(img => img.id === 'color-texture-white')!,
  },
  {
    id: 'b',
    label: 'Preto espelhado',
    image: PlaceHolderImages.find(img => img.id === 'color-texture-black')!,
  },
  {
    id: 'c',
    label: 'Azul perolado',
    image: PlaceHolderImages.find(img => img.id === 'color-texture-blue')!,
  },
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
    <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-5">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center origin-top scale-[.8] sm:scale-100 transition-transform duration-300">
        <Progress value={progress} className="mb-8 h-2.5 w-full" />
        
        <div className="mb-8 flex flex-col items-center animate-fade-in-up">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-3xl font-extrabold text-white">Agora a combinação ideal de cor e textura:</h2>
            <Brain className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <p className="-mt-1 font-semibold text-lg text-accent">para uma casa de luxo</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {colorTextureOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.label)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background w-full",
                colorTextureChoice === option.label 
                  ? 'border-accent shadow-[0_0_24px_rgba(255,215,0,0.5)] scale-105' 
                  : 'hover:scale-105 hover:shadow-xl hover:border-accent/50',
                isCompleted && colorTextureChoice !== option.label ? 'opacity-50 blur-[2px] grayscale' : ''
              )}
              disabled={isCompleted}
            >
              <Image 
                src={option.image.imageUrl} 
                alt={option.image.description} 
                width={400} 
                height={500} 
                className="w-full h-auto object-cover aspect-[4/5] rounded-[11px] transition-transform duration-300" 
                data-ai-hint={option.image.imageHint} 
                priority={index === 0}
              />
               <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 backdrop-blur-sm">
                <p className="font-bold text-white text-lg">{option.label}</p>
              </div>
              {colorTextureChoice === option.label && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                  <span className="font-headline text-2xl text-white flex items-center gap-2 animate-bounce">
                    <CheckCircle className="text-green-400"/> Selecionado
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full" style={{ animationDelay: '0.4s' }}>
            <div className="w-full rounded-lg bg-green-500/10 p-4 border border-green-500/20">
              <p className="font-headline text-lg font-semibold text-white flex items-center justify-center gap-2"><CheckCircle size={22}/> Excelente escolha!</p>
              <p className="text-white/80 text-base mt-1">Você desbloqueou um novo estilo de efeito marmorizado.</p>
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
