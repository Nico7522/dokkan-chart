import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BossDamageForm, BossDamageResult } from '../../../features/boss-damage-form';

@Component({
  selector: 'app-calcul-boss-damage-page',
  imports: [DecimalPipe, BossDamageForm, RouterLink],
  templateUrl: './calcul-boss-damage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculBossDamagePageComponent {
  protected calculatedResult = signal<BossDamageResult | null>(null);

  protected handleResult(result: BossDamageResult): void {
    this.calculatedResult.set(result);
  }
}
