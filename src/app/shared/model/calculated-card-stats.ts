export interface CalculedCardStats {
  defense: number;
  reduction: number | null;
  hasGuard: boolean;
  cardClass: 'Extreme' | 'Super';
  cardType: 'TEQ' | 'INT' | 'PHY' | 'STR' | 'AGL';
}
