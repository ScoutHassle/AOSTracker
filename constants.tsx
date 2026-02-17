import { BattleMap, BattleTactic } from './types';

export const MAPS: BattleMap[] = [
  {
    id: 'passing-seasons',
    name: 'Passing Seasons',
    objectives: [
      { id: '1', x: 25, y: 25, radius: 4 },
      { id: '2', x: 75, y: 25, radius: 4 },
      { id: '3', x: 25, y: 75, radius: 4 },
      { id: '4', x: 75, y: 75, radius: 4 },
    ],
    territories: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 2, 2],
      [0, 0, 2, 2],
    ]
  },
  {
    id: 'paths-of-the-fey',
    name: 'Paths of the Fey',
    objectives: [
      { id: '0', x: 50, y: 50, radius: 4 },
      { id: '1', x: 12.5, y: 25, radius: 4 },
      { id: '2', x: 87.5, y: 25, radius: 4 },
      { id: '3', x: 12.5, y: 75, radius: 4 },
      { id: '4', x: 87.5, y: 75, radius: 4 },
    ],
    territories: [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 2, 2, 0],
      [0, 2, 2, 0],
    ]
  },
  {
    id: 'roiling-roots',
    name: 'Roiling Roots',
    objectives: [
      { id: '1', x: 62.5, y: 12.5, radius: 4 },
      { id: '2', x: 37.5, y: 37.5, radius: 4 },
      { id: '3', x: 87.5, y: 37.5, radius: 4 },
      { id: '4', x: 12.5, y: 62.5, radius: 4 },
      { id: '5', x: 62.5, y: 62.5, radius: 4 },
      { id: '6', x: 37.5, y: 87.5, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 2],
    ]
  },
  {
    id: 'cyclic-shifts',
    name: 'Cyclic Shifts',
    objectives: [
      { id: '1', x: 12.5, y: 12.5, radius: 4 },
      { id: '2', x: 50, y: 25, radius: 4 },
      { id: '3', x: 87.5, y: 37.5, radius: 4 },
      { id: '4', x: 12.5, y: 62.5, radius: 4 },
      { id: '5', x: 50, y: 75, radius: 4 },
      { id: '6', x: 87.5, y: 87.5, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 2],
    ]
  },
  {
    id: 'surge-of-slaughter',
    name: 'Surge of Slaughter',
    objectives: [
      { id: '0', x: 37.5, y: 12.5, radius: 4 },
      { id: '1', x: 87.5, y: 37.5, radius: 4 },
      { id: '2', x: 50, y: 50, radius: 4 },
      { id: '3', x: 12.5, y: 62.5, radius: 4 },
      { id: '4', x: 62.5, y: 87.5, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
    ]
  },
  {
    id: 'linked-ley-lines',
    name: 'Linked Ley Lines',
    objectives: [
      { id: '0', x: 50, y: 25, radius: 4 },
      { id: '1', x: 25, y: 50, radius: 4 },
      { id: '2', x: 50, y: 50, radius: 4 },
      { id: '3', x: 75, y: 50, radius: 4 },
      { id: '4', x: 50, y: 75, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1], // Attacker
      [0, 0, 0, 0], // Neutral
      [0, 0, 0, 0], // Neutral
      [2, 2, 2, 2], // Defender
    ]
  },
  {
    id: 'noxious-nexus',
    name: 'Noxious Nexus',
    objectives: [
      { id: '0', x: 25, y: 50, radius: 4 },
      { id: '1', x: 50, y: 50, radius: 4 },
      { id: '2', x: 75, y: 50, radius: 4 },
    ],
    territories: [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [0, 0, 2, 2],
      [0, 0, 2, 2],
    ]
  },
  {
    id: 'the-liferoots',
    name: 'The Liferoots',
    objectives: [
      { id: '0', x: 25, y: 50, radius: 4 },
      { id: '1', x: 75, y: 50, radius: 4 },
    ],
    territories: [
      [1, 1, 0, 0],
      [1, 1, 2, 2],
      [1, 1, 2, 2],
      [0, 0, 2, 2],
    ]
  },
  {
    id: 'bountiful-equinox',
    name: 'Bountiful Equinox',
    objectives: [
      { id: '0', x: 25, y: 25, radius: 4 },
      { id: '1', x: 75, y: 25, radius: 4 },
      { id: '2', x: 50, y: 50, radius: 4 },
      { id: '3', x: 25, y: 75, radius: 4 },
      { id: '4', x: 75, y: 75, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
    ]
  },
  {
    id: 'lifecycle',
    name: 'Lifecycle',
    objectives: [
      { id: '0', x: 50, y: 25, radius: 4 },
      { id: '1', x: 25, y: 50, radius: 4 },
      { id: '2', x: 75, y: 50, radius: 4 },
      { id: '3', x: 50, y: 75, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [2, 0, 0, 2],
      [2, 2, 2, 2],
    ]
  },
    {
    id: 'creeping-corruption',
    name: 'Creeping Corruption',
    objectives: [
      { id: '0', x: 12.5, y: 25, radius: 4 },
      { id: '1', x: 50, y: 25, radius: 4 },
      { id: '2', x: 87.5, y: 25, radius: 4 },
      { id: '3', x: 12.5, y: 75, radius: 4 },
      { id: '4', x: 50, y: 75, radius: 4 },
      { id: '5', x: 87.5, y: 75, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
    ]
  },
  {
    id: 'grasp-of-thorns',
    name: 'Grasp of Thorns',
    objectives: [
      { id: '0', x: 25, y: 25, radius: 4 },
      { id: '1', x: 75, y: 25, radius: 4 },
      { id: '2', x: 25, y: 75, radius: 4 },
      { id: '3', x: 75, y: 75, radius: 4 },
    ],
    territories: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
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