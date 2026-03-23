import { Component, output, signal } from '@angular/core';
import { BossFormModel, INITIAL_BOSS_FORM } from '../../model/boss-form-model';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-add-own-boss-damage-form',
  imports: [FormField],
  templateUrl: './add-own-boss-damage-form.html',
  styleUrl: './add-own-boss-damage-form.css',
})
export class AddOwnBossDamageForm {
  protected bossFormModel = signal<BossFormModel>({ ...INITIAL_BOSS_FORM });
  protected bossForm = form(this.bossFormModel, (schemaPath) => {
    required(schemaPath.bossName, { message: 'Boss name is required' });
    required(schemaPath.baseAttack);
  });
  bossDamage = output<BossFormModel>();

  onSubmit(event: Event) {
    event.preventDefault();
    this.bossDamage.emit(this.bossFormModel());
  }
}
