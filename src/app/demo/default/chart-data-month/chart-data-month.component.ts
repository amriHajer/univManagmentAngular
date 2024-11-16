// angular import
import { Component, OnInit, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import {
  NgApexchartsModule,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexTooltip
} from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  theme: ApexTheme;
};

@Component({
  selector: 'app-chart-data-month',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './chart-data-month.component.html',
  styleUrl: './chart-data-month.component.scss'
})
export class ChartDataMonthComponent  implements OnInit{
  numberOfEnseignant: number = 0;
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  amount: number = 961;
  btnActive!: string;

  // life cycle event
 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNumberOfEnsignant();
  }

  fetchNumberOfEnsignant(): void {
    this.http.get<number>('http://localhost:8083/public/nbreEnseignant').subscribe({
      next: (data: number) => {
        this.numberOfEnseignant= data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nombre d\'enseignants:', err);
      }
    });
  }

}
