import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Seance {
  id: number;
  jourSeance: string;
  debutSeance: string;
  finSeance: string;
  matiere: { nomMatiere: string };
  salle: { nomSalle: string };
  enseignant: { name: string };
}

interface EmploiDuTemps {
  id: number;
  semestre: { nomSemestre: string };
  seances: Seance[];
}

@Component({
  selector: 'app-emploi-enseignant',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './emploi-enseignant.component.html',
  styleUrls: ['./emploi-enseignant.component.scss']
})
export class EmploiEnseignantComponent implements OnInit {
  user: any;
  seances: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('Utilisateur connecté:', this.user);

      // Appel HTTP pour récupérer les séances de l'enseignant (utilise l'ID dynamique si besoin)
      const enseignantId = this.user?.id || 4; // Remplace 4 par l'ID de l'utilisateur si nécessaire
      this.http
        .get(`http://localhost:8083/public/seances/enseignant/${enseignantId}/classes`)
        .subscribe((response: any) => {
          const formattedSeances = [];
          response.forEach((classe: any) => {
            classe.emploisDuTemps.forEach((emploi: EmploiDuTemps) => {
              emploi.seances.forEach((seance: Seance) => {
                formattedSeances.push({
                  enseignant: seance.enseignant.name,
                  classe: classe.nomClasse,
                  salle: seance.salle.nomSalle,
                  semestre: emploi.semestre.nomSemestre,
                  jourSeance: seance.jourSeance,
                  debutSeance: seance.debutSeance,
                  finSeance: seance.finSeance,
                  matiere: seance.matiere.nomMatiere,
                });
              });
            });
          });
          this.seances = formattedSeances;
        });
    }
  }
}