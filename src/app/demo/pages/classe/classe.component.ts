import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent  {

 specialites: any[] = [];
  niveaux: any[] = [];
  anneesUniversitaires: any[] = [];
  filteredNiveaux: any[] = [];
  
  newClasse = {
    nomClasse: '',
    anneeUniversitaire: { id: '' },
    niveau: { id: '' },
    specialite: { id: '', cycle: '' } // Ensure cycle exists here
  };
  
  private apiUrl = 'http://localhost:8083/public';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Charger les spécialités
    this.http.get<any[]>(`${this.apiUrl}/specialites`).subscribe(
      data => this.specialites = data,
      error => console.error('Erreur lors du chargement des spécialités', error)
    );

    // Charger les niveaux
    this.http.get<any[]>(`${this.apiUrl}/niveaux`).subscribe(
      data => this.niveaux = data,
      error => console.error('Erreur lors du chargement des niveaux', error)
    );

    // Charger les années universitaires
    this.http.get<any[]>(`${this.apiUrl}/annees-universitaires`).subscribe(
      data => this.anneesUniversitaires = data,
      error => console.error('Erreur lors du chargement des années universitaires', error)
    );
  }

  createClass() {
    if (!this.newClasse.nomClasse || !this.newClasse.anneeUniversitaire.id || 
        !this.newClasse.niveau.id || !this.newClasse.specialite.id) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.http.post(`${this.apiUrl}/classes`, this.newClasse).subscribe(
      response => {
        console.log('Classe créée avec succès', response);
        alert('La classe a été créée avec succès.');
        this.resetClassForm();
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la création de la classe', error);
        if (error.status === 403) {
          alert('Accès interdit : vous n’avez pas les permissions nécessaires.');
        } else {
          alert('Une erreur est survenue lors de la création de la classe.');
        }
      }
    );
  }

  resetClassForm() {
    this.newClasse = {
      nomClasse: '',
      anneeUniversitaire: { id: '' },
      niveau: { id: '' },
      specialite: { id: '', cycle: '' }
    };
    this.filteredNiveaux = this.niveaux;
  }

  /************************** */
  onSpecialiteChange() {
    console.log('Spécialité sélectionnée:', this.newClasse.specialite);
  
    if (this.newClasse.specialite) {
      const cycle = this.newClasse.specialite.cycle?.toLowerCase().trim(); // Corrected variable
      console.log('Cycle détecté:', cycle);
  
      const normalizeCycleName = (cycleName: string) => cycleName.toLowerCase().replace('license', 'licence');
  
      if (cycle === 'master') {
        this.filteredNiveaux = this.niveaux.filter(niveau =>
          normalizeCycleName(niveau.nomNiveau).includes('master')
        );
      } else if (cycle === 'licence') {
        this.filteredNiveaux = this.niveaux.filter(niveau =>
          normalizeCycleName(niveau.nomNiveau).includes('licence')
        );
      } else {
        this.filteredNiveaux = [];
      }
  
      console.log('Niveaux filtrés:', this.filteredNiveaux);
    } else {
      this.filteredNiveaux = [];
    }
  }
  
}