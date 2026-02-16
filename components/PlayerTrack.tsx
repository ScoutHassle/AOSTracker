
import React, { useMemo } from 'react';
import { Player } from '../types';

interface PlayerTrackProps {
  player: Player;
  onUpdateVP: (amount: number) => void;
  onUpdateCP: (amount: number) => void;
  onToggleStage: (tacticId: string, stageIndex: number) => void;
  side: 'left' | 'right';
  isActive: boolean;
}

export const PlayerTrack: React.FC<PlayerTrackProps> = ({ 
  player, 
  onUpdateVP, 
  onUpdateCP, 
  onToggleStage,
  side,
  isActive
}) => {
  const isRed = player.colorTheme === 'red';
  const accentColor = isRed ? 'border-red-600 bg-red-900/20' : 'border-sky-600 bg-sky-900/20';
  const textAccent = isRed ? 'text-red-500' : 'text-sky-400';
  const bgGradient = side === 'left' 
    ? 'bg-gradient-to-r from-slate-900/80 to-transparent' 
    : 'bg-gradient-to-l from-slate-900/80 to-transparent';

  const tacticsVp = useMemo(() => {
    return player.tactics.reduce((total, tactic) => {
      return total + (tactic.stages.filter(s => s.completed).length * 5);
    }, 0);
  }, [player.tactics]);

  const totalVp = player.primaryVp + tacticsVp;

  const activeGlow = isActive 
    ? (isRed ? 'shadow-[0_0_40px_rgba(220,38,38,0.15)] ring-1 ring-red-500/30' : 'shadow-[0_0_40px_rgba(56,189,248,0.15)] ring-1 ring-sky-500/30')
    : 'opacity-40 grayscale-[0.5] pointer-events-none sm:pointer-events-auto';

  return (
    <div className={`h-full flex flex-col p-4 md:p-8 space-y-8 ${bgGradient} border-x border-slate-800/50 backdrop-blur-sm transition-all duration-500 ${activeGlow}`}>
      {/* Header Info */}
      <div className="flex flex-col items-center space-y-2 relative">
        {isActive && (
          <div className={`absolute -top-4 px-3 py-0.5 rounded-full text-[10px] font-black tracking-[0.2em] font-cinzel animate-pulse ${isRed ? 'bg-red-600' : 'bg-sky-600'}`}>
            ACTIVE TURN
          </div>
        )}
        <h2 className={`font-cinzel text-3xl font-black tracking-widest ${textAccent}`}>
          {player.name}
        </h2>
      </div>

      {/* VP Section */}
      <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 shadow-2xl flex flex-col items-center">
        <span className="text-[10px] font-cinzel text-slate-400 uppercase tracking-widest mb-3 text-center">Victory Points Breakdown</span>
        
        <div className="grid grid-cols-2 w-full gap-4 border-b border-slate-700/50 pb-4 mb-3">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-cinzel text-slate-500 uppercase tracking-widest mb-1">Primary</span>
            <div className="text-3xl font-cinzel font-black text-white">{player.primaryVp}</div>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => onUpdateVP(-1)}
                className="w-7 h-7 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-slate-600 active:scale-90 transition-all text-sm"
              >-</button>
              <button 
                onClick={() => onUpdateVP(1)}
                className="w-7 h-7 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-slate-600 active:scale-90 transition-all text-sm"
              >+</button>
            </div>
          </div>
          
          <div className="flex flex-col items-center opacity-80">
            <span className="text-[8px] font-cinzel text-slate-500 uppercase tracking-widest mb-1">Tactics</span>
            <div className={`text-3xl font-cinzel font-black ${textAccent}`}>{tacticsVp}</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[8px] font-cinzel text-amber-500/50 uppercase tracking-[0.3em] font-bold">Total Battle Score</span>
          <div className="text-6xl font-cinzel font-black text-white py-1">{totalVp}</div>
        </div>
      </div>

      {/* CP Section */}
      <div className="flex flex-col items-center space-y-1">
         <span className="text-[10px] font-cinzel text-slate-400 uppercase tracking-widest">Command Points</span>
         <div className={`text-4xl font-cinzel font-bold ${textAccent} flex items-center gap-4`}>
            <button onClick={() => onUpdateCP(-1)} className="text-2xl opacity-50 hover:opacity-100">-</button>
            <span className="w-12 text-center">{player.cp}</span>
            <button onClick={() => onUpdateCP(1)} className="text-2xl opacity-50 hover:opacity-100">+</button>
         </div>
      </div>

      {/* Battle Tactics */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        <div className="flex flex-col items-center gap-1 mb-2">
            <h3 className="font-cinzel text-xs text-center uppercase tracking-[0.2em] text-slate-500">Active Battle Tactics</h3>
            <span className="text-[8px] font-bold text-slate-600 tracking-widest">5VP PER STAGE • ORDERED</span>
        </div>
        
        {player.tactics.map((tactic) => (
          <div key={tactic.id} className={`p-4 rounded-lg border-l-4 ${accentColor} transition-all bg-slate-900/40`}>
            <div className="text-sm font-bold text-slate-200 mb-3 truncate flex justify-between items-center" title={tactic.name}>
              <span>{tactic.name.toUpperCase()}</span>
              <span className="text-[10px] font-black text-slate-500">{tactic.stages.filter(s => s.completed).length * 5} VP</span>
            </div>
            <div className="flex justify-between gap-2">
              {tactic.stages.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => onToggleStage(tactic.id, idx)}
                  className={`flex-1 h-4 rounded transition-all flex items-center justify-center text-[8px] font-black ${
                    stage.completed 
                      ? (isRed ? 'bg-red-500 text-red-950 shadow-[0_0_12px_rgba(239,68,68,0.6)]' : 'bg-sky-400 text-sky-950 shadow-[0_0_12px_rgba(56,189,248,0.6)]') 
                      : 'bg-slate-700 text-slate-500 hover:bg-slate-600'
                  }`}
                  aria-label={`Toggle stage ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
