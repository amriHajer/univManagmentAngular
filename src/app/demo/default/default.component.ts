// Angular Import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ChartDataMonthComponent } from './chart-data-month/chart-data-month.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, SharedModule, ChartDataMonthComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent  implements OnInit{
  numberOfStudents: number = 0;
  numberOfClasses: number = 0;
  // public method
  ListGroup = [
    
    
    {
      name: 'Reliance',
      profit: '10% Profit',
      invest: '$200.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'ATGL',
      profit: '10% Loss',
      invest: '$189.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Stolon',
      profit: '10% Profit',
      invest: '$210.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success',
      space: 'pb-0'
    }
  ];

  profileCard = [
    {
      style: 'bg-primary-dark text-white',
      background: 'bg-primary',
      value: '$203k',
      text: 'Net Profit',
      color: 'text-white',
      value_color: 'text-white'
    },
    {
      background: 'bg-warning',
      avatar_background: 'bg-light-warning',
      value: '$550K',
      text: 'Total Revenue',
      color: 'text-warning'
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNumberOfStudents();
    this.fetchNumberOfClasses();
  }

  fetchNumberOfStudents(): void {
    this.http.get<number>('http://localhost:8083/public/nbreEtudiant').subscribe({
      next: (data: number) => {
        this.numberOfStudents = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nombre d\'étudiants:', err);
      }
    });
  }


  fetchNumberOfClasses(): void {
    this.http.get<{ totalClasses: number }>('http://localhost:8083/public/classes/count').subscribe({
      next: (data) => {
        this.numberOfClasses = data.totalClasses;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nombre de classes:', err);
      }
    });
  }
  
  
}
