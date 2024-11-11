import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-etudiant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.scss']
})
export class ListEtudiantComponent {
  etudiants: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEtudiants();
  }

  getEtudiants(): void {
    // Requête HTTP pour récupérer la liste des étudiants
    this.http.get<any[]>('http://localhost:8083/public/listEtudiantUsers').subscribe(
      response => {
        this.etudiants = response;
        this.etudiants.forEach(etudiant => {
          etudiant.imageUrl = `http://localhost:8083/uploads/${etudiant.imageUrl.split('/').pop()}`;
        });
        console.log('Étudiants récupérés : ', this.etudiants);
      },
      error => {
        console.error('Erreur lors de la récupération des étudiants : ', error);
      }
    );
  }

  
  editEtudiant(id: number): void {
    
  }
  deleteEtudiant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      this.http.delete(`http://localhost:8083/public/dltEtudiant/${id}`).subscribe(
        () => {
          this.etudiants = this.etudiants.filter(etudiant => etudiant.id !== id);
          console.log('Étudiant supprimé avec succès');
        },
        error => {
          console.error('Erreur lors de la suppression de l\'étudiant : ', error);
        }
      );
    }
  }
}
