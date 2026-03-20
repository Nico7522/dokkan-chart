import { CardClass, CardType } from '../../stat-form';

export const bossList: Boss[] = [
  {
    img: '/card_1028962.png',
    label: 'Cell Max',
    class: 'Extreme',
    type: 'AGL',
    damage: 3937500,
    ignoreDefense: 0.7,
  },
  {
    img: '/card_1031502.png',
    label: 'Shenron',
    class: 'Extreme',
    type: 'INT',
    damage: 10500000,
  },
  {
    img: '/card_1014972.png',
    label: 'Goku & Frieza',
    class: 'Super',
    type: 'STR',
    damage: 20000000,
  },
  {
    img: '/card_1029272.png',
    label: 'Bio Broly',
    class: 'Extreme',
    type: 'PHY',
    damage: 23625000,
  },
  {
    img: '/card_1032552.png',
    label: 'Goku 4 DAIMA',
    class: 'Super',
    type: 'STR',
    damage: 12000000,
  },
  {
    img: '/card_1032582.png',
    label: 'Vegeta 3 DAIMA',
    class: 'Super',
    type: 'TEQ',
    damage: 11655000,
  },
];

interface Boss {
  img: string;
  label: string;
  class: CardClass;
  type: CardType;
  damage: number;
  ignoreDefense?: number;
}
