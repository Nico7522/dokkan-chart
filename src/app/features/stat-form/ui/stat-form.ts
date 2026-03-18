import { Component, model, output, signal } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import {
  CardStatsFormModel,
  INITIAL_CARD_STATS,
  LEADER_SKILL_OPTIONS,
} from '../model/card-stats.model';
import { validateCardStats } from '../model/validators';
import { calculateDefense } from '../lib/calulc-defense';
import { CalculedCardStats } from '../../../shared/model/calculated-card-stats';

@Component({
  selector: 'app-stat-form',
  imports: [FormField],
  templateUrl: './stat-form.html',
  styleUrl: './stat-form.css',
})
export class StatForm {
  protected readonly leaderSkillOptions = LEADER_SKILL_OPTIONS;
  cardStats = output<CalculedCardStats>();
  protected cardStatsModel = signal<CardStatsFormModel>({ ...INITIAL_CARD_STATS });

  protected cardStatsForm = form(this.cardStatsModel, (schemaPath) => {
    validateCardStats(schemaPath);
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.cardStatsForm, async () => {
      const data = this.cardStatsModel();
      console.log('Form submitted:', data);
      const totalDefense = calculateDefense(data);
      console.log('Total defense:', totalDefense);
      this.cardStats.emit({
        defense: totalDefense ?? 0,
        reduction: data.damageReduction,
        hasGuard: data.hasGuard,
        cardClass: data.cardClass as 'Extreme' | 'Super',
        cardType: data.cardType as 'TEQ' | 'INT' | 'PHY' | 'STR' | 'AGL',
      });
    });
  }
}
