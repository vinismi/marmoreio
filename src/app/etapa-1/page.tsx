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
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-5">
      <div className="w-full max-w-md text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-8">Qual desses pisos você acha mais bonito? 🪩</h2>
        <div className="grid grid-cols-1 gap-6 w-full">
          {floorImages.map((image) => (
            <button
              key={image.id}
              onClick={() => handleChoice(image.description)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-4 border-transparent transition-all duration-250 ease-in-out focus:outline-none focus:ring-4 focus:ring-accent focus:ring-offset-2 w-full",
                aestheticChoice === image.description 
                  ? 'border-accent shadow-2xl scale-105' 
                  : 'hover:scale-105 hover:shadow-xl hover:shadow-black/25',
                isCompleted && aestheticChoice !== image.description ? 'opacity-50' : ''
              )}
              disabled={isCompleted}
            >
              <Image 
                src={image.imageUrl} 
                alt={image.description} 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover aspect-[3/2] rounded-[14px] transition-transform duration-300 group-hover:scale-110" 
                data-ai-hint={image.imageHint} 
              />
              {aestheticChoice === image.description && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-white font-bold text-lg flex items-center gap-2">Selecionado ✅</span>
                </div>
              )}
            </button>
          ))}
        </div>
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full">
            <p className="flex items-center justify-center gap-2 text-lg font-semibold text-green-600"><CheckCircle size={24} /> Treino IA: Etapa 1 concluída!</p>
            <p className="max-w-lg text-secondary-foreground/80 text-base">Perfeito! Você ajudou nossa IA a reconhecer padrões de beleza.</p>
            <Button className="mt-5 w-full rounded-full text-lg" onClick={handleNext}>
              ➡️ CONTINUAR PARA A PRÓXIMA ETAPA
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
