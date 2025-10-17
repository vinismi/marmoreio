'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GoldenParticles from '@/components/particles';

const floorImages = [
  PlaceHolderImages.find(img => img.id === 'marble-floor-1'),
  PlaceHolderImages.find(img => img.id === 'marble-floor-2'),
  PlaceHolderImages.find(img => img.id === 'marble-floor-3'),
].filter(Boolean) as (typeof PlaceHolderImages)[0][];

export default function Step1Page() {
  const router = useRouter();
  const [aestheticChoice, setAestheticChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChoice = (value: string) => {
    setAestheticChoice(value);
    setIsCompleted(true);
  };

  const handleNext = () => {
    router.push(`/etapa-2?aestheticChoice=${encodeURIComponent(aestheticChoice)}`);
  };

  const progress = isCompleted ? 33 : 0;

  return (
    <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-background p-5">
      <GoldenParticles visible={true} count={15} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Progress value={progress} className="mb-8 h-2.5 w-full" />
        <div className="animate-fade-in-up">
            <h2 className="font-headline text-3xl font-extrabold text-white md:text-4xl">
              <span className="text-accent">Qual</span> desses pisos você acha mais bonito?
            </h2>
            <p className="mt-2 text-base text-secondary-foreground/60 md:text-lg">
              Ajude nossa IA a identificar o padrão de beleza perfeito.
            </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {floorImages.map((image) => (
            <button
              key={image.id}
              onClick={() => handleChoice(image.description)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background w-full",
                aestheticChoice === image.description 
                  ? 'border-accent shadow-[0_0_24px_rgba(255,215,0,0.5)] scale-105' 
                  : 'hover:scale-105 hover:shadow-xl hover:border-accent/50',
                isCompleted && aestheticChoice !== image.description ? 'opacity-50 blur-[2px] grayscale' : ''
              )}
              disabled={isCompleted}
            >
              <Image 
                src={image.imageUrl} 
                alt={image.description} 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover aspect-[3/2] rounded-[11px] transition-transform duration-300" 
                data-ai-hint={image.imageHint} 
              />
              {aestheticChoice === image.description && (
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
              <p className="flex items-center justify-center gap-2 text-lg font-semibold text-green-400"><CheckCircle size={24} /> Treino IA: Etapa 1 concluída!</p>
              <p className="mt-1 max-w-lg text-secondary-foreground/80 text-base">Perfeito! Você ajudou nossa IA a reconhecer padrões.</p>
            </div>
            <Button className="button-shine-gradient mt-5 w-full rounded-full text-lg h-14 font-bold text-black" onClick={handleNext}>
              <Zap className="mr-2"/> CONTINUAR PARA A PRÓXIMA ETAPA
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
