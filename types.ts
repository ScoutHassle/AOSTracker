
export interface BattleTacticStage {
  completed: boolean;
}

export interface BattleTactic {
  id: string;
  name: string;
  stages: BattleTacticStage[];
}

export interface Player {
  id: number;
  name: string;
  primaryVp: number;
  cp: number;
  tactics: BattleTactic[];
  colorTheme: 'red' | 'blue';
}

export interface TurnRecord {
  round: number;
  turn: number;
  playerName: string;
  playerColor: 'red' | 'blue';
  primaryVp: number;
  tacticsVp: number;
  totalVp: number;
  tacticsSummary: { name: string; completedStages: number }[];
}

export interface MapObjective {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  radius: number; // relative size
  label?: string;
}

export interface BattleMap {
  id: string;
  name: string;
  objectives: MapObjective[];
}
