
import React from 'react';

interface RoundTrackerProps {
  currentRound: number;
  onSetRound: (round: number) => void;
}

export const RoundTracker: React.FC<RoundTrackerProps> = ({ currentRound, onSetRound }) => {
  const rounds = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex bg-slate-800/80 p-1.5 rounded-full border border-slate-700 shadow-xl backdrop-blur-md">
        {rounds.map((r) => (
          <button
            key={r}
            onClick={() => onSetRound(r)}
            className={`px-5 py-2 rounded-full font-cinzel font-bold transition-all duration-300 text-sm ${
              currentRound === r
                ? 'bg-amber-600 text-white shadow-lg scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ROUND {r}
          </button>
        ))}
      </div>
      <div className="text-[10px] font-cinzel text-slate-500 tracking-[0.3em] font-bold">
        BATTLE PROGRESSION
      </div>
    </div>
  );
};
