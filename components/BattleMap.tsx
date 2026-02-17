
import React from 'react';
import { BattleMap as MapType, TerritoryType } from '../types';

interface BattleMapProps {
  map: MapType;
  objectiveOwners: Record<string, number | null>;
  onObjectiveClick: (objectiveId: string) => void;
}

const getTerritoryColor = (type: TerritoryType) => {
  switch (type) {
    case 'attacker': return 'bg-red-950/30';
    case 'defender': return 'bg-sky-950/30';
    case 'neutral': return 'bg-slate-800/20';
    default: return 'transparent';
  }
};

export const BattleMap: React.FC<BattleMapProps> = ({ map, objectiveOwners, onObjectiveClick }) => {
  return (
    <div className="relative w-full aspect-[3/2] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* 4x4 Territory Grid Background */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
        {map.territories.flat().map((type, idx) => (
          <div 
            key={idx} 
            className={`transition-colors duration-1000 ${getTerritoryColor(type)}`}
          />
        ))}
      </div>

      {/* Grid Dashed Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px border-l border-dashed border-slate-700/40" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px border-l border-slate-600/60" /> {/* Center */}
        <div className="absolute left-3/4 top-0 bottom-0 w-px border-l border-dashed border-slate-700/40" />
        
        {/* Horizontal lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px border-t border-dashed border-slate-700/40" />
        <div className="absolute top-2/4 left-0 right-0 h-px border-t border-slate-600/60" /> {/* Center */}
        <div className="absolute top-3/4 left-0 right-0 h-px border-t border-dashed border-slate-700/40" />
      </div>

      {/* Territory Text Labels */}
      <div className="absolute top-4 left-6 pointer-events-none select-none opacity-40">
        <h3 className="font-cinzel font-black text-xs md:text-sm tracking-widest text-white leading-tight">
          ATTACKER'S<br />TERRITORY
        </h3>
      </div>
      <div className="absolute bottom-4 right-6 pointer-events-none select-none opacity-40 text-right">
        <h3 className="font-cinzel font-black text-xs md:text-sm tracking-widest text-white leading-tight">
          DEFENDER'S<br />TERRITORY
        </h3>
      </div>

      {/* Compass Rose */}
      <div className="absolute top-4 right-6 flex flex-col items-center pointer-events-none select-none">
        <span className="font-cinzel font-black text-lg text-white mb-[-8px]">N</span>
        <div className="w-8 h-8 opacity-40">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
             <path d="M12 2L15 12L12 22L9 12L12 2Z" fill="currentColor" />
             <path d="M2 12L12 15L22 12L12 9L2 12Z" />
           </svg>
        </div>
      </div>

      {/* Objectives */}
      {map.objectives.map((obj) => {
        const ownerId = objectiveOwners[obj.id];
        
        let colorClass = "border-slate-500/50 bg-slate-700/20";
        let dotClass = "bg-slate-400";
        let glowClass = "shadow-[0_0_10px_rgba(148,163,184,0)]";
        let labelClass = "text-slate-500";

        if (ownerId === 1) { // Destruction / Red
          colorClass = "border-red-500/80 bg-red-900/30";
          dotClass = "bg-red-500";
          glowClass = "shadow-[0_0_20px_rgba(239,68,68,0.5)]";
          labelClass = "text-red-400";
        } else if (ownerId === 2) { // Order / Blue
          colorClass = "border-sky-500/80 bg-sky-900/30";
          dotClass = "bg-sky-500";
          glowClass = "shadow-[0_0_20px_rgba(56,189,248,0.5)]";
          labelClass = "text-sky-400";
        }

        return (
          <button
            key={obj.id}
            onClick={() => onObjectiveClick(obj.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 active:scale-90"
            style={{ left: `${obj.x}%`, top: `${obj.y}%`, zIndex: 10 }}
            aria-label={`Toggle objective ${obj.label || obj.id}`}
          >
            <div 
              className={`rounded-full border-2 ${colorClass} backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${glowClass}`}
              style={{ width: `${obj.radius * 2}vw`, height: `${obj.radius * 2}vw`, maxWidth: '100px', maxHeight: '100px' }}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${dotClass} transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
              {obj.label && (
                <span className={`absolute -bottom-6 text-[10px] font-cinzel font-bold ${labelClass} tracking-widest whitespace-nowrap transition-colors duration-300`}>
                  {obj.label}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
