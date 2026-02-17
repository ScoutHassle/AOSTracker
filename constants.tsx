import { BattleMap, BattleTactic } from './types';

export const MAPS: BattleMap[] = [
  {
    id: 'scorched-earth',
    name: 'Scorched Earth',
    objectives: [
      { id: '1', x: 50, y: 50, radius: 10, label: 'C' },
      { id: '2', x: 20, y: 25, radius: 8 },
      { id: '3', x: 80, y: 25, radius: 8 },
      { id: '4', x: 20, y: 75, radius: 8 },
      { id: '5', x: 80, y: 75, radius: 8 },
    ],
    territories: [
      ['attacker', 'attacker', 'attacker', 'attacker'],
      ['attacker', 'neutral', 'neutral', 'attacker'],
      ['defender', 'neutral', 'neutral', 'defender'],
      ['defender', 'defender', 'defender', 'defender'],
    ]
  },
  {
    id: 'starstrike',
    name: 'Starstrike',
    objectives: [
      { id: '1', x: 50, y: 20, radius: 10 },
      { id: '2', x: 50, y: 50, radius: 10 },
      { id: '3', x: 50, y: 80, radius: 10 },
    ],
    territories: [
      ['attacker', 'attacker', 'attacker', 'attacker'],
      ['attacker', 'attacker', 'attacker', 'defender'],
      ['attacker', 'defender', 'defender', 'defender'],
      ['defender', 'defender', 'defender', 'defender'],
    ]
  },
  {
    id: 'knife-to-heart',
    name: 'Knife to the Heart',
    objectives: [
      { id: '1', x: 15, y: 50, radius: 12, label: 'HOME' },
      { id: '2', x: 85, y: 50, radius: 12, label: 'AWAY' },
    ],
    territories: [
      ['attacker', 'attacker', 'neutral', 'neutral'],
      ['attacker', 'attacker', 'neutral', 'neutral'],
      ['neutral', 'neutral', 'defender', 'defender'],
      ['neutral', 'neutral', 'defender', 'defender'],
    ]
  }
];

export const AVAILABLE_TACTICS: BattleTactic[] = [
  { id: 't1', name: 'Battle Tactic 1', stages: [{completed: false}, {completed: false}, {completed: false}] },
  { id: 't2', name: 'Battle Tactic 2', stages: [{completed: false}, {completed: false}, {completed: false}] },
  { id: 't3', name: 'Battle Tactic 3', stages: [{completed: false}, {completed: false}, {completed: false}] },
  { id: 't4', name: 'Battle Tactic 4', stages: [{completed: false}, {completed: false}, {completed: false}] },
  { id: 't5', name: 'Battle Tactic 5', stages: [{completed: false}, {completed: false}, {completed: false}] },
  { id: 't6', name: 'Battle Tactic 6', stages: [{completed: false}, {completed: false}, {completed: false}] },
];

export const INITIAL_TACTICS = AVAILABLE_TACTICS.slice(0, 2);
