export interface CardStatInfo {
  defense: number;
  reduction: number | null;
  hasGuard: boolean;
  cardClass: CardClass;
  cardType: CardType;
}
export type CardClass = 'Extreme' | 'Super';
export type CardType = 'TEQ' | 'INT' | 'PHY' | 'STR' | 'AGL';
