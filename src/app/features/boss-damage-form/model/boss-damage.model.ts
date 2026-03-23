/** Form model for boss damage calculation */
export interface BossDamageFormModel {
  baseAttack: number;
  attackGainedOnSpecialAttack: number | null;
  attackGainedAfterXTurns: number | null;
  attackGainedAfterAttackReceived: number | null;
}

/** Initial values for the boss damage form */
export const INITIAL_BOSS_DAMAGE: BossDamageFormModel = {
  baseAttack: 0,
  attackGainedOnSpecialAttack: null,
  attackGainedAfterXTurns: null,
  attackGainedAfterAttackReceived: null,
};

/** Result of boss damage calculation */
export interface BossDamageResult {
  maxDamage: number;
}
