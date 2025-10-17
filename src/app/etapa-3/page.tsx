'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import GoldenParticles from '@/components/particles';
import { assessMarmorizedPattern, type MarmorizedPatternAssessmentInput } from '@/ai/flows/marmorized-pattern-assessment';
import { useToast } from '@/hooks/use-toast';
import { Award, Gem, Leaf, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const finishOptions = [
  { id: 'a', label: 'Brilho Espelhado', icon: Sparkles },
  { id: 'b', label: 'Acetinado Natural', icon: Leaf },
  { id: 'c', label: 'Efeito Perolado', icon: Gem },
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

  const handleNext = () => {
    const params = new URLSearchParams({
        aestheticChoice,
        colorTextureChoice,
        finishChoice,
    }).toString();
    router.push(`/resultado?${params}`);
  };

  return (
    <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-5 text-foreground">
      <GoldenParticles visible={showParticles} />
      <div className="relative z-10 flex flex-col items-center w-full max-w-md text-center">
        <Progress value={isCompleted ? 100 : 66} className="h-2.5 w-full mb-8" />
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-8">Por último, qual acabamento valoriza mais o piso? 🧱</h2>
        <div className="grid grid-cols-1 gap-6 w-full md:grid-cols-3">
          {finishOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.label)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 text-lg font-bold transition-all duration-250 ease-in-out transform w-full h-32", 
                finishChoice === option.label 
                  ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-lg' 
                  : 'bg-secondary/10 hover:bg-secondary/20 hover:scale-105 border-primary-foreground/20',
                isCompleted && finishChoice !== option.label ? 'opacity-50' : ''
              )}
              disabled={isCompleted}
            >
              <option.icon className="w-10 h-10 text-accent" />
              <span className="text-base">{option.label}</span>
              {finishChoice === option.label && <span className="absolute top-2 right-2">✅</span>}
            </button>
          ))}
        </div>
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full">
            <h3 className="font-headline text-2xl font-extrabold text-accent">Incrível!</h3>
            <p className="text-lg">Você completou o Treinamento da IA.</p>
            <div className="flex items-center justify-center gap-2 text-base font-bold bg-accent text-accent-foreground p-3 rounded-lg my-4 animate-bounce w-full">
              <Award size={28}/>
              <span>TODOS OS BÔNUS DESBLOQUEADOS</span>
            </div>
            <Button className="w-full rounded-full text-lg" onClick={handleNext}>
              🔓 VER MEUS BÔNUS DESBLOQUEADOS
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
