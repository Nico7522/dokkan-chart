import { min, SchemaPathTree } from '@angular/forms/signals';

import { required } from '@angular/forms/signals';
import { CardStatsFormModel } from './card-stats.model';

export function validateCardStats(schemaPath: SchemaPathTree<CardStatsFormModel>) {
  return (
    required(schemaPath.cardClass, { message: 'Card class is required' }),
    required(schemaPath.cardType, { message: 'Card type is required' }),
    required(schemaPath.baseDefense, { message: 'Base defense is required' }),
    min(schemaPath.baseDefense, 1, { message: 'Base defense cannot be below 1' }),
    required(schemaPath.leaderSkill, { message: 'Leader skill is required' }),
    min(schemaPath.links, 1, { message: 'Links cannot be below 1' }),
    min(schemaPath.additionalPassive, 1, {
      message: 'Additional passive cannot be below 1',
    }),
    min(schemaPath.multiplicativePassive, 1, {
      message: 'Multiplicative passive cannot be below 1',
    }),
    min(schemaPath.defenseAfterSuper, 1, {
      message: 'Defense after super cannot be below 1',
    }),
    min(schemaPath.damageReduction, 1, {
      message: 'Damage reduction cannot be below 1',
    })
  );
}
