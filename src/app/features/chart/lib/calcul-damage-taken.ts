import { CalculedCardStats } from '../../../shared/model';

export function calculDamageTaken(cardStats: CalculedCardStats) {
  let cellMaxDamage = 0;
  const guardMultiplier = getGuardMultiplier(
    cardStats.hasGuard,
    cardStats.cardClass,
    cardStats.cardType,
  );
  const reduction = cardStats.reduction ? cardStats.reduction / 100 : 0;
  // Calculate damage taken by Cell Max
  cellMaxDamage =
    (5062500 * 1.03 * guardMultiplier * (1 - reduction) - cardStats.defense) *
    (cardStats.hasGuard || cardStats.cardType === 'TEQ' ? 0.5 : 1);
  return cellMaxDamage;
}

function getGuardMultiplier(
  hasGuard: boolean,
  cardClass: 'Extreme' | 'Super',
  cardType: 'TEQ' | 'INT' | 'PHY' | 'STR' | 'AGL',
) {
  let guardMultiplier = 1;
  if (hasGuard) {
    guardMultiplier = 0.8;
  } else {
    switch (cardType) {
      case 'STR':
        guardMultiplier = cardClass === 'Extreme' ? 1.25 : 1.5;
        break;
      case 'TEQ':
        guardMultiplier = cardClass === 'Extreme' ? 0.9 : 1;
        break;
      case 'INT':
        guardMultiplier = cardClass === 'Extreme' ? 1 : 1.15;
        break;
      case 'PHY':
        guardMultiplier = cardClass === 'Extreme' ? 1 : 1.15;
        break;
      default:
        break;
    }
  }
  return guardMultiplier;
}
