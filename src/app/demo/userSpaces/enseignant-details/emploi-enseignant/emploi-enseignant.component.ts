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
  classe: { nomClasse: string };
  semestre: { id: number, nomSemestre: string }; // Ajout du semestre ici
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
  seances: Seance[] = [];
  isLoading = true;
  error: string | null = null;

  emploiDuTemps: { [key: string]: { [key: string]: Seance | null } } = {};
  joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  heures = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('Utilisateur connecté:', this.user);

      // Appel HTTP pour récupérer les séances de l'enseignant
      const enseignantId = this.user.id;
      this.http
        .get<any[]>(`http://localhost:8083/public/seances/enseignant/${enseignantId}/classes`)
        .subscribe({
          next: (response) => {
            const formattedSeances: Seance[] = [];
            response.forEach((classe: any) => {
              if (classe.emploisDuTemps) {
                classe.emploisDuTemps.forEach((emploi: any) => {
                  if (emploi.seances) {
                    emploi.seances.forEach((seance: Seance) => {
                      formattedSeances.push({
                        id: seance.id,
                        enseignant: { name: seance.enseignant?.name || 'N/A' },
                        classe: { nomClasse: classe.nomClasse || 'Non défini' },
                        salle: { nomSalle: seance.salle?.nomSalle || 'Non définie' },
                        semestre: { 
                          id: emploi.semestre?.id || 0, 
                          nomSemestre: emploi.semestre?.nomSemestre || 'Non défini' 
                        },
                        jourSeance: seance.jourSeance,
                        debutSeance: seance.debutSeance,
                        finSeance: seance.finSeance,
                        matiere: { nomMatiere: seance.matiere?.nomMatiere || 'Non définie' },
                      });
                    });
                  }
                });
              }
            });
            this.seances = formattedSeances;
            this.organiserEmploiDuTemps();
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des séances:', err);
            this.error = 'Une erreur est survenue lors du chargement des données';
            this.isLoading = false;
          }
        });
    }
  }

  organiserEmploiDuTemps(): void {
    // Initialiser un emploi du temps vide
    this.joursSemaine.forEach((jour) => {
      this.emploiDuTemps[jour] = {};
      this.heures.forEach((heure) => {
        this.emploiDuTemps[jour][heure] = null;
      });
    });
  
    // Remplir l'emploi du temps avec les séances récupérées
    this.seances.forEach((seance) => {
      const jour = seance.jourSeance;
      const heure = this.getPlageHoraire(seance.debutSeance, seance.finSeance);
      if (jour && heure) {
        this.emploiDuTemps[jour][heure] = seance;
      }
    });
  }
  

  getPlageHoraire(debut: string, fin: string): string | null {
    // Convertir les heures de format "08:00:00" en "08:00"
    const debutFormate = debut.slice(0, 5);
    const finFormate = fin.slice(0, 5);
    const horaire = `${debutFormate}-${finFormate}`;
    
    // Vérifier si ce format existe dans le tableau des heures
    return this.heures.includes(horaire) ? horaire : null;
  }

  getSemestre(): string {
    // Retourner le semestre du premier emploi du temps disponible
    if (this.seances.length > 0) {
      return this.seances[0].semestre.nomSemestre;
    }
    return 'Semestre non défini';
  }}
