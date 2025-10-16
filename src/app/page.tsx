'use client';

import { assessMarmorizedPattern } from '@/ai/flows/marmorized-pattern-assessment';
import GoldenParticles from '@/components/particles';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Award, Box, CheckCircle, Gem, Leaf, Sparkles } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type Choices = {
  aestheticChoice: string;
  colorTextureChoice: string;
  finishChoice: string;
};

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
const floorImages = [
  PlaceHolderImages.find(img => img.id === 'marble-floor-1'),
  PlaceHolderImages.find(img => img.id === 'marble-floor-2'),
  PlaceHolderImages.find(img => img.id === 'marble-floor-3'),
].filter(Boolean) as (typeof PlaceHolderImages)[0][];

const colorTextureOptions = [
  { id: 'a', label: 'Branco + Veios dourados' },
  { id: 'b', label: 'Preto espelhado' },
  { id: 'c', label: 'Azul perolado' },
];

const finishOptions = [
  { id: 'a', label: 'Brilho Espelhado', icon: Sparkles },
  { id: 'b', label: 'Acetinado Natural', icon: Leaf },
  { id: 'c', label: 'Efeito Perolado', icon: Gem },
];

const bonuses = [
    { name: 'Como viver de pintura marmorizada', before: 'R$ 9,99', now: 'GRÁTIS' },
    { name: 'Transforme a técnica em renda extra ou principal', before: 'R$ 12,99', now: 'GRÁTIS' },
    { name: 'Guia completo de precificação', before: 'R$ 7,99', now: 'GRÁTIS' },
    { name: 'Como achar clientes que pagam bem', before: 'R$ 14,99', now: 'GRÁTIS' },
    { name: 'Melhores tintas, resinas e pigmentos', before: 'R$ 8,99', now: 'GRÁTIS' },
];

const testimonials = [
    { quote: "Aprendi com o método e comecei a fazer pisos decorativos no meu bairro. Hoje já estou cobrando R$ 220/m².", author: "Rafael, SP" },
    { quote: "Comecei com o básico e agora faço paredes marmorizadas, os clientes amam!", author: "Carlos, MG" },
    { quote: "O curso me ensinou o que ninguém mostra no YouTube: como cobrar e onde achar material bom e barato.", author: "Tiago, PR" },
];

