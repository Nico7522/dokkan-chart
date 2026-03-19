import { CardClass, CardStatInfo, CardType } from '../../../shared/model';

export function calculDamageTaken(
  cardStats: CardStatInfo,
  bossClass: CardClass,
  bossType: CardType,
  bossDamage: number,
  ignoreDefense?: number,
) {
  const reduction = cardStats.reduction ? cardStats.reduction / 100 : 0;
  const guardMultiplier = getGuardMultiplier(
    cardStats.hasGuard,
    cardStats.cardClass,
    cardStats.cardType,
    bossClass,
    bossType,
  );
  return (
    (bossDamage * 1.03 * guardMultiplier * (1 - reduction) -
      cardStats.defense * (1 - (ignoreDefense ?? 0))) *
    (cardStats.hasGuard || hasTypeAdvantage(cardStats.cardType, bossType) ? 0.5 : 1)
  );
}

function getGuardMultiplier(
  hasGuard: boolean,
  cardClass: CardClass,
  cardType: CardType,
  bossClass: CardClass,
  bossType: CardType,
) {
  let guardMultiplier = 1;
  if (hasGuard) {
    guardMultiplier = 0.8;
  } else {
    switch (bossType) {
      case 'AGL':
        if (cardType === 'AGL' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'AGL' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'STR' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.5;
        }
        if (cardType === 'STR' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.25;
        }
        if (cardType === 'PHY' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'PHY' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'TEQ' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'TEQ' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 0.9;
        }
        if (cardType === 'INT' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'INT' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        break;
      case 'STR':
        if (cardType === 'AGL' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'AGL' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 0.9;
        }
        if (cardType === 'STR' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'STR' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'PHY' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.5;
        }
        if (cardType === 'PHY' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.25;
        }
        if (cardType === 'TEQ' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'TEQ' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'INT' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'INT' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        break;
      case 'TEQ':
        if (cardType === 'AGL' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.5;
        }
        if (cardType === 'AGL' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.25;
        }
        if (cardType === 'STR' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'STR' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'PHY' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'PHY' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'TEQ' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'TEQ' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'INT' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'INT' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 0.9;
        }
        break;
      case 'INT':
        if (cardType === 'AGL' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'AGL' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'STR' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'STR' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'PHY' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'PHY' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 0.9;
        }
        if (cardType === 'TEQ' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.5;
        }
        if (cardType === 'TEQ' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.25;
        }
        if (cardType === 'INT' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'INT' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        break;
      case 'PHY':
        if (cardType === 'AGL' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'AGL' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'STR' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'STR' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 0.9;
        }
        if (cardType === 'PHY' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'PHY' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'TEQ' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.15;
        }
        if (cardType === 'TEQ' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1;
        }
        if (cardType === 'INT' && isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.5;
        }
        if (cardType === 'INT' && !isOpositeClass(cardClass, bossClass)) {
          guardMultiplier = 1.25;
        }
        break;
      default:
        break;
    }
  }
  return guardMultiplier;
}

function isOpositeClass(cardClass: CardClass, bossClass: CardClass) {
  return cardClass !== bossClass;
}

function hasTypeAdvantage(cardType: CardType, bossType: CardType) {
  if (cardType === 'STR' && bossType === 'AGL') {
    return true;
  }
  if (cardType === 'PHY' && bossType === 'INT') {
    return true;
  }
  if (cardType === 'INT' && bossType === 'TEQ') {
    return true;
  }
  if (cardType === 'AGL' && bossType === 'STR') {
    return true;
  }
  if (cardType === 'TEQ' && bossType === 'AGL') {
    return true;
  }

  return false;
}

function hasTypeDisadvantage(cardType: CardType, bossType: CardType) {
  if (cardType === 'STR' && bossType === 'AGL') {
    return true;
  }
  if (cardType === 'PHY' && bossType === 'STR') {
    return true;
  }
  if (cardType === 'INT' && bossType === 'PHY') {
    return true;
  }
  if (cardType === 'TEQ' && bossType === 'INT') {
    return true;
  }
  if (cardType === 'AGL' && bossType === 'TEQ') {
    return true;
  }
  return false;
}
