import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-enseignant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-enseignant.component.html',
  styleUrl: './list-enseignant.component.scss'
})
export class ListEnseignantComponent {
  
    enseignants: any[] = [];
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.getCandidats();
    }
  
    getCandidats() {
      this.http.get<any[]>('http://localhost:8083/public/listEnseignantUsers')
        .subscribe(
          response => {
            this.enseignants = response;

            this.enseignants.forEach(enseignant => {
              enseignant.imageUrl = `http://localhost:8083/uploads/${enseignant.imageUrl.split('/').pop()}`;
            });

            console.log('Enseignants récupérés : ', this.enseignants);
          },
          error => {
            console.error('Erreur lors de la récupération des enseignants : ', error);
          }
        );
    }
  
    deleteEnseignant(id: number) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce Enseignant?')) {
        this.http.delete(`http://localhost:8083/public/dltEnseignant/${id}`)
          .subscribe(
            () => {
              this.enseignants = this.enseignants.filter(enseignant => enseignant.id !== id);
              console.log('Enseignant supprimé avec succès');
            },
            error => {
              console.error('Erreur lors de la suppression de l\'enseignant : ', error);
            }
          );
      }
    }
    
}
