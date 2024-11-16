import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './module.component.html',
  styleUrl: './module.component.scss'
})

export class ModuleComponent implements OnInit {
  module: any = { nomModule: '', specialite: null, niveau: null, semestre: null };
  specialites: any[] = [];
  semestres: any[] = [];
  niveaux: any[] = [];
  matieres: any[] = [];
  matieresSelectionnees: any[] = [];
  selectedMatiere: any = null;
  matiereDetails = { coefficient: null, volumeHoraire: null };
  filteredNiveaux: any[] = [];

  private apiUrl = 'http://localhost:8083/public';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>(`${this.apiUrl}/specialites`).subscribe(data => this.specialites = data);
    this.http.get<any[]>(`${this.apiUrl}/semestres`).subscribe(data => this.semestres = data);
    this.http.get<any[]>(`${this.apiUrl}/niveaux`).subscribe(data => this.niveaux = data);
    this.http.get<any[]>(`${this.apiUrl}/matieres`).subscribe(data => this.matieres = data);
  }

 

  onMatiereChange() {
    this.matiereDetails = { coefficient: null, volumeHoraire: null };
  }

  ajouterMatiere() {
    if (this.selectedMatiere && this.matiereDetails.coefficient && this.matiereDetails.volumeHoraire) {
      const matiereToAdd = {
        matiere: { id: this.selectedMatiere.id },
        coefficient: this.matiereDetails.coefficient,
        volumeHoraire: this.matiereDetails.volumeHoraire
      };
      this.matieresSelectionnees.push(matiereToAdd);
      this.selectedMatiere = null;
      this.matiereDetails = { coefficient: null, volumeHoraire: null };
    }
  }

  retirerMatiere(matiere: any) {
    this.matieresSelectionnees = this.matieresSelectionnees.filter(m => m !== matiere);
  }

  submitForm() {
    const moduleData = {
      nomModule: this.module.nomModule.trim(),
      specialite: { id: this.module.specialite.id },
      niveau: { id: this.module.niveau.id },
      semestre: { id: this.module.semestre.id },
      matiereModules: this.matieresSelectionnees
    };
    
    this.http.post(`${this.apiUrl}/modules`, moduleData).subscribe(
      response => {
        console.log('Module ajouté avec succès', response);
        this.matieresSelectionnees = [];
        this.module = { nomModule: '', specialite: null, niveau: null, semestre: null };
      },
      error => {
        console.error("Erreur lors de l'ajout du module", error);
      }
    );
  }



  /************************** */
  onSpecialiteChange() {
    console.log('Spécialité sélectionnée:', this.module.specialite);
  
    if (this.module.specialite) {
      const cycle = this.module.specialite.cycle?.toLowerCase().trim(); // Assure une uniformité
      console.log('Cycle détecté:', cycle);
  
      // Normaliser l'orthographe des niveaux pour "Licence"
      const normalizeCycleName = (cycleName: string) => cycleName.toLowerCase().replace('license', 'licence');
  
      if (cycle === 'master') {
        // Filtrer les niveaux avec "Master"
        this.filteredNiveaux = this.niveaux.filter(niveau => 
          normalizeCycleName(niveau.nomNiveau).includes('master')
        );
      } else if (cycle === 'licence') {
        // Filtrer les niveaux avec "Licence"
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