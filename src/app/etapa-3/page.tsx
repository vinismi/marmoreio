'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import GoldenParticles from '@/components/particles';
import { assessMarmorizedPattern, type MarmorizedPatternAssessmentInput } from '@/ai/flows/marmorized-pattern-assessment';
import { useToast } from '@/hooks/use-toast';
import { Award, Gem, Leaf, Sparkles } from 'lucide-react';

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
    setTimeout(() => {
        setIsCompleted(true);
    }, 500);
  };

  const handleFunnelCompletion = async (finalChoices: MarmorizedPatternAssessmentInput) => {
    setShowParticles(true);
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
    <div className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4 text-foreground md:p-8">
      <GoldenParticles visible={true} />
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
        <h2 className="font-headline text-3xl font-extrabold md:text-4xl mb-8">Por último, escolha o tipo de acabamento que mais valoriza o piso: 🧱</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {finishOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.label)}
              className={cn("flex flex-col items-center justify-center gap-4 p-8 rounded-lg border-2 text-xl font-bold transition-all duration-300 transform", finishChoice === option.label ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-lg' : 'bg-secondary/10 hover:bg-secondary/20 hover:scale-105 border-primary-foreground/20')}
              disabled={isCompleted}
            >
              <option.icon className="w-12 h-12 text-accent" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        {isCompleted && (
          <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up">
            <GoldenParticles visible={showParticles} count={50} />
            <h3 className="font-headline text-2xl font-extrabold text-accent">Incrível!</h3>
            <p className="text-lg">Você completou o Treinamento da IA de Pisos Marmorizados.</p>
            <div className="flex items-center gap-2 text-xl font-bold bg-accent text-accent-foreground p-3 rounded-lg my-4 animate-bounce">
              <Award size={28}/>
              <span>TODOS OS BÔNUS DESBLOQUEADOS</span>
            </div>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground btn-golden-glow" onClick={handleNext}>
              🔓 VER MEUS BÔNUS DESBLOQUEADOS
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
