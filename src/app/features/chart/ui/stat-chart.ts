import { Component, computed, input, linkedSignal, viewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Plugin } from 'chart.js';
import { getColorsByValue } from '../lib/get-color-by-value';
import { CardClass, CardStatInfo, CardType } from '../../../shared/model';
import { calculDamageTaken } from '../lib/calcul-damage-taken';
import { bossList } from '../model/boss-list';

@Component({
  selector: 'app-stat-chart',
  imports: [BaseChartDirective],
  templateUrl: './stat-chart.html',
  styleUrl: './stat-chart.css',
})
export class StatChart {
  private readonly startingBossList = bossList.slice(0, 4);
  protected readonly bossListSelect = bossList.slice(4);
  readonly cardStat = input.required<CardStatInfo>();
  readonly baseBarChartData = computed<ChartData<'bar'>>(() => {
    const values = this.startingBossList.map((b) =>
      calculDamageTaken(
        this.cardStat(),
        b.class as CardClass,
        b.type as CardType,
        b.damage,
        b.ignoreDefense,
      ),
    );
    return {
      labels: this.startingBossList.map((b) => b.label),
      datasets: [
        {
          data: values,
          label: 'Damage taken',
          backgroundColor: getColorsByValue(values),
        },
      ],
    };
  });
  protected barChartData = linkedSignal(() => this.baseBarChartData());
  protected readonly chart = viewChild<BaseChartDirective<'bar'>>('chart');

  private labelToImageMap = new Map(
    bossList.map((b) => {
      const img = new Image();
      img.src = b.img;
      return [b.label, img] as [string, HTMLImageElement];
    }),
  );

  private imageLabelsPlugin: Plugin<'bar'> = {
    id: 'imageLabels',
    beforeInit: (chart) => {
      const count = chart.data.labels?.length ?? 0;
      const minWidth = count * 100; // 100px par barre
      const canvas = chart.canvas;
      const parent = canvas.parentElement;

      if (parent && parent.offsetWidth < minWidth) {
        canvas.style.width = minWidth + 'px';
      } else {
        canvas.style.width = '100%';
      }
    },
    afterDraw: (chart) => {
      const labels = (chart.data?.labels ?? []) as string[];
      const ctx = chart.ctx;
      const xAxis = chart.scales['x'];
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const imgSize = isMobile ? 36 : 56;
      const imgOffsetY = isMobile ? 8 : 12;

      labels.forEach((label, i) => {
        const img = this.labelToImageMap.get(label);
        if (img) {
          const x = xAxis.getPixelForTick(i) - imgSize / 2;
          const y = chart.chartArea.bottom + imgOffsetY;

          if (img.complete) {
            ctx.drawImage(img, x, y, imgSize, imgSize);
          } else {
            img.onload = () => chart.update();
          }
        }
      });
    },
  };
  protected readonly barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          color: '#3f3f46',
        },
      },
      y: {
        min: 0,
        max: 10000000,
        ticks: {
          color: '#a1a1aa',
        },
        grid: {
          color: '#3f3f46',
        },
        title: {
          display: true,
          text: 'Damage taken',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#a1a1aa',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#18181b',
        titleColor: '#f4f4f5',
        bodyColor: '#a1a1aa',
        borderColor: '#3f3f46',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => items[0]?.label ?? '',
          label: (item) => `Damage: ${item.formattedValue}`,
        },
      },
    },
    layout: {
      padding: {
        bottom: 70,
        left: 10,
        right: 10,
      },
    },
  };

  protected readonly barChartType = 'bar' as const;

  protected readonly barChartPlugins = [this.imageLabelsPlugin];

  pushOne(bossListIndex: number) {
    const currentData = this.barChartData();
    const labels = (currentData.labels ?? []) as string[];
    const currentDataValues = (currentData.datasets[0]?.data ?? []) as number[];
    const boss = bossList[bossListIndex];
    const newDamage = calculDamageTaken(
      this.cardStat(),
      boss.class as CardClass,
      boss.type as CardType,
      boss.damage,
      boss.ignoreDefense,
    );
    const newData = [...currentDataValues, newDamage];

    this.barChartData.set({
      labels: [...labels, boss.label],
      datasets: [
        {
          data: newData,
          label: 'Damage taken',
          backgroundColor: getColorsByValue(newData),
        },
      ],
    });
  }
}
