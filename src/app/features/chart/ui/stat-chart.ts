import { Component, computed, input, viewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Plugin } from 'chart.js';
import { getColorsByValue } from '../lib/get-color-by-value';
import { CalculedCardStats } from '../../../shared/model';

@Component({
  selector: 'app-stat-chart',
  imports: [BaseChartDirective],
  templateUrl: './stat-chart.html',
  styleUrl: './stat-chart.css',
})
export class StatChart {
  cardStats = input<CalculedCardStats>();
  calculatedDamagesTaken = computed(() => {
    return [50000, 100000, 150000, 200000];
  });
  chart = viewChild<BaseChartDirective<'bar'>>('chart');
  private labelImages: HTMLImageElement[] = [
    '/card_1028962.png',
    '/card_1031502.png',
    '/card_1014972.png',
    '/card_1029272.png',
  ].map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  // Plugin custom qui dessine les images sous les labels
  private imageLabelsPlugin: Plugin<'bar'> = {
    id: 'imageLabels',
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const xAxis = chart.scales['x'];
      const imgSize = 50;

      this.labelImages.forEach((img, i) => {
        const x = xAxis.getPixelForTick(i) - imgSize / 2;
        const y = chart.chartArea.bottom + 40; // 40px sous l'axe

        if (img.complete) {
          ctx.drawImage(img, x, y, imgSize, imgSize);
        } else {
          img.onload = () => this.chart()?.update(); // redessine quand chargée
        }
      });
    },
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {
        ticks: {
          padding: 50, // espace pour les images
        },
        title: {
          display: true,
          text: 'Boss',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#666',
          padding: { top: 60 },
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
        bottom: 50, // évite que les images soient coupées
      },
    },
  };

  barChartType = 'bar' as const;

  barChartPlugins = [this.imageLabelsPlugin];

  barChartData: ChartData<'bar'> = {
    labels: ['', '', '', ''],
    datasets: [
      {
        data: this.calculatedDamagesTaken(),
        label: 'Damage taken',
        backgroundColor: getColorsByValue(this.calculatedDamagesTaken()),
      },
    ],
  };
}
