'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

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
    setTimeout(() => {
      setIsCompleted(true);
    }, 500);
  };

  const handleNext = () => {
    router.push(`/etapa-2?aestheticChoice=${encodeURIComponent(aestheticChoice)}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-6">
      <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center">Qual desses pisos você acha mais bonito? 🪩</h2>
      <div className="grid grid-cols-1 gap-6 w-full max-w-sm md:grid-cols-3 md:max-w-4xl">
        {floorImages.map((image) => (
          <button
            key={image.id}
            onClick={() => handleChoice(image.description)}
            className={cn(
              "group overflow-hidden rounded-xl border-4 border-transparent transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent focus:ring-offset-2 w-full",
              aestheticChoice === image.description ? 'border-accent shadow-2xl scale-105' : 'hover:scale-105 hover:shadow-xl'
            )}
            disabled={isCompleted}
          >
            <Image src={image.imageUrl} alt={image.description} width={600} height={400} className="w-full object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-110" data-ai-hint={image.imageHint} />
          </button>
        ))}
      </div>
      {isCompleted && (
        <div className="mt-6 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full max-w-md">
          <p className="flex items-center justify-center gap-2 text-lg font-semibold text-green-600 md:text-lg"><CheckCircle size={24} /> Treino IA: Etapa 1 concluída!</p>
          <p className="max-w-lg text-base md:text-base">Perfeito! Você acabou de ajudar nossa IA a reconhecer padrões de beleza na pintura marmorizada.</p>
          <Button variant="outline" className="btn-golden-glow border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full rounded-full" onClick={handleNext}>
            ➡️ CONTINUAR PARA O PRÓXIMO DESAFIO
          </Button>
        </div>
      )}
    </div>
  );
}
