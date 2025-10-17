'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ArrowDown } from 'lucide-react';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const router = useRouter();
  
  const handleStart = () => {
    router.push('/etapa-1');
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="dark relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black p-6 text-center text-foreground">
        {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description} 
              fill 
              className="object-cover z-0 opacity-20" 
              data-ai-hint={heroImage.imageHint} 
              priority 
            />
        )}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="z-10 flex flex-col items-center gap-6 p-4">
            <h1 
              className="font-headline text-3xl font-extrabold uppercase tracking-tight md:text-5xl animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              A técnica que transforma qualquer piso comum em um <span className="text-accent animate-golden-glow">mármore de luxo.</span>
            </h1>
            <div 
              className="flex flex-col gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              <p className="max-w-2xl text-lg text-white md:text-xl">Descubra como pintores estão criando pisos marmorizados incríveis com materiais simples e sendo pagos como artistas.</p>
              <p className="max-w-xl text-base text-white/80 md:text-base mt-2">Participe do nosso treino interativo e desbloqueie bônus secretos para dominar essa técnica.</p>
            </div>
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 btn-golden-glow text-lg font-bold w-full max-w-md rounded-full md:text-lg animate-fade-in-up"
              onClick={handleStart}
              style={{ animationDelay: '0.8s' }}
            >
                🧠 PARTICIPAR DO TREINAMENTO INTERATIVO
            </Button>
            <Badge variant="secondary" className="mt-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              🔥 +7.000 pintores já aplicaram essa técnica!
            </Badge>
        </div>
        <div className="absolute bottom-8 animate-bounce z-10">
          <ArrowDown className="w-6 h-6 text-accent" />
        </div>
      </section>
    </main>
  );
}
