
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle, Rocket, Zap, Sparkles, Star, Quote, ArrowRight, Users, TrendingUp, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GoldenParticles from '@/components/particles';

const floorImages = [
  {
    id: 'marble-1',
    imageUrl: 'https://i.postimg.cc/tR6mtFdc/D-NQ-NP-834485-MLB69719549184-052023-O.webp',
    description: 'Mármore clássico elegante',
    label: 'Clássico'
  },
  {
    id: 'marble-2',
    imageUrl: 'https://i.postimg.cc/WpZf60mH/efeito-marmorizado-11.jpg',
    description: 'Efeito marmorizado moderno',
    label: 'Moderno'
  },
  {
    id: 'marble-3',
    imageUrl: 'https://i.postimg.cc/jqfkQy63/kk4.jpg',
    description: 'Piso de luxo premium',
    label: 'Premium'
  },
];

// Depoimentos para mostrar entre as perguntas
const testimonials = [
  {
    name: "Carlos M.",
    location: "São Paulo, SP",
    text: "Já fiz 3 obras essa semana. Antes eu cobrava R$40/m², agora cobro R$180/m² pelo marmorizado!",
    earnings: "+R$4.200/semana",
    image: "https://i.postimg.cc/6p3mTd9r/Screenshot-353.png"
  },
  {
    name: "Roberto S.",
    location: "Belo Horizonte, MG",
    text: "Comecei do zero, sem experiência nenhuma. Em 15 dias já tinha fechado meu primeiro contrato de R$3.800.",
    earnings: "R$3.800 em 15 dias",
    image: "https://i.postimg.cc/jS5FCzsz/Screenshot-354.png"
  },
  {
    name: "André L.",
    location: "Rio de Janeiro, RJ",
    text: "O melhor investimento que fiz. O conteúdo é direto ao ponto e já apliquei no mesmo dia que comprei.",
    earnings: "R$12.000/mês",
    image: "https://i.postimg.cc/YC9sj1pN/Screenshot-355.png"
  },
  {
    name: "Marcos P.",
    location: "Curitiba, PR",
    text: "Larguei meu emprego de CLT. Hoje faço meus horários e ganho 3x mais do que antes.",
    earnings: "R$18.500/mês",
    image: "https://i.postimg.cc/xTgZ0sS5/Screenshot-356.png"
  },
  {
    name: "Fernando R.",
    location: "Salvador, BA",
    text: "Os posts prontos me ajudaram demais! Meu Instagram saiu de 200 pra 5.000 seguidores em 2 meses.",
    earnings: "+4.800 seguidores",
    image: "https://i.postimg.cc/44WvyjmG/aawadada.png"
  },
  {
    name: "Lucas T.",
    location: "Brasília, DF",
    text: "Fechei 5 contratos em um mês só com as técnicas do curso. Melhor decisão que tomei!",
    earnings: "R$9.500/mês",
    image: "https://i.postimg.cc/PfSbJ0PT/awdwdwd.png"
  }
];

type FunnelStep = 1 | 2 | 3 | 4;

// Componente de Depoimento Inline com foto
const InlineTestimonial = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="relative w-full my-4 p-4 rounded-2xl bg-[#111] border border-white/10 animate-fade-in-up">
    <div className="flex items-start gap-3">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="flex-shrink-0 w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-white text-sm">{testimonial.name}</span>
          <span className="text-[10px] text-gray-500">• {testimonial.location}</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">"{testimonial.text}"</p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-xs font-bold text-green-400">{testimonial.earnings}</span>
        </div>
      </div>
    </div>
  </div>
);

