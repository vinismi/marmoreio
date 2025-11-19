
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Award, Brain, CheckCircle, Lock, Rocket, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GoldenParticles from '@/components/particles';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { assessMarmorizedPattern, type MarmorizedPatternAssessmentInput } from '@/ai/flows/marmorized-pattern-assessment';


const floorImages = [
  PlaceHolderImages.find(img => img.id === 'marble-floor-1'),
  PlaceHolderImages.find(img => img.id === 'marble-floor-2'),
  PlaceHolderImages.find(img => img.id === 'marble-floor-3'),
].filter(Boolean) as (typeof PlaceHolderImages)[0][];

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

type FunnelStep = 1 | 2 | 3;

const CourseInfoSection = () => (
    <div className="relative z-10 w-full my-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="rounded-xl border border-amber-500/30 bg-black/30 p-6 shadow-golden backdrop-blur-sm">
        <h3 className="font-headline text-2xl font-bold text-accent mb-4 text-center">✨ Como funciona o curso Efeito Marmorizado:</h3>
        <ul className="space-y-4 text-base text-white/90">
          <li className="flex items-start gap-3"><span className='text-xl'>💡</span>O acesso é instantâneo e vitalício, liberado assim que o pagamento é confirmado.</li>
          <li className="flex items-start gap-3"><span className='text-xl'>📘</span>Dentro da plataforma, você vai encontrar mais de 300 modelos e efeitos diferentes de pintura marmorizada, com instruções passo a passo.</li>
          <li className="flex items-start gap-3"><span className='text-xl'>🧰</span>Todo o conteúdo é 100% online e pode ser acessado pelo celular, tablet ou computador, de onde quiser.</li>
          <li className="flex items-start gap-3"><span className='text-xl'>⚙️</span>Você aprenderá desde os fundamentos até os efeitos avançados, incluindo pisos, paredes e combinações profissionais com brilho e resina.</li>
          <li className="flex items-start gap-3"><span className='text-xl'>🎨</span>É o material mais completo do mercado pra quem quer aprender de verdade e começar a aplicar ainda hoje.</li>
        </ul>
      </div>
    </div>
);


const Step1 = ({ onComplete }: { onComplete: (choice: string) => void }) => {
  const [aestheticChoice, setAestheticChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChoice = (value: string) => {
    setAestheticChoice(value);
    setIsCompleted(true);
  };
  
  return (
      <div className="dark relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden bg-background p-5">
          <GoldenParticles visible={true} count={15} />
          <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center origin-top transition-transform duration-300">
              <Progress value={isCompleted ? 33 : 0} className="mb-8 h-2.5 w-full" />
              <div className="animate-fade-in-up">
                  <h2 className="font-headline text-3xl font-extrabold text-white md:text-4xl">
                      <span className="text-accent">Qual</span> desses pisos você acha mais bonito?
                  </h2>
                  <p className="mt-2 text-base text-secondary-foreground/60 md:text-lg">
                      Ajude nossa IA a identificar o padrão de beleza perfeito.
                  </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {floorImages.map((image, index) => (
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
                              width={400}
                              height={500}
                              className="w-full h-auto object-cover aspect-[4/5] rounded-[11px] transition-transform duration-300"
                              data-ai-hint={image.imageHint}
                              priority={index < 2}
                          />
                          {aestheticChoice === image.description && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                  <span className="font-headline text-2xl text-white flex items-center gap-2 animate-bounce">
                                      <CheckCircle className="text-green-400" /> Selecionado
                                  </span>
                              </div>
                          )}
                      </button>
                  ))}
              </div>

              {isCompleted && (
                  <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full" style={{ animationDelay: '0.4s' }}>
                      <CourseInfoSection />
                      <div className="w-full rounded-lg bg-green-500/10 p-4 border border-green-500/20">
                          <p className="flex items-center justify-center gap-2 text-lg font-semibold text-green-400"><CheckCircle size={24} /> Treino IA: Etapa 1 concluída!</p>
                          <p className="mt-1 max-w-lg text-secondary-foreground/80 text-base">Perfeito! Você ajudou nossa IA a reconhecer padrões.</p>
                      </div>
                      <Button onClick={() => onComplete(aestheticChoice)} className="button-shine-gradient mt-5 w-full rounded-full text-base md:text-lg h-14 font-bold text-black">
                          <Zap className="mr-2" /> CONTINUAR PARA A PRÓXIMA ETAPA
                      </Button>
                  </div>
              )}
          </div>
      </div>
  );
}

