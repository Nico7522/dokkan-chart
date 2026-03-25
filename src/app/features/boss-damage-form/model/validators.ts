import { min, required, SchemaPathTree } from '@angular/forms/signals';
import type { BossDamageFormModel } from './boss-damage.model';

export function validateBossDamage(schemaPath: SchemaPathTree<BossDamageFormModel>): void {
  required(schemaPath.baseAttackDamage, { message: 'Base attack damage is required' });
  min(schemaPath.baseAttackDamage, 1, {
    message: 'Base attack damage must be positive',
  });

  required(schemaPath.superAttackDamage, { message: 'Super attack damage is required' });
  min(schemaPath.superAttackDamage, 1, {
    message: 'Super attack damage must be positive',
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
