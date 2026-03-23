import { CardClass, CardType } from '../../../shared/model';

export interface BossFormModel {
  bossName: string;
  baseAttack: number;
  bossType: CardType;
  bossClass: CardClass;
}

export const INITIAL_BOSS_FORM: BossFormModel = {
  bossName: '',
  baseAttack: 0,
  bossType: 'AGL',
  bossClass: 'Extreme',
};
