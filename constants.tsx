
import { BattleMap } from './types';

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
    ]
  },
  {
    id: 'starstrike',
    name: 'Starstrike',
    objectives: [
      { id: '1', x: 50, y: 20, radius: 10 },
      { id: '2', x: 50, y: 50, radius: 10 },
      { id: '3', x: 50, y: 80, radius: 10 },
    ]
  },
  {
    id: 'knife-to-heart',
    name: 'Knife to the Heart',
    objectives: [
      { id: '1', x: 15, y: 50, radius: 12, label: 'HOME' },
      { id: '2', x: 85, y: 50, radius: 12, label: 'AWAY' },
    ]
  }
];

export const INITIAL_TACTICS = [
  { id: '1', name: 'Slay the Warlord', stages: [{completed: false}, {completed: false}, {completed: false}] },
  { id: '2', name: 'Seize Territory', stages: [{completed: false}, {completed: false}, {completed: false}] },
];
