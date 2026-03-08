
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, TrendingUp, Rocket, Award, Sparkles, Star } from 'lucide-react';

const floorImages = [
  { id: 'marble-1', url: 'https://i.postimg.cc/RhxwsXcy/3867dd5b-a2f5-4bcd-9225-9de04454be6c38b21dbca4d476e67pm94p3001.webp', label: 'Mármore Branco Luxo', sub: 'Elegante e atemporal' },
  { id: 'marble-2', url: 'https://i.postimg.cc/WpZf60mH/efeito-marmorizado-11.jpg', label: 'Negro com Veias Douradas', sub: 'Sofisticado e impactante' },
  { id: 'marble-3', url: 'https://i.postimg.cc/jqfkQy63/kk4.jpg', label: 'Colorido Moderno', sub: 'Criativo e chamativo' },
  { id: 'marble-4', url: 'https://i.postimg.cc/cHkT97L3/1-depois.png', label: 'Rústico Artesanal', sub: 'Natural e aconchegante' },
];

const testimonials = [
  { name: "Carlos M.", city: "SP", text: "Antes eu cobrava R$40/m². Agora cobro R$180/m² pelo marmorizado!", earn: "+R$4.200/sem", img: "https://i.postimg.cc/6p3mTd9r/Screenshot-353.png" },
  { name: "Roberto S.", city: "MG", text: "Do zero. Em 15 dias fechei meu primeiro contrato de R$3.800.", earn: "R$3.800/15d", img: "https://i.postimg.cc/jS5FCzsz/Screenshot-354.png" },
  { name: "André L.", city: "RJ", text: "Apliquei no mesmo dia. Melhor investimento que já fiz.", earn: "R$12K/mês", img: "https://i.postimg.cc/YC9sj1pN/Screenshot-355.png" },
  { name: "Marcos P.", city: "PR", text: "Larguei o CLT. Hoje ganho 3x mais com meus horários.", earn: "R$18.5K/mês", img: "https://i.postimg.cc/xTgZ0sS5/Screenshot-356.png" },
  { name: "Fernando R.", city: "BA", text: "Instagram saiu de 200 pra 5.000 seguidores em 2 meses!", earn: "+4.8K seg", img: "https://i.postimg.cc/44WvyjmG/aawadada.png" },
  { name: "Lucas T.", city: "DF", text: "5 contratos em um mês. Melhor decisão que tomei!", earn: "R$9.5K/mês", img: "https://i.postimg.cc/PfSbJ0PT/awdwdwd.png" },
];

type Step = 1 | 2 | 3 | 4 | 5;

const MiniTestimonial = ({ t }: { t: typeof testimonials[0] }) => (
  <div className="w-full my-4 p-5 rounded-[20px] bg-white shadow-sm border border-gray-100 animate-fade-in-up">
    <div className="flex flex-col text-center">
      <div className="flex items-center gap-3 mb-2 px-1">
        <div className="relative flex-shrink-0">
          <Image
            src={t.img}
            alt={t.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
            style={{ border: '2px solid rgba(0,194,203,0.3)' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-[15px]">{t.name}</span>
          <span className="text-[11px] text-gray-400 font-bold">• {t.city}</span>
        </div>
      </div>
      <p className="text-[14px] text-gray-600 leading-relaxed mb-4 px-2">"{t.text}"</p>
      <div className="w-full flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-black text-white shadow-sm" style={{ background: 'var(--turquoise)', letterSpacing: '0.02em' }}>
          <TrendingUp className="w-4 h-4" /> {t.earn}
        </span>
      </div>
    </div>
  </div>
);

function Bar({ value }: { value: number }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: '8px', background: '#E8EBF0' }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, background: 'linear-gradient(90deg, var(--turquoise), #F5A623)' }} />
    </div>
  );
}

function Header({ label, step, total, value, done }: { label: string; step: number; total: number; value: number; done: boolean }) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: step === total ? '#22c55e' : 'var(--turquoise)' }}>{label}</span>
        <span className="text-xs text-gray-400">Pergunta {step} de {total}</span>
      </div>
      <Bar value={done ? (step / total) * 100 : ((step - 1) / total) * 100 + 3} />
    </div>
  );
}