export default function Home() {
  const [choices, setChoices] = useState<Choices>({ aestheticChoice: '', colorTextureChoice: '', finishChoice: '' });
  const [activeStep, setActiveStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState({ 1: false, 2: false, 3: false });
  const [showParticles, setShowParticles] = useState(false);
  const [bonusRowsVisible, setBonusRowsVisible] = useState<boolean[]>(new Array(bonuses.length).fill(false));
  const { toast } = useToast();

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const bonusRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  
  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleChoice = (step: number, value: string) => {
    if (step === 1) {
      setChoices(prev => ({ ...prev, aestheticChoice: value }));
      setTimeout(() => setStepCompleted(prev => ({ ...prev, 1: true })), 500);
    } else if (step === 2) {
      setChoices(prev => ({ ...prev, colorTextureChoice: value }));
      setTimeout(() => setStepCompleted(prev => ({ ...prev, 2: true })), 500);
    } else if (step === 3) {
      setChoices(prev => ({ ...prev, finishChoice: value }));
      handleFunnelCompletion({ ...choices, finishChoice: value });
      setTimeout(() => setStepCompleted(prev => ({ ...prev, 3: true })), 500);
    }
  };

  const handleFunnelCompletion = async (finalChoices: Choices) => {
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
  
  useEffect(() => {
    if(stepCompleted[3]) {
      const timers = bonuses.map((_, index) => 
        setTimeout(() => {
          setBonusRowsVisible(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 200)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [stepCompleted[3]]);

  const progress = (Object.values(stepCompleted).filter(Boolean).length / 3) * 100;

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="dark relative flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center text-foreground">
        {heroImage && (
            <Image src={heroImage.imageUrl} alt={heroImage.description} fill className="object-cover z-0 opacity-20" data-ai-hint={heroImage.imageHint} priority />
        )}
        <div className="z-10 flex flex-col items-center gap-6">
            <h1 className="font-headline text-4xl font-extrabold uppercase tracking-tight md:text-6xl">A técnica que transforma qualquer piso comum em um <span className="text-accent">mármore de luxo.</span></h1>
            <p className="max-w-2xl text-lg text-primary-foreground/80 md:text-xl">Descubra como pintores estão criando pisos marmorizados incríveis com materiais simples — e sendo pagos como artistas.</p>
            <p className="max-w-xl text-base text-primary-foreground/60">Participe do nosso treino interativo e desbloqueie bônus secretos para dominar essa técnica.</p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 btn-golden-glow text-lg font-bold" onClick={() => scrollTo(step1Ref)}>
                🧠 PARTICIPAR DO TREINAMENTO INTERATIVO
            </Button>
        </div>
      </section>

      {/* Step 1 */}
      <div ref={step1Ref} className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4 md:p-8">
        <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center">Qual desses pisos você acha mais bonito? 🪩</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {floorImages.map((image, index) => (
            <button key={image.id} onClick={() => handleChoice(1, image.description)} className={cn("group overflow-hidden rounded-lg border-4 border-transparent transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent focus:ring-offset-2", choices.aestheticChoice === image.description ? 'border-accent shadow-2xl scale-105' : 'hover:scale-105 hover:shadow-xl')}>
              <Image src={image.imageUrl} alt={image.description} width={600} height={400} className="w-full object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-110" data-ai-hint={image.imageHint} />
            </button>
          ))}
        </div>
        {stepCompleted[1] && (
            <div className="mt-6 flex flex-col items-center gap-4 text-center animate-fade-in-up">
                <p className="flex items-center gap-2 text-lg font-semibold text-green-600"><CheckCircle size={24} /> Treino IA: Etapa 1 concluída!</p>
                <p className="max-w-lg">Perfeito! Você acabou de ajudar nossa IA a reconhecer padrões de beleza na pintura marmorizada.</p>
                <Button variant="outline" className="btn-golden-glow border-accent text-accent hover:bg-accent hover:text-accent-foreground" onClick={() => scrollTo(step2Ref)}>
                    ➡️ CONTINUAR PARA O PRÓXIMO DESAFIO
                </Button>
            </div>
        )}
      </div>

      {/* Step 2 */}
      <div ref={step2Ref} className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-secondary p-4 md:p-8">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
            <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center mb-8">Agora escolha a combinação ideal de cor e textura para um piso de luxo: 🧠</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {colorTextureOptions.map(option => (
                <button key={option.id} onClick={() => handleChoice(2, option.label)} className={cn("p-8 rounded-lg border-4 text-xl font-bold transition-all duration-300 transform", choices.colorTextureChoice === option.label ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-lg' : 'bg-background hover:scale-105 hover:shadow-md border-transparent')}>
                  {option.label}
                </button>
              ))}
            </div>
            {stepCompleted[2] && (
                <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up w-full max-w-md">
                    <p className="text-lg font-semibold">Excelente escolha! Você acabou de desbloquear um novo estilo de efeito marmorizado.</p>
                    <div className="w-full">
                        <Progress value={progress} className="h-4" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
                        <p className="text-sm font-medium mt-2">2 de 3 etapas concluídas 💡</p>
                    </div>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 btn-golden-glow" onClick={() => scrollTo(step3Ref)}>
                        🚀 IR PARA O ÚLTIMO DESAFIO
                    </Button>
                </div>
            )}
          </div>
      </div>

      {/* Step 3 */}
      <div ref={step3Ref} className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4 text-foreground md:p-8">
          <GoldenParticles visible={true} />
          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
            <h2 className="font-headline text-3xl font-extrabold md:text-4xl mb-8">Por último, escolha o tipo de acabamento que mais valoriza o piso: 🧱</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {finishOptions.map(option => (
                <button key={option.id} onClick={() => handleChoice(3, option.label)} className={cn("flex flex-col items-center justify-center gap-4 p-8 rounded-lg border-2 text-xl font-bold transition-all duration-300 transform", choices.finishChoice === option.label ? 'bg-accent text-accent-foreground border-accent scale-105 shadow-lg' : 'bg-secondary/10 hover:bg-secondary/20 hover:scale-105 border-primary-foreground/20')}>
                  <option.icon className="w-12 h-12 text-accent" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            {stepCompleted[3] && (
                <div className="mt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up">
                    <GoldenParticles visible={showParticles} count={50} />
                    <h3 className="font-headline text-2xl font-extrabold text-accent">Incrível!</h3>
                    <p className="text-lg">Você completou o Treinamento da IA de Pisos Marmorizados.</p>
                    <div className="flex items-center gap-2 text-xl font-bold bg-accent text-accent-foreground p-3 rounded-lg my-4 animate-bounce">
                        <Award size={28}/>
                        <span>TODOS OS BÔNUS DESBLOQUEADOS</span>
                    </div>
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground btn-golden-glow" onClick={() => scrollTo(bonusRef)}>
                        🔓 VER MEUS BÔNUS DESBLOQUEADOS
                    </Button>
                </div>
            )}
          </div>
      </div>

      {/* Bonus Section */}
      <div ref={bonusRef} className="dark relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4 md:p-8 text-foreground">
          {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} fill className="object-cover z-0 opacity-10" data-ai-hint={heroImage.imageHint} />}
          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
            <h2 className="font-headline text-3xl font-extrabold md:text-5xl text-accent mb-2">🎉 Você desbloqueou módulos profissionais que antes eram pagos!</h2>
            <p className="text-lg mb-8">Por participar do treino interativo, você liberou acesso gratuito a todos os bônus que antes custavam caro.</p>
            <Card className="w-full bg-background/80 backdrop-blur-sm border-accent/30">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-accent/30">
                                <TableHead className="text-left font-bold text-lg text-accent">Bônus</TableHead>
                                <TableHead className="text-center font-bold text-lg text-accent">Antes</TableHead>
                                <TableHead className="text-center font-bold text-lg text-accent">Agora</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bonuses.map((bonus, index) => (
                                <TableRow key={index} className={cn("transition-all duration-500 ease-out", bonusRowsVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4', 'border-accent/20')}>
                                    <TableCell className="font-medium text-left">{bonus.name}</TableCell>
                                    <TableCell className="text-center"><del>{bonus.before}</del></TableCell>
                                    <TableCell className="text-center font-bold text-green-400 bg-green-400/10 rounded-md">{bonus.now}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <p className="mt-8 text-lg max-w-2xl">Você liberou o pacote completo que ensina não só a técnica, mas também o segredo de transformar arte em renda real.</p>
            <Button variant="ghost" className="mt-4 text-accent hover:text-accent/90" onClick={() => scrollTo(testimonialsRef)}>
                📣 VEJA O QUE DIZEM OS ALUNOS
            </Button>
          </div>
      </div>
      
      {/* Testimonials */}
      <section ref={testimonialsRef} className="flex flex-col items-center justify-center gap-8 bg-background py-16 px-4 md:py-24">
        <h2 className="font-headline text-3xl font-extrabold md:text-4xl text-center">Quem aprendeu essa técnica está mudando de vida</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-8">
            {testimonials.map((t, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <p className="text-lg italic">"{t.quote}"</p>
                        <p className="text-right font-bold mt-4">- {t.author}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <p className="mt-8 text-center text-lg max-w-3xl">Assim como eles, você também pode começar do zero e dominar o efeito marmorizado. Agora é só escolher como quer começar.</p>
        <Button size="lg" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 btn-golden-glow text-lg font-bold" onClick={() => scrollTo(plansRef)}>
            🚀 ESCOLHER MEU ACESSO
        </Button>
      </section>

      {/* Plans Section */}
      <section ref={plansRef} className="dark relative flex flex-col items-center justify-center gap-8 bg-background py-16 px-4 md:py-24">
        <div className="absolute inset-0 border-t-4 border-b-4 border-accent opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-extrabold md:text-4xl mb-4">Escolha como quer começar sua jornada na pintura marmorizada</h2>
            <p className="text-lg text-primary-foreground/80 mb-12 max-w-3xl">Você desbloqueou todos os bônus do pacote profissional e agora pode escolher entre começar com o acesso básico ou garantir o completo com tudo liberado.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <Card className="bg-secondary/5 border-primary-foreground/20 p-6 flex flex-col items-center text-center">
                    <Box className="w-16 h-16 text-accent mb-4"/>
                    <h3 className="font-headline text-2xl font-extrabold mb-2">Plano Básico</h3>
                    <p className="mb-6 h-16">Curso essencial — fundamentos e aplicação do piso marmorizado.</p>
                    <p className="text-4xl font-extrabold mb-4">R$ 5,99</p>
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 btn-golden-glow">QUERO O ACESSO BÁSICO</Button>
                </Card>
                <Card className="bg-accent/10 border-accent p-6 flex flex-col items-center text-center relative scale-105 shadow-2xl shadow-accent/20">
                    <div className="absolute -top-4 bg-accent text-accent-foreground px-4 py-1 rounded-full font-bold text-sm">MAIS ESCOLHIDO</div>
                    <Gem className="w-16 h-16 text-accent mb-4"/>
                    <h3 className="font-headline text-2xl font-extrabold mb-2">Plano Completo + Bônus</h3>
                    <p className="mb-6 h-16">Curso completo + 5 bônus desbloqueados (renda, precificação, clientes e tintas).</p>
                    <p className="text-4xl font-extrabold text-accent mb-4">R$ 14,99</p>
                    <p className="text-sm -mt-4 mb-4"><del>de R$ 53,99</del></p>
                    <Button size="lg" className="w-full bg-background text-foreground hover:bg-primary-foreground/90 btn-golden-glow">GARANTIR O PACOTE COMPLETO</Button>
                </Card>
            </div>
            <div className="mt-12 text-amber-400 font-semibold bg-amber-900/50 border border-amber-600 rounded-lg p-4 max-w-3xl">
                <p>⚠️ Essa condição só é liberada para quem completou o treino da IA. Se sair da página, o desbloqueio pode ser removido.</p>
            </div>
            <p className="mt-4 text-lg">💡 O primeiro piso que você fizer já paga o investimento inteiro.</p>
        </div>
      </section>
    </main>
  );
}
