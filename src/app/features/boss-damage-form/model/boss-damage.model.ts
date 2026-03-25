/** Form model for boss damage calculation */
export interface BossDamageFormModel {
  baseAttackDamage: number;
  superAttackDamage: number;
  attackGainedOnSpecialAttack: number | null;
  attackGainedAfterXTurns: number | null;
  attackGainedAfterAttackReceived: number | null;
}

export interface BossDamageResult {
  totalNormalAttackDamage: number;
  totalSuperAttackDamage: number;
}

/** Initial values for the boss damage form */
export const INITIAL_BOSS_DAMAGE: BossDamageFormModel = {
  baseAttackDamage: 0,
  superAttackDamage: 0,
  attackGainedOnSpecialAttack: null,
  attackGainedAfterXTurns: null,
  attackGainedAfterAttackReceived: null,
};
