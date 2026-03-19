import { Component, computed, input, linkedSignal, viewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Plugin } from 'chart.js';
import { getColorsByValue } from '../lib/get-color-by-value';
import { CardClass, CardStatInfo, CardType } from '../../../shared/model';
import { calculDamageTaken } from '../lib/calcul-damage-taken';

@Component({
  selector: 'app-stat-chart',
  imports: [BaseChartDirective],
  templateUrl: './stat-chart.html',
  styleUrl: './stat-chart.css',
})
export class StatChart {
  bossList = [
    {
      img: '/card_1028962.png',
      label: 'Cell Max',
      class: 'Extreme',
      type: 'AGL',
      damage: 3937500,
      ignoreDefense: 0.7,
    },
    {
      img: '/card_1031502.png',
      label: 'Shenron',
      class: 'Extreme',
      type: 'INT',
      damage: 10500000,
    },
    {
      img: '/card_1014972.png',
      label: 'Goku & Frieza',
      class: 'Super',
      type: 'STR',
      damage: 20000000,
    },
    {
      img: '/card_1029272.png',
      label: 'Bio Broly',
      class: 'Extreme',
      type: 'PHY',
      damage: 23625000,
    },
    {
      img: '/card_1032552.png',
      label: 'Goku 4 DAIMA',
      class: 'Super',
      type: 'STR',
      damage: 12000000,
    },
    {
      img: '/card_1032582.png',
      label: 'Vegeta 3 DAIMA',
      class: 'Super',
      type: 'TEQ',
      damage: 11655000,
    },
  ];
  private readonly startingBossList = this.bossList.slice(0, 4);
  protected readonly bossListSelect = this.bossList.slice(4);
  cardStat = input.required<CardStatInfo>();
  barChartData = computed<ChartData<'bar'>>(() => {
    return {
      labels: this.startingBossList.map((b) => b.label),
      datasets: [
        {
          data: this.startingBossList.map((b) =>
            calculDamageTaken(
              this.cardStat(),
              b.class as CardClass,
              b.type as CardType,
              b.damage,
              b.ignoreDefense,
            ),
          ),
          label: 'Damage taken',
        },
      ],
    };
  });
  linked = linkedSignal(() => this.barChartData());
  chart = viewChild<BaseChartDirective<'bar'>>('chart');

  private labelToImageMap = new Map(
    this.bossList.map((b) => {
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
      const imgSize = isMobile ? 32 : 50;
      const imgOffsetY = isMobile ? 20 : 40;

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
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          padding: 100,

          autoSkip: false,
          font: {
            size: 11,
          },
        },
        title: {
          display: true,
          text: 'Boss',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#666',
          padding: { top: 80 },
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: 'Damage taken',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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

  barChartType = 'bar' as const;

  barChartPlugins = [this.imageLabelsPlugin];

  pushOne(bossListIndex: number) {
    const currentData = this.linked();
    const labels = (currentData.labels ?? []) as string[];
    const currentDataValues = (currentData.datasets[0]?.data ?? []) as number[];
    const boss = this.bossList[bossListIndex];
    const newDamage = calculDamageTaken(
      this.cardStat(),
      boss.class as CardClass,
      boss.type as CardType,
      boss.damage,
      boss.ignoreDefense,
    );
    const newData = [...currentDataValues, newDamage];

    this.linked.set({
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
