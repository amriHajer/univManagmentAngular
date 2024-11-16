import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

interface ClasseResponse {
  classeId: number;
  nomClasse: string;
}

interface EmploiDuTemps {
  id: number;
  jour: string;
  periode: string;
}

interface Seance {
  id: number;
  jourSeance: string;
  debutSeance: string;
  finSeance: string;
  matiere: { nomMatiere: string };
  salle: { nomSalle: string };
  enseignant: { name: string };
  classe: { nomClasse: string };
  semestre: { id: number, nomSemestre: string };
}


@Component({
  selector: 'app-emploi-etudiant',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './emploi-etudiant.component.html',
  styleUrls: ['./emploi-etudiant.component.scss'],
})
export class EmploiEtudiantComponent implements OnInit {
  user: any;
  etudiant: Etudiant | null = null;
  nomClasse: string | undefined;
  classeId: number | undefined;
  emploiDuTemps: EmploiDuTemps[] = [];
  seances: Seance[] = [];
 
  joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
heures = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00'];


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.recupererEtudiantDepuisLocalStorage();
  }

  /**
   * Récupérer les données de l'utilisateur depuis localStorage
   */
  recupererEtudiantDepuisLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.etudiant = JSON.parse(userData);
      console.log('Étudiant connecté:', this.etudiant);

      if (this.etudiant?.id) {
        this.getClasseEtudiant(this.etudiant.id);
      }
    } else {
      console.warn('Aucun étudiant trouvé dans le localStorage.');
    }
  }

  /**
   * Récupérer la classe de l'étudiant par son ID
   * @param id ID de l'étudiant
   */
  getClasseEtudiant(id: number) {
    this.http
      .get<ClasseResponse>(`http://localhost:8083/public/etudiants/${id}/classe`)
      .subscribe({
        next: (response) => {
          console.log('Réponse complète pour la classe:', response);

          if (response.classeId && response.nomClasse) {
            this.nomClasse = response.nomClasse;
            this.classeId = response.classeId;
            console.log('Nom de la classe:', this.nomClasse);
            console.log('ID de la classe:', this.classeId);

            // Appeler la fonction pour récupérer l'emploi du temps de la classe
            this.getEmploiDuTempsParClasse(this.classeId);
          } else {
            console.warn('Aucune classe trouvée pour cet étudiant');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la classe:', err);
        },
      });
  }

  /**
   * Récupérer l'emploi du temps par l'ID de la classe
   * @param classeId ID de la classe
   */
  getEmploiDuTempsParClasse(classeId: number) {
    this.http
      .get<EmploiDuTemps[]>(`http://localhost:8083/public/emploiDuTemps/classe/${classeId}`)
      .subscribe({
        next: (response) => {
          this.emploiDuTemps = response;
          console.log('Emploi du temps de la classe:', this.emploiDuTemps);

          if (this.emploiDuTemps.length > 0) {
            const emploiDuTempsId = this.emploiDuTemps[0].id;
            console.log('ID de l\'emploi du temps:', emploiDuTempsId);

            // Récupérer les séances associées à cet emploi du temps
            this.getSeancesParEmploiDuTemps(emploiDuTempsId);
          }
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de l'emploi du temps:", err);
        },
      });
  }

  /**
   * Récupérer les séances par l'ID de l'emploi du temps
   * @param emploiDuTempsId ID de l'emploi du temps
   */
  getSeancesParEmploiDuTemps(emploiDuTempsId: number) {
    this.http
      .get<Seance[]>(`http://localhost:8083/public/seances/emploiDuTemps/${emploiDuTempsId}`)
      .subscribe({
        next: (response) => {
          this.seances = response;
          console.log('Séances pour l\'emploi du temps:', this.seances);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des séances:', err);
        },
      });
  }



  /**
 * Fonction pour obtenir la séance en fonction du jour et du créneau horaire
 */
getSeancePourJourEtHeure(jour: string, heure: string): Seance | undefined {
  const [heureDebut, heureFin] = heure.split('-');

  return this.seances.find(
    (seance) =>
      seance.jourSeance === jour &&
      seance.debutSeance.startsWith(heureDebut) &&
      seance.finSeance.startsWith(heureFin)
  );
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
}

