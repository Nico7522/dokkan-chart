import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  inputBinding,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

import { CalculedCardStats, StatForm } from '../../../features/stat-form';
import { StatChart } from '../../../features/chart';

@Component({
  selector: 'app-home-page',
  imports: [DecimalPipe, StatForm],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private chartContainer = viewChild.required('chart', { read: ViewContainerRef });
  private componentRef: ComponentRef<StatChart> | null = null;

  protected cardStats = signal<CalculedCardStats | null>(null);
  protected calculatedCardStats = computed(() => this.cardStats());

  handleStats(stats: CalculedCardStats) {
    this.cardStats.set(stats);

    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.chartContainer().clear();
    this.componentRef = this.chartContainer().createComponent(StatChart, {
      bindings: [inputBinding('cardStats', () => stats)],
    });
  }
}
