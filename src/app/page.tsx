'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const router = useRouter();
  
  const handleStart = () => {
    router.push('/etapa-1');
  };

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
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 btn-golden-glow text-lg font-bold" onClick={handleStart}>
                🧠 PARTICIPAR DO TREINAMENTO INTERATIVO
            </Button>
        </div>
      </section>
    </main>
  );
}
