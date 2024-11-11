import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Selection {
  matiere: any;
  salle: any;
  enseignant: any;
  jourSeance: string;
  debutSeance: string;
  finSeance: string;
}

interface TimeSlot {
  time: string;
  selections: Selection[];
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

  selectedClasse: string = '';
  selectedSemestre: string = '';
  emploiDuTemps: TimeSlot[] = [];

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

  loadSemestres() {
    this.http.get<any[]>(`${this.apiUrl}/semestres`).subscribe(data => {
      this.semestres = data;
    });
  }

  loadClasses() {
    this.http.get<any[]>(`${this.apiUrl}/classes`).subscribe(data => {
      this.classes = data;
    });
  }

  getMatieres() {
    this.http.get<any[]>(`${this.apiUrl}/matieres`).subscribe(
      data => {
        this.matieres = data;
      },
      error => {
        console.error('Erreur lors de la récupération des matières', error);
      }
    );
  }

  getSalles() {
    this.http.get<any[]>(`${this.apiUrl}/salles`).subscribe(data => {
      this.salles = data;
    });
  }

  getEnseignants() {
    this.http.get<any[]>(`${this.apiUrl}/listEnseignantUsers`).subscribe(data => {
      this.enseignants = data;
    });
  }

  initializeEmploiDuTemps() {
    this.emploiDuTemps = this.horaires.map(({ debut, fin }) => ({
      time: `${debut} - ${fin}`,
      selections: this.jours.map(jour => ({
        jourSeance: jour,  // Par exemple: "lundi", "mardi", etc.
        debutSeance: debut,
        finSeance: fin,
        matiere: null,  // ID de la matière, à remplir lors de la sélection
        salle: null,    // ID de la salle, à remplir lors de la sélection
        enseignant: null // ID de l'enseignant, à remplir lors de la sélection
      }))
    }));
  }
  

  loadEmploiDuTemps() {
    if (!this.selectedSemestre || !this.selectedClasse) {
      return;
    }
  
    console.log('Chargement de l\'emploi du temps pour le semestre :', this.selectedSemestre, 'et la classe :', this.selectedClasse);
  
    this.http.get<any[]>(`${this.apiUrl}/emploiDuTemps?classe=${this.selectedClasse}&semestre=${this.selectedSemestre}`).subscribe(
      data => {
        if (Array.isArray(data) && data.length > 0) {
          console.log('Emploi du temps récupéré:', data);
          this.emploiDuTemps = data.map((slot: any) => ({
            time: slot.time,
            selections: slot.selections ? slot.selections.map((selection: any) => ({
              matiere: selection.matiere || null,
              salle: selection.salle || null,
              enseignant: selection.enseignant || null
            })) : []  // Assurez-vous que 'selections' est défini avant de mapper
          }));
        } else {
          console.log('Aucune donnée d\'emploi du temps trouvée.');
          this.initializeEmploiDuTemps();  // Reset si aucune donnée
        }
      },
      error => {
        console.error('Erreur lors du chargement de l\'emploi du temps:', error);
        this.initializeEmploiDuTemps();  // Reset en cas d'erreur
      }
    );
  }
  
  

  
  
  
  saveEmploiDuTemps() {
    const emploiDuTempsData = {
      semestre: { id: this.selectedSemestre },
      classe: { id: this.selectedClasse },
      seances: this.emploiDuTemps.flatMap((slot: any) =>
        slot.selections.map((selection: any) => ({
          jourSeance: this.jours[slot.selections.indexOf(selection)],
          debutSeance: slot.time.split(' - ')[0],
          finSeance: slot.time.split(' - ')[1],
          matiere: { id: selection.matiere?.id },
          enseignant: { id: selection.enseignant?.id },
          salle: { id: selection.salle?.id }
        }))
      )
    };

    this.http.post(`${this.apiUrl}/emploiDuTemps`, emploiDuTempsData).subscribe(
      (response) => {
        console.log('Emploi du temps créé avec succès!', response);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'emploi du temps', error);
      }
    );
  }
}