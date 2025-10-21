'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Zap, Gem, Award, UserCheck, TrendingUp, Sparkles, Star, Rocket } from 'lucide-react';

const messages = [
  { icon: <Zap className="h-5 w-5 text-yellow-400" />, text: 'Carlos M. acabou de desbloquear o pacote completo!' },
  { icon: <UserCheck className="h-5 w-5 text-green-400" />, text: 'Mais de 1.200 pessoas estão participando do treinamento agora!' },
  { icon: <Award className="h-5 w-5 text-amber-500" />, text: 'Ana P. liberou o bônus de precificação há 2 minutos!' },
  { icon: <TrendingUp className="h-5 w-5 text-blue-400" />, text: 'Marcos L. aplicou a técnica e fechou seu primeiro serviço!' },
  { icon: <Gem className="h-5 w-5 text-fuchsia-500" />, text: 'João S. terminou a Etapa 2 e desbloqueou o acesso premium!' },
  { icon: <Sparkles className="h-5 w-5 text-white" />, text: 'Novos alunos estão entrando a cada minuto!' },
  { icon: <Star className="h-5 w-5 text-yellow-300" />, text: 'Fernanda R. de SP acabou de se inscrever no plano VIP.' },
  { icon: <Rocket className="h-5 w-5 text-red-500" />, text: 'O último acesso foi vendido há menos de 5 minutos!' },
  { icon: <UserCheck className="h-5 w-5 text-teal-400" />, text: 'Lucas B. concluiu o treinamento com sucesso.' },
  { icon: <Award className="h-5 w-5 text-orange-400" />, text: 'Juliana C. desbloqueou um bônus de acabamento especial!' },
];

const SocialProofToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const showRandomNotification = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Notification stays for 5 seconds
    };

    // Show first notification after a delay
    const initialTimeout = setTimeout(showRandomNotification, 8000);

    // Then, show notifications periodically
    const interval = setInterval(showRandomNotification, 12000); // 10-15 seconds

    return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-5 left-5 z-[9999] flex items-center gap-3 rounded-lg border border-amber-500/30 bg-black/80 p-3 pr-4 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-500 md:left-5 md:bottom-5 sm:bottom-auto sm:right-5 sm:left-auto',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        'font-headline' // Ensure Poppins is used
      )}
    >
      <div className="flex-shrink-0 animate-pulse">{currentMessage.icon}</div>
      <p className="text-sm font-medium text-white">{currentMessage.text}</p>
    </div>
  );
};

export default SocialProofToast;
