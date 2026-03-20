import { Component, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  CardStatsFormModel,
  INITIAL_CARD_STATS,
  LEADER_SKILL_OPTIONS,
} from '../model/card-stats.model';
import { validateCardStats } from '../model/validators';
import { calculateDefense } from '../lib/calulc-defense';
import { CardStatInfo } from '../../../shared/model/card-stat-info';

@Component({
  selector: 'app-stat-form',
  imports: [FormField],
  templateUrl: './stat-form.html',
  styleUrl: './stat-form.css',
})
export class StatForm {
  protected readonly leaderSkillOptions = LEADER_SKILL_OPTIONS;
  protected cardStats = output<CardStatInfo>();
  protected cardStatsModel = signal<CardStatsFormModel>({ ...INITIAL_CARD_STATS });

  protected cardStatsForm = form(this.cardStatsModel, (schemaPath) => {
    validateCardStats(schemaPath);
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const data = this.cardStatsModel();
    const totalDefense = calculateDefense(data);
    this.cardStats.emit({
      defense: totalDefense ?? 0,
      reduction: data.damageReduction,
      hasGuard: data.hasGuard,
      cardClass: data.cardClass,
      cardType: data.cardType,
    });
  }
}
