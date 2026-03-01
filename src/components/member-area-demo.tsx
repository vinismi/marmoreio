'use client';

import { useState, useEffect } from 'react';

const TABS = [
    { id: 'tecnicas', label: '🎨 Técnicas', icon: '🎨' },
    { id: 'bonus', label: '🎁 Bônus', icon: '🎁' },
    { id: 'teoricas', label: '📖 Aulas Teóricas', icon: '📖' },
    { id: 'videos', label: '🎥 Vídeo Aulas', icon: '🎥' },
];

const SCREENS = [
    // Screen 0: Técnicas tab - grid
    {
        tab: 0,
        type: 'grid' as const,
        header: '🎨 +300 Modelos de Marmorizado',
        badge: 'PDF',
        items: [
            { emoji: '🤍', label: 'Branco Luxo' },
            { emoji: '🖤', label: 'Negro Dourado' },
            { emoji: '💎', label: 'Calacatta' },
            { emoji: '🔥', label: 'Rústico' },
            { emoji: '🌊', label: 'Azul Oceano' },
            { emoji: '🌿', label: 'Verde Esmeralda' },
            { emoji: '🪨', label: 'Travertino' },
            { emoji: '⚡', label: 'Emperador' },
            { emoji: '✨', label: '+292', isMore: true },
        ],
        selected: 0,
    },
    // Screen 1: Bônus tab
    {
        tab: 1,
        type: 'grid' as const,
        header: '🎁 5 Bônus Exclusivos Liberados',
        badge: 'GRÁTIS',
        items: [
            { emoji: '💰', label: 'Precificação' },
            { emoji: '📲', label: 'Pack Instagram' },
            { emoji: '🎨', label: 'Materiais' },
            { emoji: '🚀', label: 'Guia Vendas' },
            { emoji: '🏆', label: 'Renda Principal' },
        ],
        selected: 1,
    },
    // Screen 2: Aulas Teóricas
    {
        tab: 2,
        type: 'modules' as const,
        header: '📖 Módulos Teóricos',
        modules: [
            { title: 'Módulo 1 — Fundamentos', lessons: 5, done: true },
            { title: 'Módulo 2 — Preparação de Superfície', lessons: 4, done: true },
            { title: 'Módulo 3 — Técnicas de Aplicação', lessons: 8, done: false },
            { title: 'Módulo 4 — Acabamento Profissional', lessons: 6, done: false },
            { title: 'Módulo 5 — Precificação e Vendas', lessons: 5, done: false },
        ],
    },
    // Screen 3: Vídeo Aulas tab - list  
    {
        tab: 3,
        type: 'lessons' as const,
        header: '🎥 Módulo 3 — Técnicas de Aplicação',
        back: '← Voltar para módulos',
        lessons: [
            { num: 1, title: 'Aula 1', dur: '12:34', done: true },
            { num: 2, title: 'Aula 2', dur: '18:22', done: true },
            { num: 3, title: 'Aula 3', dur: '15:47', done: false },
            { num: 4, title: 'Aula 4', dur: '22:10', done: false },
            { num: 5, title: 'Aula 5', dur: '14:55', done: false },
            { num: 6, title: 'Aula 6', dur: '19:38', done: false },
            { num: 7, title: 'Aula 7', dur: '16:20', done: false },
            { num: 8, title: 'Aula 8', dur: '25:03', done: false },
        ],
    },
    // Screen 4: Inside a technique detail
    {
        tab: 0,
        type: 'detail' as const,
        header: 'Mármore Branco Luxo',
        emoji: '🤍',
        tags: ['Guia em PDF', 'Material', 'Passo a Passo'],
        file: { name: 'Tecnica_Branco_Luxo.pdf', pages: 18 },
    },
];

