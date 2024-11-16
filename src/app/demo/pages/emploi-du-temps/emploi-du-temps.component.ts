import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Seance {
  jourSeance: string;
  debutSeance: string;
  finSeance: string;
  matiere: { id: number };
  enseignant: { id: number };
  salle: { id: number };
}

interface EmploiDuTemps {
  classe: { id: number };
  semestre: { id: number };
  seances: Seance[];
}

@Component({
  selector: 'app-emploi-du-temps',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emploi-du-temps.component.html',
  styleUrl: './emploi-du-temps.component.scss'
})
export class EmploiDuTempsComponent implements OnInit {
  semestres: any[] = [];
  classes: any[] = [];
  salles: any[] = [];
  matieres: any[] = [];
  enseignants: any[] = [];

  selectedClasse: number = 0;
  selectedSemestre: number = 0;
  //emploiDuTemps: TimeSlot[] = [];
  emploiDuTemps: any[] = [];

  // Jours et horaires pour l'emploi du temps
  public jours: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  public horaires: { debut: string; fin: string }[] = [
    { debut: '08:00', fin: '10:00' },
    { debut: '10:00', fin: '12:00' },
    { debut: '13:00', fin: '15:00' },
    { debut: '15:00', fin: '17:00' }
  ];

  private apiUrl = 'http://localhost:8083/public';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSemestres();
    this.loadClasses();
    this.getMatieres();
    this.getSalles();
    this.getEnseignants();
    this.initializeEmploiDuTemps();
  }

  // Charger les semestres depuis l'API
  loadSemestres() {
    this.http.get<any[]>(`${this.apiUrl}/semestres`).subscribe({
      next: (data) => this.semestres = data,
      error: (err) => console.error('Erreur lors du chargement des semestres', err)
    });
  }

  // Charger les classes depuis l'API
  loadClasses() {
    this.http.get<any[]>(`${this.apiUrl}/classes`).subscribe({
      next: (data) => this.classes = data,
      error: (err) => console.error('Erreur lors du chargement des classes', err)
    });
  }

  // Charger les matières depuis l'API
  getMatieres() {
    this.http.get<any[]>(`${this.apiUrl}/matieres`).subscribe({
      next: (data) => this.matieres = data,
      error: (err) => console.error('Erreur lors de la récupération des matières', err)
    });
  }

  // Charger les salles depuis l'API
  getSalles() {
    this.http.get<any[]>(`${this.apiUrl}/salles`).subscribe({
      next: (data) => this.salles = data,
      error: (err) => console.error('Erreur lors de la récupération des salles', err)
    });
  }

  // Charger les enseignants depuis l'API
  getEnseignants() {
    this.http.get<any[]>(`${this.apiUrl}/listEnseignantUsers`).subscribe({
      next: (data) => this.enseignants = data,
      error: (err) => console.error('Erreur lors de la récupération des enseignants', err)
    });
  }

  // Initialisation de l'emploi du temps
  initializeEmploiDuTemps() {
    this.emploiDuTemps = this.horaires.map(({ debut, fin }) => ({
      time: `${debut} - ${fin}`,
      selections: this.jours.map(jour => ({
        jourSeance: jour,
        debutSeance: debut,
        finSeance: fin,
        matiere: null,
        enseignant: null,
        salle: null
      }))
    }));
  }

  // Sauvegarder l'emploi du temps
  saveEmploiDuTemps() {
    const emploiDuTempsData: EmploiDuTemps = {
      classe: { id: this.selectedClasse },
      semestre: { id: this.selectedSemestre },
      seances: this.emploiDuTemps.flatMap((slot: any) =>
        slot.selections
          .filter((selection: any) => selection.matiere && selection.enseignant && selection.salle)
          .map((selection: any) => ({
            jourSeance: selection.jourSeance,
            debutSeance: selection.debutSeance,
            finSeance: selection.finSeance,
            matiere: { id: selection.matiere.id },
            enseignant: { id: selection.enseignant.id },
            salle: { id: selection.salle.id }
          }))
      )
    };

    this.http.post(`${this.apiUrl}/emploiDuTemps`, emploiDuTempsData).subscribe({
      next: (response) => {
        console.log('Emploi du temps créé avec succès!', response);
        alert('Emploi du temps enregistré avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'emploi du temps', err);
        alert('Erreur lors de la sauvegarde');
      }
    });
  }
}