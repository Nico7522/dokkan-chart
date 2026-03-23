import { min, required, SchemaPathTree } from '@angular/forms/signals';
import type { BossDamageFormModel } from './boss-damage.model';

export function validateBossDamage(schemaPath: SchemaPathTree<BossDamageFormModel>): void {
  required(schemaPath.baseAttack, { message: 'Base defense is required' });
  min(schemaPath.baseAttack, 1, {
    message: 'Base defense must be positive',
  });

  min(schemaPath.attackGainedOnSpecialAttack, 0, {
    message: 'Attack gained must be positive',
  });

  min(schemaPath.attackGainedAfterXTurns, 0, {
    message: 'Attack gained must be positive',
  });

  min(schemaPath.attackGainedAfterAttackReceived, 0, {
    message: 'Attack gained must be positive',
  });
}
