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

import { CardStatInfo, StatForm } from '../../../features/stat-form';
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

  protected cardStat = signal<CardStatInfo | null>(null);
  protected calculatedCardStats = computed(() => this.cardStat());

  protected handleStats(stats: CardStatInfo) {
    this.cardStat.set(stats);
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    const componentRef = this.chartContainer().createComponent(StatChart, {
      bindings: [inputBinding('cardStat', () => stats)],
    });

    this.componentRef = componentRef;
  }
}