export default function MemberAreaDemo() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentScreen(prev => (prev + 1) % SCREENS.length);
                setTransitioning(false);
            }, 400);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const screen = SCREENS[currentScreen];

    return (
        <div className="max-w-[340px] mx-auto">
            {/* Phone frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ border: '4px solid #E8EBF0', background: 'white' }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 py-2" style={{ background: 'linear-gradient(135deg, #F0FDFE, #fff)' }}>
                    <span className="text-[10px] font-bold text-gray-400">9:41</span>
                    <div className="flex gap-1">
                        <div className="w-3.5 h-2 rounded-sm" style={{ background: 'var(--turquoise)' }} />
                        <div className="w-3.5 h-2 rounded-sm bg-gray-300" />
                    </div>
                </div>

                {/* Tab bar */}
                <div className="flex items-center justify-around px-2 py-2 border-b" style={{ borderColor: '#E8EBF0' }}>
                    {TABS.map((tab, i) => (
                        <button key={tab.id} className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg transition-all"
                            style={{ background: screen.tab === i ? 'rgba(0,194,203,0.08)' : 'transparent' }}>
                            <span className="text-[10px]">{tab.icon}</span>
                            <span className={`text-[8px] font-bold ${screen.tab === i ? '' : 'text-gray-400'}`}
                                style={{ color: screen.tab === i ? 'var(--turquoise)' : undefined }}>
                                {tab.label.split(' ').slice(1).join(' ')}
                            </span>
                            {screen.tab === i && <div className="w-4 h-0.5 rounded-full mt-0.5" style={{ background: 'var(--turquoise)' }} />}
                        </button>
                    ))}
                </div>

                {/* Content area */}
                <div className={`min-h-[420px] p-4 transition-all duration-400 ${transitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>

                    {/* GRID TYPE (Técnicas / Bônus) */}
                    {screen.type === 'grid' && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-bold text-gray-800">{screen.header}</p>
                                <span className="text-[8px] font-black px-2 py-0.5 rounded text-white" style={{ background: 'var(--turquoise)' }}>{screen.badge}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {screen.items?.map((item, i) => (
                                    <div key={i} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${screen.selected === i ? 'scale-105' : ''}`}
                                        style={{
                                            background: item.isMore ? 'rgba(0,194,203,0.06)' : '#F7F8FA',
                                            border: screen.selected === i ? '2px solid var(--turquoise)' : '1px solid #E8EBF0',
                                            boxShadow: screen.selected === i ? '0 4px 12px rgba(0,194,203,0.15)' : undefined,
                                        }}>
                                        <span className={`${item.isMore ? 'text-xl font-black' : 'text-2xl'}`}
                                            style={item.isMore ? { color: 'var(--turquoise)', fontFamily: 'Sora' } : undefined}>
                                            {item.emoji}
                                        </span>
                                        <span className={`text-[9px] font-medium text-center leading-tight ${item.isMore ? 'font-bold' : 'text-gray-600'}`}
                                            style={item.isMore ? { color: 'var(--turquoise)' } : undefined}>
                                            {item.isMore ? 'e mais...' : item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* MODULES TYPE (Aulas Teóricas) */}
                    {screen.type === 'modules' && (
                        <>
                            <p className="text-xs font-bold text-gray-800 mb-4">{screen.header}</p>
                            <div className="flex flex-col gap-2">
                                {screen.modules?.map((mod, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F7F8FA', border: '1px solid #E8EBF0' }}>
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                                            style={{ background: mod.done ? '#22c55e' : 'var(--turquoise)' }}>
                                            {mod.done ? '✓' : i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-gray-800 truncate">{mod.title}</p>
                                            <p className="text-[9px] text-gray-400">{mod.lessons} aulas</p>
                                        </div>
                                        {mod.done && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: '#22c55e' }}>100%</span>}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* LESSONS TYPE (Vídeo Aulas) */}
                    {screen.type === 'lessons' && (
                        <>
                            <p className="text-[10px] font-medium mb-2" style={{ color: 'var(--turquoise)' }}>{screen.back}</p>
                            <p className="text-xs font-bold text-gray-800 mb-3">{screen.header}</p>
                            <div className="flex flex-col gap-1.5">
                                {screen.lessons?.map((les, i) => (
                                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ background: les.done ? 'rgba(34,197,94,0.04)' : '#F7F8FA', border: `1px solid ${les.done ? 'rgba(34,197,94,0.2)' : '#E8EBF0'}` }}>
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                                            style={{ background: les.done ? '#22c55e' : '#E8EBF0', color: les.done ? 'white' : '#999' }}>
                                            {les.done ? '✓' : les.num}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-bold text-gray-700">{les.title}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[9px] text-gray-400">{les.dur}</span>
                                            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--turquoise)' }}>
                                                <span className="text-white text-[7px]">▶</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* DETAIL TYPE */}
                    {screen.type === 'detail' && (
                        <div className="text-center">
                            <p className="text-[10px] font-medium mb-4 text-left" style={{ color: 'var(--turquoise)' }}>← Voltar para modelos</p>
                            <div className="text-5xl mb-3">{screen.emoji}</div>
                            <h4 className="text-sm font-black text-gray-900 mb-3" style={{ fontFamily: 'Sora' }}>{screen.header}</h4>
                            <div className="flex items-center justify-center gap-1.5 mb-5 flex-wrap">
                                {screen.tags?.map((tag, i) => (
                                    <span key={i} className="text-[8px] font-bold px-2 py-1 rounded-full" style={{ background: '#F7F8FA', border: '1px solid #E8EBF0', color: '#666' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="p-3 rounded-xl flex items-center gap-3 mb-4" style={{ background: '#F7F8FA', border: '1px solid #E8EBF0' }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,194,203,0.08)' }}>
                                    <span className="text-sm">📄</span>
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-[10px] font-bold text-gray-800">{screen.file?.name}</p>
                                    <p className="text-[8px] text-gray-400">Passo a passo completo • {screen.file?.pages} páginas</p>
                                </div>
                            </div>
                            <div className="w-full py-3 rounded-xl text-white text-xs font-black" style={{ background: 'linear-gradient(135deg, var(--turquoise), #009AA2)' }}>
                                📥 Baixar PDF
                            </div>
                        </div>
                    )}
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-1.5 pb-4 pt-2">
                    {SCREENS.map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{ background: i === currentScreen ? 'var(--turquoise)' : '#E8EBF0', transform: i === currentScreen ? 'scale(1.3)' : 'scale(1)' }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
