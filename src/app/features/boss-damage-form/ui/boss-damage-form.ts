import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

import {
  BossDamageFormModel,
  BossDamageResult,
  INITIAL_BOSS_DAMAGE,
} from '../model/boss-damage.model';
import { validateBossDamage } from '../model/validators';

@Component({
  selector: 'app-boss-damage-form',
  imports: [FormField],
  templateUrl: './boss-damage-form.html',
  styleUrl: './boss-damage-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BossDamageForm {
  protected bossDamage = output<BossDamageResult>();
  protected bossDamageFormModel = signal<BossDamageFormModel>({
    ...INITIAL_BOSS_DAMAGE,
  });

  protected bossDamageForm = form(this.bossDamageFormModel, (schemaPath) => {
    validateBossDamage(schemaPath);
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.bossDamageFormModel());
  }
}