// Step 1: Pergunta sobre gosto estético
const Step1 = ({ onComplete }: { onComplete: (choice: string) => void }) => {
  const [aestheticChoice, setAestheticChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChoice = (value: string) => {
    setAestheticChoice(value);
    setIsCompleted(true);
  };

  return (
    <div className="dark relative flex w-full flex-col items-center justify-start gap-6 overflow-hidden bg-black p-5 min-h-screen">
      <GoldenParticles visible={true} count={15} />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center pt-4">
        {/* Progress */}
        <Progress value={isCompleted ? 25 : 5} className="mb-6 h-2.5 w-full" />

        {/* Question */}
        <div className="animate-fade-in-up">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white">
            <span className="text-amber-400">Qual</span> desses pisos você acha mais bonito?
          </h2>
          <p className="mt-2 text-base text-gray-400">
            Selecione o acabamento que mais combina com você
          </p>
        </div>

        {/* Images - Large Column Layout */}
        <div className="mt-6 flex flex-col gap-4 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {floorImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleChoice(image.description)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-black w-full",
                aestheticChoice === image.description
                  ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] scale-[1.02] ring-2 ring-amber-400'
                  : 'border-white/10 hover:scale-[1.01] hover:shadow-xl hover:border-amber-500/50 opacity-90 hover:opacity-100'
              )}
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={500}
                height={300}
                className="w-full h-auto object-cover aspect-[16/10] transition-transform duration-300"
                priority={index < 2}
                unoptimized
              />
              {aestheticChoice === image.description && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  <span className="font-headline text-xl text-white flex items-center gap-2 animate-fade-in-up drop-shadow-lg">
                    <CheckCircle className="text-green-400 w-7 h-7" /> Selecionado!
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {isCompleted && (
          <div className="mt-6 w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Success Message */}
            <div className="w-full rounded-xl bg-green-500/10 p-4 border border-green-500/30 mb-4">
              <p className="flex items-center justify-center gap-2 text-lg font-semibold text-green-400">
                <CheckCircle size={22} /> Ótima escolha!
              </p>
              <p className="mt-1 text-gray-400 text-sm">
                Agora vamos entender melhor seu perfil profissional...
              </p>
            </div>

            {/* Inline Testimonial */}
            <InlineTestimonial testimonial={testimonials[0]} />
            <InlineTestimonial testimonial={testimonials[4]} />

            <Button
              onClick={() => onComplete(aestheticChoice)}
              className="button-shine-gradient w-full rounded-full h-14 text-base font-bold text-black flex items-center justify-center gap-2"
            >
              CONTINUAR PARA A PRÓXIMA ETAPA <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 2: Situação atual
const Step2 = ({ onComplete }: { onComplete: (choice: string) => void }) => {
  const [profileChoice, setProfileChoice] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const profileOptions = [
    { id: 'pintor', emoji: '🎨', title: 'Sou Pintor', desc: 'Já trabalho com pintura' },
    { id: 'reformas', emoji: '🏗️', title: 'Faço Reformas', desc: 'Trabalho com construção' },
    { id: 'zero', emoji: '🌟', title: 'Começando do Zero', desc: 'Quero aprender' },
    { id: 'marmorizado', emoji: '💎', title: 'Já Tentei Marmorizar', desc: 'Quero melhorar' },
  ];

  const handleChoice = (value: string) => {
    setProfileChoice(value);
    setIsCompleted(true);
  };

  return (
    <div className="dark relative flex w-full min-h-screen flex-col items-center justify-start bg-black px-4 py-6">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Experiência</span>
            <span className="text-xs text-gray-500">Pergunta 2 de 4</span>
          </div>
          <Progress value={isCompleted ? 50 : 25} className="h-2.5 w-full" />
        </div>

        {/* Question */}
        <div className="mb-6 animate-fade-in-up">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Qual sua <span className="text-amber-400">experiência</span> atual?
          </h2>
          <p className="text-base text-gray-400">
            Selecione a opção que mais combina com você
          </p>
        </div>

        {/* Options - Clean Dark Cards */}
        <div className="grid grid-cols-1 gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {profileOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.id)}
              className={cn(
                "group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left bg-[#111]",
                profileChoice === option.id
                  ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'border-white/10 hover:border-white/30 hover:bg-[#161616]'
              )}
            >
              <span className="text-3xl sm:text-4xl flex-shrink-0">{option.emoji}</span>
              <div className="flex-1">
                <h4 className="font-bold text-white text-base sm:text-lg">{option.title}</h4>
                <p className="text-sm text-gray-400">{option.desc}</p>
              </div>
              {profileChoice === option.id && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {isCompleted && (
          <div className="mt-6 w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <InlineTestimonial testimonial={testimonials[1]} />
            <InlineTestimonial testimonial={testimonials[2]} />

            <Button
              onClick={() => onComplete(profileChoice)}
              className="button-shine-gradient w-full rounded-full h-14 text-base font-bold text-black flex items-center justify-center gap-2"
            >
              PRÓXIMA PERGUNTA <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 3: Objetivo principal
const Step3 = ({ onComplete }: { onComplete: (choices: string[]) => void }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const goalOptions = [
    { id: 'renda', emoji: '💰', title: 'Aumentar minha renda mensal' },
    { id: 'premium', emoji: '🏆', title: 'Cobrar mais caro pelo meu trabalho' },
    { id: 'demanda', emoji: '📈', title: 'Ter mais clientes me procurando' },
    { id: 'diferencial', emoji: '⭐', title: 'Me destacar da concorrência' },
    { id: 'liberdade', emoji: '🌴', title: 'Ter mais liberdade financeira' },
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => {
      const newGoals = prev.includes(id)
        ? prev.filter(g => g !== id)
        : [...prev, id];

      if (newGoals.length > 0 && !isCompleted) {
        setIsCompleted(true);
      }
      return newGoals;
    });
  };

  return (
    <div className="dark relative flex w-full min-h-screen flex-col items-center justify-start bg-black px-4 py-6">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Objetivos</span>
            <span className="text-xs text-gray-500">Pergunta 3 de 4</span>
          </div>
          <Progress value={isCompleted ? 75 : 50} className="h-2.5 w-full" />
        </div>

        {/* Question */}
        <div className="mb-6 animate-fade-in-up">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mb-2">
            O que você mais <span className="text-amber-400">deseja alcançar</span>?
          </h2>
          <p className="text-base text-gray-400">
            <span className="text-amber-400 font-bold">Marque todas</span> que se aplicam a você
          </p>
        </div>

        {/* Options - Multiple Select */}
        <div className="flex flex-col gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {goalOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleGoal(option.id)}
              className={cn(
                "group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left bg-[#111]",
                selectedGoals.includes(option.id)
                  ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'border-white/10 hover:border-white/30 hover:bg-[#161616]'
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0",
                selectedGoals.includes(option.id)
                  ? 'bg-amber-500 border-amber-500'
                  : 'border-white/30'
              )}>
                {selectedGoals.includes(option.id) && (
                  <CheckCircle className="w-4 h-4 text-black" />
                )}
              </div>
              <span className="text-2xl flex-shrink-0">{option.emoji}</span>
              <span className={cn("font-medium text-sm sm:text-base", selectedGoals.includes(option.id) ? 'text-white' : 'text-gray-300')}>
                {option.title}
              </span>
            </button>
          ))}
        </div>

        {selectedGoals.length > 0 && (
          <div className="mt-6 w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
              <p className="text-sm text-amber-400 font-medium">
                <span className="font-bold">{selectedGoals.length}</span> objetivo(s) selecionado(s)
              </p>
            </div>

            <Button
              onClick={() => onComplete(selectedGoals)}
              className="button-shine-gradient w-full rounded-full h-14 text-base font-bold text-black flex items-center justify-center gap-2"
            >
              ÚLTIMA PERGUNTA <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 4: Motivação para começar agora
const Step4 = ({ aestheticChoice, profileChoice, goals }: { aestheticChoice: string; profileChoice: string; goals: string[] }) => {
  const router = useRouter();
  const [commitment, setCommitment] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const commitmentOptions = [
    { id: 'total', emoji: '🔥', title: 'Estou 100% comprometido', desc: 'Quero resultados rápidos' },
    { id: 'curioso', emoji: '🤔', title: 'Ainda estou avaliando', desc: 'Preciso ver mais detalhes' },
    { id: 'pronto', emoji: '🚀', title: 'Pronto para começar HOJE', desc: 'Já quero aplicar' },
  ];
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleChoice = (value: string) => {
    setCommitment(value);
    setIsCompleted(true);
  };

  const handleComplete = () => {
    setIsLoading(true);

    // Progress animation - more slow
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const params = new URLSearchParams({
          aestheticChoice: aestheticChoice,
          profileChoice: profileChoice,
          goals: goals.join(','),
          commitment: commitment,
        }).toString();
        router.push(`/resultado?${params}`);
      }
    }, 60); // 6 seconds total (60ms * 100 = 6000ms)
  };

  // Loading Screen with percentage
  if (isLoading) {
    return (
      <div className="dark relative flex w-full min-h-screen flex-col items-center justify-start bg-black px-4 py-8 text-center overflow-y-auto">
        <GoldenParticles visible={true} count={30} />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-md w-full">
          {/* Progress Circle */}
          <div className="relative flex h-32 w-32 items-center justify-center mt-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1f1f1f" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${loadingProgress * 2.83} 283`}
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{loadingProgress}%</span>
            </div>
          </div>

          {/* Text */}
          <div className="mt-2">
            <h2 className="font-headline text-2xl font-bold text-white mb-2">
              Analisando seu perfil...
            </h2>
            <p className="text-base text-gray-400">
              {loadingProgress < 30 && "Verificando suas respostas"}
              {loadingProgress >= 30 && loadingProgress < 60 && "Preparando seus bônus exclusivos"}
              {loadingProgress >= 60 && loadingProgress < 90 && "Liberando seu acesso VIP"}
              {loadingProgress >= 90 && "Quase pronto!"}
            </p>
          </div>

          {/* Testimonials during loading */}
          <div className="w-full mt-4 space-y-4">
            <InlineTestimonial testimonial={testimonials[3]} />
            {loadingProgress > 40 && <InlineTestimonial testimonial={testimonials[5]} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark relative flex w-full min-h-screen flex-col items-center justify-start bg-black px-4 py-6">
      <GoldenParticles visible={isCompleted} count={30} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Última Pergunta</span>
            <span className="text-xs text-gray-500">Pergunta 4 de 4</span>
          </div>
          <Progress value={isCompleted ? 100 : 75} className="h-2.5 w-full" />
        </div>

        {/* Final Question */}
        <div className="mb-6 animate-fade-in-up">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Qual seu nível de <span className="text-amber-400">comprometimento</span>?
          </h2>
          <p className="text-base text-gray-400">
            Seja honesto - isso nos ajuda a te direcionar melhor
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {commitmentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChoice(option.id)}
              className={cn(
                "group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left bg-[#111]",
                commitment === option.id
                  ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'border-white/10 hover:border-white/30 hover:bg-[#161616]'
              )}
            >
              <span className="text-3xl sm:text-4xl flex-shrink-0">{option.emoji}</span>
              <div className="flex-1">
                <h4 className="font-bold text-white text-base sm:text-lg">{option.title}</h4>
                <p className="text-sm text-gray-400">{option.desc}</p>
              </div>
              {commitment === option.id && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {isCompleted && (
          <div className="mt-6 w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Success Message */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/40">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-6 h-6 text-amber-400" />
                <h3 className="font-headline text-xl font-black text-amber-400">AVALIAÇÃO COMPLETA!</h3>
              </div>
              <p className="text-sm text-gray-300">
                Você foi <span className="text-green-400 font-bold">aprovado</span> para receber acesso aos bônus exclusivos.
              </p>
            </div>

            {/* Final Testimonial */}
            <InlineTestimonial testimonial={testimonials[2]} />

            <Button
              onClick={handleComplete}
              className="button-shine-gradient w-full rounded-full h-16 text-lg font-bold text-black flex items-center justify-center gap-2 animate-subtle-pulse"
            >
              <Rocket className="w-5 h-5" /> VER MEUS BÔNUS EXCLUSIVOS
            </Button>

            <p className="mt-3 text-xs text-gray-500 text-center">
              🔒 Seus dados estão seguros e não serão compartilhados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


export default function FunnelPage() {
  const [step, setStep] = useState<FunnelStep>(1);
  const [aestheticChoice, setAestheticChoice] = useState('');
  const [profileChoice, setProfileChoice] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const router = useRouter();

  const handleStep1Complete = (choice: string) => {
    setAestheticChoice(choice);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleStep2Complete = (choice: string) => {
    setProfileChoice(choice);
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handleStep3Complete = (selectedGoals: string[]) => {
    setGoals(selectedGoals);
    setStep(4);
    window.scrollTo(0, 0);
    router.prefetch('/resultado');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {step === 1 && <Step1 onComplete={handleStep1Complete} />}
      {step === 2 && <Step2 onComplete={handleStep2Complete} />}
      {step === 3 && <Step3 onComplete={handleStep3Complete} />}
      {step === 4 && <Step4 aestheticChoice={aestheticChoice} profileChoice={profileChoice} goals={goals} />}
    </main>
  );
}
