
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Award, Brain, CheckCircle, Lock, Rocket, Zap, BookOpen, Smartphone, Settings, Palette, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GoldenParticles from '@/components/particles';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { assessMarmorizedPattern, type MarmorizedPatternAssessmentInput } from '@/ai/flows/marmorized-pattern-assessment';


const floorImages = [
  {
    id: 'marble-1',
    imageUrl: 'https://i.postimg.cc/tR6mtFdc/D-NQ-NP-834485-MLB69719549184-052023-O.webp',
    description: 'Mármore clássico elegante',
    imageHint: 'marble floor elegant'
  },
  {
    id: 'marble-2',
    imageUrl: 'https://i.postimg.cc/WpZf60mH/efeito-marmorizado-11.jpg',
    description: 'Efeito marmorizado moderno',
    imageHint: 'marbled effect modern'
  },
  {
    id: 'marble-3',
    imageUrl: 'https://i.postimg.cc/jqfkQy63/kk4.jpg',
    description: 'Piso de luxo premium',
    imageHint: 'luxury premium floor'
  },
];

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
  <div className="relative z-10 w-full my-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-2xl backdrop-blur-md">

      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="font-headline text-xl md:text-2xl font-black text-white text-center uppercase tracking-wide">
          O QUE VOCÊ LEVA:
        </h3>
        <Sparkles className="w-5 h-5 text-amber-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Zap, title: "Acesso Imediato", text: "Comece agora mesmo." },
          { icon: BookOpen, title: "+300 Modelos", text: "Passo a passo completo." },
          { icon: Smartphone, title: "100% Online", text: "Celular ou PC." },
          { icon: Settings, title: "Do Zero ao Pro", text: "Sem experiência." },
          { icon: Palette, title: "Material Completo", text: "Lista de materiais." },
          { icon: Award, title: "Certificado", text: "Incluso no final." }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group">
            <div className="mb-2 p-2 rounded-full bg-black/50 border border-amber-500/20 group-hover:border-amber-500/50 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all">
              <item.icon size={20} className="text-amber-400" />
            </div>
            <h4 className="font-bold text-sm text-white mb-0.5 leading-tight">{item.title}</h4>
            <p className="text-xs text-gray-400 leading-tight">{item.text}</p>
          </div>
        ))}
      </div>
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {floorImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleChoice(image.description)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background w-full",
                aestheticChoice === image.description
                  ? 'border-accent shadow-[0_0_24px_rgba(255,215,0,0.5)] scale-105 ring-2 ring-accent'
                  : 'hover:scale-105 hover:shadow-xl hover:border-accent/50 opacity-80 hover:opacity-100'
              )}
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={400}
                height={400}
                className="w-full h-full object-cover aspect-square rounded-[11px] transition-transform duration-300"
                data-ai-hint={image.imageHint}
                priority={index < 3}
                unoptimized
              />
              {aestheticChoice === image.description && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                  <span className="font-headline text-xl md:text-2xl text-white flex items-center gap-2 animate-bounce drop-shadow-lg">
                    <CheckCircle className="text-green-400 w-6 h-6 md:w-8 md:h-8" /> Selecionado
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
            <Button onClick={() => onComplete(aestheticChoice)} className="button-shine-gradient mt-5 w-full rounded-full text-sm md:text-lg h-14 font-bold text-black">
              CONTINUAR PARA A PRÓXIMA ETAPA
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const Step2 = ({ onComplete, aestheticChoice }: { onComplete: (choice: string) => void; aestheticChoice: string; }) => {
  const [profileChoice, setProfileChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const profileOptions = [
    { id: 'pintor', emoji: '🎨', title: 'SOU PINTOR', subtitle: 'Aumentar Ticket Médio' },
    { id: 'reformas', emoji: '🏗️', title: 'FAÇO REFORMAS', subtitle: 'Adicionar Serviço de Luxo' },
    { id: 'zero', emoji: '⚡', title: 'COMEÇANDO DO ZERO', subtitle: 'Entrar no Mercado Premium' },
    { id: 'marmorizado', emoji: '💎', title: 'JÁ MARMORIZEI', subtitle: 'Resultados Profissionais' },
  ];

  const handleChoice = (value: string) => {
    setProfileChoice(value);
    setIsCompleted(true);
  };

  return (
    <div className="dark relative flex w-full min-h-screen flex-col items-center justify-start bg-background px-4 py-6">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Progress value={isCompleted ? 66 : 33} className="mb-6 h-2 w-full" />

        <div className="mb-6 flex flex-col items-center animate-fade-in-up">
          <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-white mb-1">
            Perfeito! Agora Me Conta...
          </h2>
          <p className="text-base sm:text-lg font-bold text-accent">Qual Sua Situação ATUAL?</p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {profileOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.id)}
              className={cn(
                "group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 text-center aspect-square",
                profileChoice === option.id
                  ? 'bg-[#1A1A1A] border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02]'
                  : 'bg-[#1A1A1A] border-white/10 hover:border-amber-500/50 active:scale-[0.98]'
              )}
            >
              <span className="text-3xl sm:text-4xl mb-2">{option.emoji}</span>
              <h4 className="font-bold text-white text-xs sm:text-sm leading-tight mb-0.5">{option.title}</h4>
              <p className="text-[10px] sm:text-xs text-amber-400 leading-tight">{option.subtitle}</p>
              {profileChoice === option.id && (
                <div className="absolute top-1.5 right-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        {isCompleted && (
          <div className="mt-6 flex flex-col items-center gap-3 text-center animate-fade-in-up w-full" style={{ animationDelay: '0.4s' }}>
            <div className="w-full rounded-lg bg-green-500/10 p-3 border border-green-500/20">
              <p className="font-headline text-base font-semibold text-white flex items-center justify-center gap-2"><CheckCircle size={18} /> Excelente!</p>
              <p className="text-white/80 text-sm mt-1">Entendemos seu perfil. Uma última pergunta...</p>
            </div>
            <Button
              onClick={() => onComplete(profileChoice)}
              className="button-shine-gradient mt-3 w-full rounded-full text-base h-12 font-bold text-black"
            >
              <Rocket className="mr-2 w-4 h-4" /> ÚLTIMA PERGUNTA
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

  const [motivationChoice, setMotivationChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const motivationOptions = [
    { id: 'faturar', emoji: '💰', title: 'FATURAR R$ 10-20K', subtitle: 'Ganhar Bem Fazendo O Que Amo' },
    { id: 'alto-padrao', emoji: '🏆', title: 'ALTO PADRÃO', subtitle: 'Arquitetos e Construtoras VIP' },
    { id: 'qualidade', emoji: '⏰', title: 'MENOS TRABALHO', subtitle: 'Cobrar Premium com Qualidade' },
    { id: 'referencia', emoji: '👑', title: 'SER REFERÊNCIA', subtitle: 'O Top da Minha Região' },
  ];

  const handleChoice = (value: string) => {
    setMotivationChoice(value);
    setIsCompleted(true);
    setShowParticles(true);
  };

  const handleFunnelCompletion = () => {
    setIsLoading(true);
    // Show loading for 2 seconds then redirect
    setTimeout(() => {
      const params = new URLSearchParams({
        aestheticChoice: aestheticChoice,
        colorTextureChoice: colorTextureChoice,
        finishChoice: motivationChoice,
      }).toString();
      router.push(`/resultado?${params}`);
    }, 2000);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="dark relative flex w-full min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 py-6 text-center">
        <GoldenParticles visible={true} count={40} />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute h-full w-full animate-spin rounded-full border-2 border-dashed border-accent"></div>
            <Sparkles className="h-10 w-10 text-accent animate-pulse" />
          </div>
          <h2 className="font-headline text-xl sm:text-2xl font-bold text-white">
            ✨ ANALISANDO SEU PERFIL...
          </h2>
          <p className="text-base text-white/80">Preparando sua estratégia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark relative flex w-full min-h-screen flex-col items-center justify-start bg-background px-4 py-6 text-foreground">
      <GoldenParticles visible={showParticles} count={isCompleted ? 50 : 15} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Progress value={isCompleted ? 100 : 66} className="mb-6 h-2 w-full" />

        <div className="animate-fade-in-up mb-6">
          <h2 className="font-headline text-lg sm:text-xl font-extrabold text-white mb-1">
            Última Pergunta Antes de Revelar...
          </h2>
          <p className="text-base sm:text-lg font-bold text-accent">
            O Que Te Faria Focar NISSO Agora?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {motivationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.id)}
              className={cn(
                "group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 text-center aspect-square",
                motivationChoice === option.id
                  ? 'bg-[#1A1A1A] border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02]'
                  : 'bg-[#1A1A1A] border-white/10 hover:border-amber-500/50 active:scale-[0.98]'
              )}
            >
              <span className="text-3xl sm:text-4xl mb-2">{option.emoji}</span>
              <h4 className="font-bold text-white text-xs sm:text-sm leading-tight mb-0.5">{option.title}</h4>
              <p className="text-[10px] sm:text-xs text-amber-400 leading-tight">{option.subtitle}</p>
              {motivationChoice === option.id && (
                <div className="absolute top-1.5 right-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        {isCompleted && (
          <div className="mt-6 flex flex-col items-center gap-3 text-center animate-fade-in-up w-full" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-headline text-xl font-extrabold text-accent">🏆 Incrível!</h3>
            <p className="text-base">Você completou o Treinamento.</p>
            <div className="flex items-center justify-center gap-2 text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-black p-3 rounded-lg my-2 w-full shadow-lg">
              <Award size={22} />
              <span>🎉 BÔNUS DESBLOQUEADOS</span>
            </div>
            <Button
              onClick={handleFunnelCompletion}
              className="button-shine-gradient mt-2 w-full rounded-full text-base h-12 font-bold text-black"
            >
              🚀 VER MEUS BÔNUS
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
