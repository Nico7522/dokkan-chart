import { BossDamageFormModel, BossDamageResult } from '../model/boss-damage.model';

export function calculBossDamage(form: BossDamageFormModel): BossDamageResult {
  const {
    baseAttackDamage,
    superAttackDamage,
    attackGainedAfterAttackReceived,
    attackGainedAfterXTurns,
    attackGainedOnSpecialAttack,
  } = form;

  const attackAfterHit = attackGainedAfterAttackReceived
    ? attackGainedAfterAttackReceived / 100 + 1
    : 0;
  const attackAfterTurns = attackGainedAfterXTurns ? attackGainedAfterXTurns / 100 + 1 : 0;

  const totalNormalAttackDamage = baseAttackDamage * (attackAfterHit + attackAfterTurns);
  const totalSuperAttackDamage =
    (attackGainedOnSpecialAttack
      ? superAttackDamage + baseAttackDamage * (attackGainedOnSpecialAttack / 100)
      : superAttackDamage) *
    (attackAfterHit + attackAfterTurns);
  return { totalNormalAttackDamage, totalSuperAttackDamage };
}