// Q1: Qual acabamento quer dominar
const Q1 = ({ onDone }: { onDone: (v: string) => void }) => {
  const [sel, setSel] = useState('');
  const done = sel !== '';
  return (
    <div className="flex w-full flex-col items-center p-5 min-h-screen bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center pt-4">
        <Header label="Estilo" step={1} total={5} value={done ? 20 : 3} done={done} />
        <div className="animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'Sora' }}>
            Qual acabamento você quer <span style={{ color: 'var(--turquoise)' }}>dominar primeiro</span>?
          </h2>
          <p className="mt-2 text-sm text-gray-500">Escolha o estilo que mais combina com os clientes da sua região</p>
        </div>
        <div className="mt-6 flex flex-col gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {floorImages.slice(0, 3).map((img, i) => (
            <button key={img.id} onClick={() => setSel(img.id)}
              className={cn("group relative overflow-hidden rounded-xl border-2 transition-all duration-300 w-full",
                sel === img.id ? 'quiz-option-selected scale-[1.01]' : 'border-gray-200 hover:shadow-md opacity-90 hover:opacity-100')}>
              <Image
                src={img.url}
                alt={img.label}
                width={500}
                height={500}
                className="w-full object-cover aspect-[4/5] next-image-fade-in"
                priority={i < 2}
                quality={75}
              />
              {sel === img.id && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,194,203,0.3)', backdropFilter: 'blur(2px)' }}>
                  <CheckCircle className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>
        {done && (
          <div className="mt-5 w-full animate-fade-in-up">
            <MiniTestimonial t={testimonials[0]} />
            <Button onClick={() => onDone(sel)} className="btn-cta w-full rounded-full h-14 text-base font-bold text-white flex items-center justify-center gap-2">CONTINUAR <ArrowRight className="w-5 h-5" /></Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Q2: Maior Frustração
const Q2 = ({ onDone }: { onDone: (v: string) => void }) => {
  const [sel, setSel] = useState('');
  const done = sel !== '';
  const opts = [
    { id: 'esforco_sem_valor', emoji: '😓', title: 'Trabalho muito, ganho pouco', desc: 'Sinto que meu esforço físico não é valorizado financeiramente' },
    { id: 'concorrencia_desleal', emoji: '📉', title: 'Muita concorrência por preço', desc: 'Sempre perco orçamento pra quem cobra mais barato' },
    { id: 'sem_tempo', emoji: '⏳', title: 'Não tenho tempo pra mim', desc: 'Trabalho de segunda a sábado e vivo cansado' },
    { id: 'falta_reconhecimento', emoji: '👀', title: 'Falta de reconhecimento', desc: 'Quero ser visto como um profissional de alto nível' },
  ];
  return (
    <div className="flex w-full min-h-screen flex-col items-center px-4 py-6" style={{ background: '#F7F8FA' }}>
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Header label="Diagnóstico" step={2} total={5} value={done ? 40 : 20} done={done} />
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: 'Sora' }}>Hoje, qual é a sua <span style={{ color: 'var(--turquoise)' }}>maior frustração</span> profissional?</h2>
          <p className="text-sm text-gray-500">Isso nos ajuda a entender exatamente como o método vai transformar sua realidade.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setSel(o.id)} className={cn("flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left bg-white", sel === o.id ? 'quiz-option-selected' : 'border-gray-200 hover:shadow-sm')}>
              <span className="text-3xl flex-shrink-0">{o.emoji}</span>
              <div className="flex-1"><h4 className="font-bold text-gray-900">{o.title}</h4><p className="text-xs text-gray-500">{o.desc}</p></div>
              {sel === o.id && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--turquoise)' }}><CheckCircle className="w-3.5 h-3.5 text-white" /></div>}
            </button>
          ))}
        </div>
        {done && (
          <div className="mt-5 w-full animate-fade-in-up">
            <MiniTestimonial t={testimonials[1]} />
            <Button onClick={() => onDone(sel)} className="btn-cta w-full rounded-full h-14 text-base font-bold text-white flex items-center justify-center gap-2">PRÓXIMA <ArrowRight className="w-5 h-5" /></Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Q3: Motivação Pessoal
const Q3 = ({ onDone }: { onDone: (v: string) => void }) => {
  const [sel, setSel] = useState('');
  const done = sel !== '';
  const opts = [
    { id: 'familia', emoji: '👨‍👩‍👧', title: 'Dar o melhor para minha família', desc: 'Quero poder pagar as contas em dia e ter segurança' },
    { id: 'liberdade', emoji: '✈️', title: 'Liberdade e poder viajar', desc: 'Quero ter tempo de qualidade e dinheiro sobrando' },
    { id: 'patrao', emoji: '👑', title: 'Ser meu próprio chefe', desc: 'Quero parar de trabalhar pros outros e construir algo meu' },
    { id: 'respeito', emoji: '🏆', title: 'Mudar de vida radicalmente', desc: 'Quero ser cobiçado pelos clientes de alto padrão' },
  ];
  return (
    <div className="flex w-full min-h-screen flex-col items-center px-4 py-6 bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Header label="Propósito" step={3} total={5} value={done ? 60 : 40} done={done} />
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: 'Sora' }}>Quem você quer colocar em <span style={{ color: 'var(--turquoise)' }}>primeiro lugar</span>?</h2>
          <p className="text-sm text-gray-500">Qual é o seu maior "Por quê" para querer ganhar bem?</p>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setSel(o.id)} className={cn("flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left bg-white", sel === o.id ? 'quiz-option-selected' : 'border-gray-200 hover:shadow-sm')}>
              <span className="text-3xl flex-shrink-0">{o.emoji}</span>
              <div className="flex-1"><h4 className="font-bold text-gray-900">{o.title}</h4><p className="text-xs text-gray-500">{o.desc}</p></div>
              {sel === o.id && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--turquoise)' }}><CheckCircle className="w-3.5 h-3.5 text-white" /></div>}
            </button>
          ))}
        </div>
        {done && (
          <div className="mt-5 w-full animate-fade-in-up">
            <MiniTestimonial t={testimonials[4]} />
            <Button onClick={() => onDone(sel)} className="btn-cta w-full rounded-full h-14 text-base font-bold text-white flex items-center justify-center gap-2">CONTINUAR <ArrowRight className="w-5 h-5" /></Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Q4: Percepção de Valor
const Q4 = ({ onDone }: { onDone: (v: string) => void }) => {
  const [sel, setSel] = useState('');
  const done = sel !== '';
  const opts = [
    { id: 'medo_vender', emoji: '🥶', title: 'Ainda tenho receio', desc: 'Não sei como falar de valores altos com o cliente' },
    { id: 'topa_tudo', emoji: '💪', title: 'Toparia o desafio', desc: 'Se eu tiver o script e as táticas, eu fecho!' },
    { id: 'ja_vendo', emoji: '🗣️', title: 'Eu já sei negociar', desc: 'Só me falta o produto certo nas mãos' },
    { id: 'vendedor_nato', emoji: '🦁', title: 'Sou um leão pra vendas', desc: 'Mostrando que é bom, eu coloco o preço lá em cima' },
  ];
  return (
    <div className="flex w-full min-h-screen flex-col items-center px-4 py-6" style={{ background: '#F7F8FA' }}>
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Header label="Habilidade" step={4} total={5} value={done ? 80 : 60} done={done} />
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: 'Sora' }}>Como você lida ao ter que <span style={{ color: 'var(--turquoise)' }}>cobrar caro</span>?</h2>
          <p className="text-sm text-gray-500">Marmorizado é serviço de luxo e exige uma postura diferente</p>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setSel(o.id)} className={cn("flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left bg-white", sel === o.id ? 'quiz-option-selected' : 'border-gray-200 hover:shadow-sm')}>
              <span className="text-3xl flex-shrink-0">{o.emoji}</span>
              <div className="flex-1"><h4 className="font-bold text-gray-900">{o.title}</h4><p className="text-xs text-gray-500">{o.desc}</p></div>
              {sel === o.id && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--turquoise)' }}><CheckCircle className="w-3.5 h-3.5 text-white" /></div>}
            </button>
          ))}
        </div>
        {done && (
          <div className="mt-5 w-full animate-fade-in-up">
            <MiniTestimonial t={testimonials[2]} />
            <Button onClick={() => onDone(sel)} className="btn-cta w-full rounded-full h-14 text-base font-bold text-white flex items-center justify-center gap-2">ÚLTIMA PERGUNTA <ArrowRight className="w-5 h-5" /></Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Q5: Comprometimento
const Q5 = ({ answers }: { answers: Record<string, string> }) => {
  const router = useRouter();
  const [sel, setSel] = useState('');
  const done = sel !== '';
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const opts = [
    { id: '110por_cento', emoji: '🔥', title: 'Vou dar meu sangue', desc: 'Vou estudar, praticar e não paro até faturar alto' },
    { id: 'dedicado', emoji: '📖', title: 'Sou muito dedicado', desc: 'Vou seguir todo o método passo a passo' },
    { id: 'pouco_tempo', emoji: '⏰', title: 'Tenho pouco tempo', desc: 'Vou fazer aos finais de semana até engrenar' },
    { id: 'curioso', emoji: '👀', title: 'Só estou curioso', desc: 'Achei bacana e quero ver como funciona' },
  ];

  const handleGo = () => {
    setLoading(true);
    let p = 0;
    const it = setInterval(() => {
      p += 1; setProgress(p);
      if (p >= 100) { clearInterval(it); router.push(`/resultado?${new URLSearchParams({ ...answers, timing: sel }).toString()}`); }
    }, 55);
  };

  if (loading) {
    const msgs = [
      { at: 0, icon: '🔍', text: 'Analisando suas respostas...' },
      { at: 20, icon: '📊', text: 'Calculando seu potencial de faturamento...' },
      { at: 40, icon: '🎯', text: 'Montando seu plano personalizado...' },
      { at: 60, icon: '🎁', text: 'Liberando seus bônus exclusivos...' },
      { at: 80, icon: '🏆', text: 'Finalizando sua avaliação...' },
      { at: 95, icon: '✅', text: 'Tudo pronto!' },
    ];
    const current = [...msgs].reverse().find(m => progress >= m.at) || msgs[0];

    return (
      <div className="flex w-full min-h-screen flex-col items-center justify-start pt-16 px-4 pb-8 text-center bg-white">
        <div className="flex flex-col items-center gap-8 max-w-sm w-full">
          {/* Animated circle */}
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F0F4F8" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#loadGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${progress * 2.51} 251`} className="transition-all duration-100" />
              <defs><linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00C2CB" /><stop offset="60%" stopColor="#00C2CB" /><stop offset="100%" stopColor="#F5A623" /></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black tracking-tight" style={{ fontFamily: 'Sora', color: 'var(--turquoise)' }}>{progress}%</span>
            </div>
          </div>

          <div className="text-center w-full px-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl drop-shadow-sm">{current.icon}</span>
              <h2 className="text-[22px] font-extrabold text-gray-900 leading-tight text-left" style={{ fontFamily: 'Sora' }}>{current.text}</h2>
            </div>
            <div className="flex items-center gap-1.5 justify-center mt-4">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--turquoise)', animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>

          <div className="w-full mt-4 space-y-3">
            <MiniTestimonial t={testimonials[3]} />
            {progress > 35 && <MiniTestimonial t={testimonials[5]} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen flex-col items-center px-4 py-6 bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Header label="Última!" step={5} total={5} value={done ? 100 : 80} done={done} />
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: 'Sora' }}>
            Quando você quer <span style={{ color: 'var(--turquoise)' }}>fechar seu primeiro contrato</span>?
          </h2>
          <p className="text-sm text-gray-500">Nossos alunos fecham contratos em média em 7 dias</p>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setSel(o.id)} className={cn("flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left bg-white", sel === o.id ? 'quiz-option-selected' : 'border-gray-200 hover:shadow-sm')}>
              <span className="text-3xl flex-shrink-0">{o.emoji}</span>
              <div className="flex-1"><h4 className="font-bold text-gray-900">{o.title}</h4><p className="text-xs text-gray-500">{o.desc}</p></div>
              {sel === o.id && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--turquoise)' }}><CheckCircle className="w-3.5 h-3.5 text-white" /></div>}
            </button>
          ))}
        </div>
        {done && (
          <div className="mt-5 w-full animate-fade-in-up">
            <div className="mb-5 p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(0,194,203,0.06), rgba(245,166,35,0.06))', border: '1px solid rgba(0,194,203,0.2)' }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-6 h-6" style={{ color: 'var(--turquoise)' }} />
                <h3 className="text-lg font-black" style={{ fontFamily: 'Sora', color: 'var(--turquoise)' }}>AVALIAÇÃO COMPLETA!</h3>
              </div>
              <p className="text-sm text-gray-600">Agora vamos montar seu <span className="font-bold" style={{ color: 'var(--turquoise)' }}>plano personalizado</span> com bônus exclusivos.</p>
            </div>
            <Button onClick={handleGo} className="btn-cta w-full rounded-full h-16 text-lg font-bold text-white flex items-center justify-center gap-2 animate-subtle-pulse">
              <Rocket className="w-5 h-5" /> VER MEU PLANO PERSONALIZADO
            </Button>
            <p className="mt-3 text-[11px] text-gray-400">🔒 Seus dados estão seguros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function FunnelPage() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const next = (key: string, val: string, nextStep: Step) => {
    setAnswers(p => ({ ...p, [key]: val }));
    setStep(nextStep);

    // Disable smooth scroll to avoid fighting user scrolls
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Restore quickly
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    }, 50);

    if (nextStep === 5) router.prefetch('/resultado');
  };

  return (
    <main className="min-h-screen bg-white">
      {step === 1 && <Q1 onDone={v => next('style', v, 2)} />}
      {step === 2 && <Q2 onDone={v => next('experience', v, 3)} />}
      {step === 3 && <Q3 onDone={v => next('income', v, 4)} />}
      {step === 4 && <Q4 onDone={v => next('goal', v, 5)} />}
      {step === 5 && <Q5 answers={answers} />}
    </main>
  );
}
