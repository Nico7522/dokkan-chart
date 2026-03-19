import { CardClass, CardType } from '../../../shared/model';

/** Leader skill multiplier - maps from percentage to multiplier */
export const LEADER_SKILL_OPTIONS = [
  { value: 5.4, label: '220%' },
  { value: 5, label: '200%' },
  { value: 4.4, label: '170%' },
  { value: 4, label: '150%' },
] as const;

export type LeaderSkillMultiplier = (typeof LEADER_SKILL_OPTIONS)[number]['value'];

/** Form model for card defense calculation */
export interface CardStatsFormModel {
  cardClass: CardClass;
  cardType: CardType;
  baseDefense: number | null;
  /** Leader skill multiplier as string (select value); empty when not selected */
  leaderSkill: string;
  links: number | null;
  additionalPassive: number | null;
  multiplicativePassive: number | null;
  defenseAfterSuper: number | null;
  hasGuard: boolean;
  damageReduction: number | null;
}

/** Model for initialize the form */
export const INITIAL_CARD_STATS: CardStatsFormModel = {
  cardClass: 'Extreme',
  cardType: 'AGL',
  baseDefense: null,
  leaderSkill: '',
  links: null,
  additionalPassive: null,
  multiplicativePassive: null,
  defenseAfterSuper: null,
  hasGuard: false,
  damageReduction: null,
};
