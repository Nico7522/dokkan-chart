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
  {
    img: '/card_1033012.png',
    label: 'Dabura',
    class: 'Extreme',
    type: 'TEQ',
    damage: 8272800,
  },
  {
    img: '/card_1033062.png',
    label: 'Majin Vegeta + Super Saiyan 2 Goku (Angel) (After 10 hits)',
    class: 'Extreme',
    type: 'PHY',
    damage: 8820000,
    ignoreDefense: 0.2,
  },
  {
    img: '/card_1033062.png',
    label: 'Majin Vegeta + Super Saiyan 2 Goku (Angel) (After 20 hits)',
    class: 'Extreme',
    type: 'PHY',
    damage: 14700000,
    ignoreDefense: 0.2,
  },
  {
    img: '/card_4033072.png',
    label: 'Super Saiyan 2 Goku (Angel) + Majin Vegeta (After 10 hits)',
    class: 'Super',
    type: 'PHY',
    damage: 15120000,
  },
  {
    img: '/card_4033072.png',
    label: 'Super Saiyan 2 Goku (Angel) + Majin Vegeta (After 20 hits)',
    class: 'Super',
    type: 'PHY',
    damage: 27720000,
  },
  {
    img: '/card_1032882.png',
    label: 'Super Saiyan 4 Vegeta + Super Saiyan 4 Goku (With Goku)',
    class: 'Super',
    type: 'INT',
    damage: 9660000,
  },
  {
    img: '/card_1032882.png',
    label: 'Super Saiyan 4 Vegeta + Super Saiyan 4 Goku (Without Goku)',
    class: 'Super',
    type: 'INT',
    damage: 16100000,
  },
  {
    img: '/card_4032892.png',
    label: 'Super Saiyan 4 Goku + Super Saiyan 4 Vegeta (With crit)',
    class: 'Super',
    type: 'TEQ',
    damage: 8400000,
    ignoreDefense: 0.5,
  },
  {
    img: '/card_4032892.png',
    label: 'Super Saiyan 4 Goku + Super Saiyan 4 Vegeta (Without crit)',
    class: 'Super',
    type: 'TEQ',
    damage: 5600000,
  },
  {
    img: '/card_1023982.png',
    label: 'Majin Vegeta',
    class: 'Extreme',
    type: 'TEQ',
    damage: 14000000,
  },
  {
    img: '/card_1028792.png',
    label: 'Goku SSJ3 (Full buff with crit)',
    class: 'Super',
    type: 'AGL',
    damage: 22500000,
    ignoreDefense: 0.3,
  },
  {
    img: '/card_1028792.png',
    label: 'Goku SSJ3 (Full buff no crit)',
    class: 'Super',
    type: 'AGL',
    damage: 15000000,
  },
  {
    img: '/card_1028792.png',
    label: 'Goku SSJ3 (No buff with crit)',
    class: 'Super',
    type: 'AGL',
    damage: 15000000,
    ignoreDefense: 0.3,
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