const Step2 = ({ onComplete, aestheticChoice }: { onComplete: (choice: string) => void; aestheticChoice: string; }) => {
  const [colorTextureChoice, setColorTextureChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChoice = (value: string) => {
    setColorTextureChoice(value);
    setIsCompleted(true);
  };
  
  return (
    <div className="dark relative flex w-full flex-col items-center justify-center gap-8 bg-background p-5">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center origin-top transition-transform duration-300">
        <Progress value={isCompleted ? 66 : 33} className="mb-8 h-2.5 w-full" />
        
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
             <Button 
                onClick={() => onComplete(colorTextureChoice)}
                className="button-shine-gradient mt-5 w-full rounded-full text-lg h-14 font-bold text-black"
              >
                <Rocket className="mr-2"/> IR PARA O ÚLTIMO DESAFIO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const Step3 = ({ aestheticChoice, colorTextureChoice }: { aestheticChoice: string; colorTextureChoice: string; }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [finishChoice, setFinishChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleChoice = (value: string) => {
    setFinishChoice(value);
    setIsCompleted(true);
    setShowParticles(true);
  };
  
  const handleFunnelCompletion = (finalChoices: MarmorizedPatternAssessmentInput) => {
    assessMarmorizedPattern(finalChoices).catch(error => {
      console.error("AI assessment failed in the background:", error);
    });
    
    const params = new URLSearchParams({
      aestheticChoice: finalChoices.aestheticChoice,
      colorTextureChoice: finalChoices.colorTextureChoice,
      finishChoice: finalChoices.finishChoice,
    }).toString();
    router.push(`/resultado?${params}`);
  };


  return (
    <div className="dark relative flex w-full flex-col items-center justify-center gap-8 bg-background p-5 text-foreground">
      <GoldenParticles visible={showParticles} count={isCompleted ? 50: 15} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center origin-top transition-transform duration-300">
        <Progress value={isCompleted ? 100 : 66} className="mb-8 h-2.5 w-full" />
        
        <div className="animate-fade-in-up">
            <h2 className="font-headline text-3xl font-extrabold md:text-4xl">
              Por último, qual <span className="text-gradient-gold animated-text-gradient">acabamento</span> valoriza mais? ✨
            </h2>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {finishOptions.map((option, index) => (
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
                priority={index === 0}
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
            <Button 
                onClick={() => handleFunnelCompletion({ aestheticChoice, colorTextureChoice, finishChoice })} 
                className="button-shine-gradient mt-5 w-full rounded-full text-lg h-14 font-bold text-black"
            >
                <Lock className="mr-2"/> VER MEUS BÔNUS DESBLOQUEADOS
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


export default function FunnelPage() {
    const [step, setStep] = useState<FunnelStep>(1);
    const [aestheticChoice, setAestheticChoice] = useState('');
    const [colorTextureChoice, setColorTextureChoice] = useState('');
    const router = useRouter();

    const handleStep1Complete = (choice: string) => {
        setAestheticChoice(choice);
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleStep2Complete = (choice: string) => {
        setColorTextureChoice(choice);
        setStep(3);
        window.scrollTo(0, 0);
        router.prefetch('/resultado');
    };


    return (
        <main className="min-h-screen bg-background">
            {step === 1 && <Step1 onComplete={handleStep1Complete} />}
            {step === 2 && <Step2 onComplete={handleStep2Complete} aestheticChoice={aestheticChoice} />}
            {step === 3 && <Step3 aestheticChoice={aestheticChoice} colorTextureChoice={colorTextureChoice} />}
        </main>
    );
}
