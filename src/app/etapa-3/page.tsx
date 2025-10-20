'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import GoldenParticles from '@/components/particles';
import { assessMarmorizedPattern, type MarmorizedPatternAssessmentInput } from '@/ai/flows/marmorized-pattern-assessment';
import { useToast } from '@/hooks/use-toast';
import { Award, Lock, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const finishOptions = [
  { 
    id: 'a', 
    label: 'Brilho Espelhado', 
    image: PlaceHolderImages.find(img => img.id === 'finish-shine')!
  },
  { 
    id: 'b', 
    label: 'Acetinado Natural',
    image: PlaceHolderImages.find(img => img.id === 'finish-satin')!
  },
  { 
    id: 'c', 
    label: 'Efeito Perolado',
    image: PlaceHolderImages.find(img => img.id === 'finish-pearl')!
  },
];

export default function Step3Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const aestheticChoice = searchParams.get('aestheticChoice') || '';
  const colorTextureChoice = searchParams.get('colorTextureChoice') || '';

  const [finishChoice, setFinishChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleChoice = (value: string) => {
    setFinishChoice(value);
    handleFunnelCompletion({
        aestheticChoice,
        colorTextureChoice,
        finishChoice: value
    });
    setIsCompleted(true);
    setShowParticles(true);
  };

  const handleFunnelCompletion = async (finalChoices: MarmorizedPatternAssessmentInput) => {
    try {
      await assessMarmorizedPattern(finalChoices);
    } catch (error) {
      console.error("AI assessment failed:", error);
      toast({
        title: "Erro na Análise",
        description: "Não foi possível completar a análise da IA. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const params = new URLSearchParams({
    aestheticChoice,
    colorTextureChoice,
    finishChoice,
  }).toString();

  return (
    <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-5 text-foreground">
      <GoldenParticles visible={showParticles} count={isCompleted ? 50: 15} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Progress value={isCompleted ? 100 : 66} className="mb-8 h-2.5 w-full" />
        
        <div className="animate-fade-in-up">
            <h2 className="font-headline text-3xl font-extrabold md:text-4xl">
              Por último, qual <span className="text-gradient-gold animated-text-gradient">acabamento</span> valoriza mais? ✨
            </h2>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {finishOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.label)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background w-full",
                finishChoice === option.label 
                  ? 'border-accent shadow-[0_0_24px_rgba(255,215,0,0.5)] scale-105' 
                  : 'hover:scale-105 hover:shadow-xl hover:border-accent/50',
                isCompleted && finishChoice !== option.label ? 'opacity-50 blur-[2px] grayscale' : ''
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
              />
               <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 backdrop-blur-sm">
                <p className="font-bold text-white text-lg">{option.label}</p>
              </div>
              {finishChoice === option.label && (
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
            <h3 className="font-headline text-2xl font-extrabold text-accent">🏆 Incrível!</h3>
            <p className="text-lg">Você completou o Treinamento da IA.</p>
            <div className="flex items-center justify-center gap-2 text-base font-bold bg-accent text-accent-foreground p-3 rounded-lg my-4 animate-bounce w-full shadow-lg">
              <Award size={28}/>
              <span>🎉 TODOS OS BÔNUS DESBLOQUEADOS</span>
            </div>
            <Link href={`/resultado?${params}`} passHref legacyBehavior>
                <a className="w-full">
                    <Button className="button-shine-gradient mt-5 w-full rounded-full text-lg h-14 font-bold text-black">
                        <Lock className="mr-2"/> VER MEUS BÔNUS DESBLOQUEADOS
                    </Button>
                </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
