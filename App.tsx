
import React, { useState, useCallback, useMemo } from 'react';
import { Player, BattleMap, TurnRecord } from './types';
import { PlayerTrack } from './components/PlayerTrack';
import { BattleMap as MapView } from './components/BattleMap';
import { RoundTracker } from './components/RoundTracker';
import { MAPS, INITIAL_TACTICS } from './constants';

const App: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [selectedMapIndex, setSelectedMapIndex] = useState<number>(0);
  
  // Turn Management State
  const [turnOrder, setTurnOrder] = useState<number[]>([]);
  const [activeTurnIndex, setActiveTurnIndex] = useState<number>(0);
  const [isSelectingPriority, setIsSelectingPriority] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [history, setHistory] = useState<TurnRecord[]>([]);

  // Objective Ownership State: Record<objectiveId, playerId | null>
  const [objectiveOwners, setObjectiveOwners] = useState<Record<string, number | null>>({});

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: 'DESTRUCTION',
      primaryVp: 0,
      cp: 4,
      tactics: INITIAL_TACTICS.map(t => ({...t, stages: t.stages.map(s => ({...s}))})),
      colorTheme: 'red'
    },
    {
      id: 2,
      name: 'ORDER',
      primaryVp: 0,
      cp: 4,
      tactics: INITIAL_TACTICS.map(t => ({...t, stages: t.stages.map(s => ({...s}))})),
      colorTheme: 'blue'
    }
  ]);

  const calculateTacticsVp = (player: Player) => {
    return player.tactics.reduce((total, tactic) => {
      return total + (tactic.stages.filter(s => s.completed).length * 5);
    }, 0);
  };

  const getPlayerTotalVp = (player: Player) => {
    return player.primaryVp + calculateTacticsVp(player);
  };

  const activePlayerId = useMemo(() => turnOrder[activeTurnIndex], [turnOrder, activeTurnIndex]);

  const winner = useMemo(() => {
    const p1Total = getPlayerTotalVp(players[0]);
    const p2Total = getPlayerTotalVp(players[1]);
    if (p1Total > p2Total) return players[0];
    if (p2Total > p1Total) return players[1];
    return null; // Draw
  }, [players]);

  const updatePlayerVP = useCallback((playerId: number, amount: number) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, primaryVp: Math.max(0, p.primaryVp + amount) } : p
    ));
  }, []);

  const updatePlayerCP = useCallback((playerId: number, amount: number) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, cp: Math.max(0, p.cp + amount) } : p
    ));
  }, []);

  const resetCPForNewRound = useCallback(() => {
    setPlayers(prev => prev.map(p => ({ ...p, cp: 4 })));
  }, []);

  const toggleTacticStage = useCallback((playerId: number, tacticId: string, clickedIndex: number) => {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p;

      const newTactics = p.tactics.map(t => {
        if (t.id !== tacticId) return t;

        const clickedStageIsCompleted = t.stages[clickedIndex].completed;
        let newCompletedCount: number;
        if (clickedStageIsCompleted) {
          newCompletedCount = clickedIndex;
        } else {
          newCompletedCount = clickedIndex + 1;
        }

        return {
          ...t,
          stages: t.stages.map((s, idx) => ({
            ...s,
            completed: idx < newCompletedCount
          }))
        };
      });

      return {
        ...p,
        tactics: newTactics
      };
    }));
  }, []);

  const cycleMap = () => {
    setSelectedMapIndex(prev => (prev + 1) % MAPS.length);
    setObjectiveOwners({}); // Reset owners when map changes
  };

  const handleObjectiveClick = (objectiveId: string) => {
    setObjectiveOwners(prev => {
      const current = prev[objectiveId];
      if (current === null || current === undefined) return { ...prev, [objectiveId]: 1 };
      if (current === 1) return { ...prev, [objectiveId]: 2 };
      return { ...prev, [objectiveId]: null };
    });
  };

  const handleSetPriority = (firstPlayerId: number) => {
    const secondPlayerId = players.find(p => p.id !== firstPlayerId)?.id || 0;
    setTurnOrder([firstPlayerId, secondPlayerId]);
    setActiveTurnIndex(0);
    setIsSelectingPriority(false);
  };

  const captureTurnHistory = () => {
    const activePlayer = players.find(p => p.id === activePlayerId);
    if (!activePlayer) return;

    const tacticsVp = calculateTacticsVp(activePlayer);
    const turnRecord: TurnRecord = {
      round: currentRound,
      turn: activeTurnIndex + 1,
      playerName: activePlayer.name,
      playerColor: activePlayer.colorTheme,
      primaryVp: activePlayer.primaryVp,
      tacticsVp: tacticsVp,
      totalVp: activePlayer.primaryVp + tacticsVp,
      tacticsSummary: activePlayer.tactics.map(t => ({
        name: t.name,
        completedStages: t.stages.filter(s => s.completed).length
      }))
    };

    setHistory(prev => [...prev, turnRecord]);
  };

  const nextTurn = () => {
    captureTurnHistory();

    if (activeTurnIndex === 0) {
      setActiveTurnIndex(1);
    } else {
      // End of round
      if (currentRound < 5) {
        const nextRound = currentRound + 1;
        setCurrentRound(nextRound);
        setIsSelectingPriority(true);
        resetCPForNewRound();
      } else {
        setShowSummary(true);
      }
    }
  };

  const handleSetRoundManually = (round: number) => {
    setCurrentRound(round);
    setIsSelectingPriority(true);
    resetCPForNewRound();
  };

  const resetGame = () => {
    setCurrentRound(1);
    setIsSelectingPriority(true);
    setShowSummary(false);
    setActiveTurnIndex(0);
    setTurnOrder([]);
    setObjectiveOwners({});
    setHistory([]);
    setPlayers([
      {
        id: 1,
        name: 'DESTRUCTION',
        primaryVp: 0,
        cp: 4,
        tactics: INITIAL_TACTICS.map(t => ({...t, stages: t.stages.map(s => ({...s}))})),
        colorTheme: 'red'
      },
      {
        id: 2,
        name: 'ORDER',
        primaryVp: 0,
        cp: 4,
        tactics: INITIAL_TACTICS.map(t => ({...t, stages: t.stages.map(s => ({...s}))})),
        colorTheme: 'blue'
      }
    ]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500/30">
      {/* Summary Modal Overlay */}
      {showSummary && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/98 backdrop-blur-2xl p-4 overflow-y-auto">
          <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500 my-auto py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-amber-600/20 border border-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <span className="text-2xl">⚔️</span>
              </div>
              <h1 className="text-4xl font-cinzel font-black tracking-[0.2em] text-white">BATTLE ENDED</h1>
              <div className="h-px w-24 bg-amber-500/50 mx-auto" />
            </div>

            <div className="space-y-2">
              {winner ? (
                <>
                  <p className="text-slate-400 font-cinzel text-[10px] tracking-[0.4em] uppercase">The Victor is</p>
                  <h2 className={`text-4xl font-cinzel font-black tracking-widest ${winner.colorTheme === 'red' ? 'text-red-500' : 'text-sky-400'}`}>
                    {winner.name}
                  </h2>
                </>
              ) : (
                <h2 className="text-4xl font-cinzel font-black tracking-widest text-slate-300">STALEMATE (DRAW)</h2>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-800/50">
              {players.map(p => {
                const tacticsVp = calculateTacticsVp(p);
                const totalVp = p.primaryVp + tacticsVp;
                return (
                  <div key={p.id} className="space-y-2">
                    <div className={`text-[9px] font-cinzel font-black tracking-widest ${p.colorTheme === 'red' ? 'text-red-600' : 'text-sky-600'}`}>
                      {p.name}
                    </div>
                    <div className="text-5xl font-cinzel font-black text-white">{totalVp}</div>
                    <div className="flex flex-col gap-0.5 opacity-60">
                      <div className="text-[8px] font-bold text-slate-400 tracking-widest uppercase">
                        PRIMARY: {p.primaryVp} • TACTICS: {tacticsVp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Battle History Log */}
            <div className="space-y-4 text-left max-h-[40vh] overflow-y-auto px-4 custom-scrollbar">
              <h3 className="font-cinzel text-xs font-black tracking-[0.3em] text-amber-500/50 uppercase border-b border-slate-800 pb-2">Battle Chronology</h3>
              <div className="space-y-3">
                {history.map((record, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black font-cinzel text-slate-500 bg-slate-800 px-2 py-0.5 rounded">R{record.round} T{record.turn}</span>
                        <span className={`text-xs font-black font-cinzel tracking-widest ${record.playerColor === 'red' ? 'text-red-500' : 'text-sky-400'}`}>{record.playerName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        Total: <span className="text-white font-bold">{record.totalVp} VP</span> (Primary: {record.primaryVp}, Tactics: {record.tacticsVp})
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {record.tacticsSummary.map((ts, tidx) => (
                        <div key={tidx} className="text-[8px] bg-slate-950 border border-slate-800 px-2 py-1 rounded flex items-center gap-1.5">
                           <span className="text-slate-500 uppercase font-bold truncate max-w-[80px]">{ts.name}</span>
                           <span className="w-4 h-4 rounded-full bg-amber-600/20 text-amber-500 flex items-center justify-center font-black">{ts.completedStages}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-5 rounded-2xl font-cinzel font-black tracking-[0.5em] bg-white text-slate-950 hover:bg-amber-500 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] active:scale-95"
            >
              NEW BATTLE
            </button>
          </div>
        </div>
      )}

      {/* Priority Selection Modal Overlay */}
      {isSelectingPriority && !showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-6">
          <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="space-y-2">
              <h2 className="text-[10px] font-cinzel font-black tracking-[0.4em] text-amber-500/50 uppercase">Battle Round {currentRound}</h2>
              <h1 className="text-4xl font-cinzel font-black tracking-widest text-white">PRIORITY ROLL</h1>
              <p className="text-slate-400 text-sm font-medium">Who takes the first turn of this battle round?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {players.map(player => (
                <button
                  key={player.id}
                  onClick={() => handleSetPriority(player.id)}
                  className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
                    player.colorTheme === 'red' 
                      ? 'border-red-900/50 bg-red-900/10 hover:border-red-500 hover:bg-red-900/20' 
                      : 'border-sky-900/50 bg-sky-900/10 hover:border-sky-500 hover:bg-sky-900/20'
                  }`}
                >
                  <div className={`text-xs font-cinzel font-black tracking-widest mb-2 ${player.colorTheme === 'red' ? 'text-red-500' : 'text-sky-400'}`}>
                    PLAYER {player.id}
                  </div>
                  <div className="text-xl font-cinzel font-black text-white">{player.name}</div>
                  <div className={`mt-4 text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${player.colorTheme === 'red' ? 'text-red-400' : 'text-sky-300'}`}>
                    GO FIRST
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <h1 className="font-cinzel font-black tracking-widest text-amber-500">SIGMAR TRACKER</h1>
        <div className="flex gap-2">
          <button onClick={cycleMap} className="text-[10px] font-cinzel bg-slate-800 px-3 py-1 rounded border border-slate-700">MAP</button>
        </div>
      </div>

      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        {/* Left Player */}
        <section className="flex-1 order-2 md:order-1 h-[45vh] md:h-auto overflow-y-auto">
          <PlayerTrack 
            player={players[0]} 
            onUpdateVP={(amt) => updatePlayerVP(1, amt)}
            onUpdateCP={(amt) => updatePlayerCP(1, amt)}
            onToggleStage={(tid, sidx) => toggleTacticStage(1, tid, sidx)}
            isActive={activePlayerId === 1}
            side="left"
          />
        </section>

        {/* Center Area (Map & Turn Control) */}
        <section className="flex-[1.2] lg:flex-[1.5] order-1 md:order-2 flex flex-col items-center justify-center p-4 md:p-8 space-y-6 relative">
          <div className="w-full max-w-lg space-y-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                 <h2 className="font-cinzel text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">Battlefield</h2>
              </div>
              <button 
                onClick={cycleMap}
                className="text-[10px] font-cinzel text-amber-500/50 hover:text-amber-500 transition-colors uppercase font-bold"
              >
                Change Map
              </button>
            </div>
            
            <div className="relative group perspective-1000">
              <MapView 
                map={MAPS[selectedMapIndex]} 
                objectiveOwners={objectiveOwners}
                onObjectiveClick={handleObjectiveClick}
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-cinzel text-sm font-black tracking-widest opacity-20 group-hover:opacity-60 transition-opacity">
                {MAPS[selectedMapIndex].name.toUpperCase()}
              </div>
            </div>

            {/* Turn Controller */}
            {!isSelectingPriority && !showSummary && (
              <div className="flex flex-col items-center space-y-4 pt-2">
                <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-full border border-slate-800 shadow-xl">
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest font-cinzel ${activeTurnIndex === 0 ? 'bg-amber-600 text-white' : 'text-slate-600'}`}>TURN 1</div>
                   <div className="w-2 h-2 rounded-full bg-slate-700" />
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest font-cinzel ${activeTurnIndex === 1 ? 'bg-amber-600 text-white' : 'text-slate-600'}`}>TURN 2</div>
                </div>
                
                <button 
                  onClick={nextTurn}
                  className="w-full py-4 rounded-xl font-cinzel font-black tracking-[0.3em] text-sm bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-amber-500/50 hover:from-slate-800 hover:to-slate-800 transition-all shadow-2xl active:scale-[0.98]"
                >
                  {activeTurnIndex === 0 ? 'COMPLETE FIRST TURN' : 'COMPLETE ROUND'}
                </button>
              </div>
            )}
          </div>

          <div className="w-full max-w-md">
            <RoundTracker currentRound={currentRound} onSetRound={handleSetRoundManually} />
          </div>
        </section>

        {/* Right Player */}
        <section className="flex-1 order-3 h-[45vh] md:h-auto overflow-y-auto">
          <PlayerTrack 
            player={players[1]} 
            onUpdateVP={(amt) => updatePlayerVP(2, amt)}
            onUpdateCP={(amt) => updatePlayerCP(2, amt)}
            onToggleStage={(tid, sidx) => toggleTacticStage(2, tid, sidx)}
            isActive={activePlayerId === 2}
            side="right"
          />
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="p-4 flex justify-between items-center border-t border-slate-900 bg-black/30 backdrop-blur-xl">
        <div className="text-[10px] font-cinzel text-slate-600 font-black tracking-[0.5em] hidden sm:block">
          REKINDLE THE REALMGATE
        </div>
        <div className="flex gap-4 items-center">
            <span className="text-[10px] font-cinzel text-slate-500">v1.5.0</span>
            <div className="w-6 h-6 rounded bg-amber-600/20 border border-amber-600 flex items-center justify-center">
               <span className="text-[8px] font-bold text-amber-600">ST</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
