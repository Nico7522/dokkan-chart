import { CardClass, CardStatInfo, CardType } from '../../../shared/model';

export function calculDamageTaken(cardStats: CardStatInfo) {
  console.log(cardStats);

  let cellMaxDamage = 0;
  const guardMultiplier = getGuardMultiplier(
    cardStats.hasGuard,
    cardStats.cardClass,
    cardStats.cardType,
  );
  const reduction = cardStats.reduction ? cardStats.reduction / 100 : 0;
  // Calculate damage taken by Cell Max
  cellMaxDamage =
    (5062500 * 1.03 * guardMultiplier * (1 - reduction) - cardStats.defense * (1 - 0.7)) *
    (cardStats.hasGuard || cardStats.cardType === 'TEQ' ? 0.5 : 1);

  let shenronDamage = 0;
  shenronDamage =
    (10500000 * 1.03 * guardMultiplier * (1 - reduction) - cardStats.defense) *
    (cardStats.hasGuard || cardStats.cardType === 'PHY' ? 0.5 : 1);

  let gokuFriezaDamage = 0;
  gokuFriezaDamage =
    (20000000 * 1.03 * guardMultiplier * (1 - reduction) - cardStats.defense) *
    (cardStats.hasGuard || cardStats.cardType === 'AGL' ? 0.5 : 1);

  let bioBrolyDamage = 0;
  bioBrolyDamage =
    (7000000 * 1.03 * guardMultiplier * (1 - reduction) - cardStats.defense) *
    (cardStats.hasGuard || cardStats.cardType === 'STR' ? 0.5 : 1);
  return [cellMaxDamage, shenronDamage, gokuFriezaDamage, bioBrolyDamage];
}

function getGuardMultiplier(hasGuard: boolean, cardClass: CardClass, cardType: CardType) {
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
