
import React from 'react';
import { BattleMap as MapType } from '../types';

interface BattleMapProps {
  map: MapType;
  objectiveOwners: Record<string, number | null>;
  onObjectiveClick: (objectiveId: string) => void;
}

export const BattleMap: React.FC<BattleMapProps> = ({ map, objectiveOwners, onObjectiveClick }) => {
  return (
    <div className="relative w-full aspect-square bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-inner">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }} />

      {/* Table Surface Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pointer-events-none" />
      
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-700/50 pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-700/50 pointer-events-none" />

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
            {/* Owner Label Hover Effect */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
               <span className="text-[8px] font-black font-cinzel tracking-widest text-slate-500 uppercase bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                  {ownerId === 1 ? 'DESTRUCTION' : ownerId === 2 ? 'ORDER' : 'NEUTRAL'}
               </span>
            </div>
          </button>
        );
      })}

      {/* Deployment Indicators */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none">
        <span className="text-[10px] font-cinzel text-red-500/30 font-black tracking-[1em]">DEPLOYMENT</span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none">
        <span className="text-[10px] font-cinzel text-sky-500/30 font-black tracking-[1em]">DEPLOYMENT</span>
      </div>
    </div>
  );
};
