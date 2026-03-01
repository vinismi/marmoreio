
'use client';

import { useState, useEffect } from 'react';

const proofs = [
  { name: 'Carlos', city: 'São Paulo', time: '3 min' },
  { name: 'Marcos', city: 'Curitiba', time: '7 min' },
  { name: 'Roberto', city: 'BH', time: '12 min' },
  { name: 'André', city: 'Rio de Janeiro', time: '2 min' },
  { name: 'Lucas', city: 'Brasília', time: '5 min' },
  { name: 'Fernando', city: 'Salvador', time: '8 min' },
  { name: 'Diego', city: 'Fortaleza', time: '1 min' },
  { name: 'Thiago', city: 'Porto Alegre', time: '15 min' },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const show = () => {
      setCurrent(Math.floor(Math.random() * proofs.length));
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const initialTimeout = setTimeout(show, 5000);
    const interval = setInterval(show, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const proof = proofs[current];

  return (
    <div className="social-proof-toast">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--turquoise), #009AA2)' }}>
          {proof.name[0]}
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">
            {proof.name} de {proof.city}
          </p>
          <p className="text-xs text-gray-600">acabou de comprar — há {proof.time}</p>
          <div className="flex mt-1">{'⭐⭐⭐⭐⭐'.split('').map((s, i) => <span key={i} className="text-xs">{s}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
