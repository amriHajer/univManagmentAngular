import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-module-list',
  standalone: true,
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule , RouterModule ],
})
export class ModuleListComponent implements OnInit {
  modules: any[] = []; // Liste complète des modules
  filteredModules: any[] = []; // Liste filtrée des modules
  specialites: any[] = [];
  niveaux: any[] = [];
  semestres: any[] = [];

  selectedSpecialite: string = '';
  selectedNiveau: string = '';
  selectedSemestre: string = '';

  private apiUrl = 'http://localhost:8083/public'; // URL de l'API

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
    this.loadModules();
  }

  // Charger les spécialités, semestres, niveaux depuis l'API
  loadData() {
    this.http.get<any[]>(`${this.apiUrl}/specialites`).subscribe(
      data => this.specialites = data,
      error => {
        console.error('Erreur lors du chargement des spécialités', error);
        alert('Une erreur est survenue lors du chargement des spécialités.'); // Alerte pour l'utilisateur
      }
    );
    this.http.get<any[]>(`${this.apiUrl}/niveaux`).subscribe(
      data => this.niveaux = data,
      error => {
        console.error('Erreur lors du chargement des niveaux', error);
        alert('Une erreur est survenue lors du chargement des niveaux.');
      }
    );
    this.http.get<any[]>(`${this.apiUrl}/semestres`).subscribe(
      data => this.semestres = data,
      error => {
        console.error('Erreur lors du chargement des semestres', error);
        alert('Une erreur est survenue lors du chargement des semestres.');
      }
    );
  }
  loadAllModules() {
    this.http.get<any[]>(`${this.apiUrl}/modules`).subscribe(
      data => {
        this.modules = data;
        this.filteredModules = [...this.modules];
      },
      error => {
        console.error('Erreur lors du chargement des modules', error);
      }
    );
  }
  // Charger les modules depuis l'API
  loadModules() {
    this.http.get<any[]>(`${this.apiUrl}/modules`).subscribe(
      data => {
        this.modules = data.map(module => ({
          ...module,
          specialite: this.specialites.find(s => s.id === module.specialiteId) || {},
          niveau: this.niveaux.find(n => n.id === module.niveauId) || {},
          semestre: this.semestres.find(s => s.id === module.semestreId) || {},
          matieres: module.matieres || [] // Assurez-vous que les matières sont incluses
        }));
        this.filteredModules = [...this.modules];
      },
      error => {
        console.error('Erreur lors du chargement des modules', error);
        alert('Une erreur est survenue lors du chargement des modules.');
      }
    );
  }

  // Filtrer les modules selon les critères de recherche
  filterModules() {
    this.filteredModules = this.modules.filter(module =>
      (!this.selectedSpecialite || module.specialite.id === +this.selectedSpecialite) &&
      (!this.selectedNiveau || module.niveau.id === +this.selectedNiveau) &&
      (!this.selectedSemestre || module.semestre.id === +this.selectedSemestre)
    );
  }

  // Ouvrir le modal pour ajouter ou modifier un module
  openModal(mode: string, module?: any) {
    if (mode === 'add') {
      console.log('Ouvrir modal pour ajouter un module');
    } else if (mode === 'edit') {
      console.log('Ouvrir modal pour modifier le module', module);
    }
  }

  // Confirmer la suppression d'un module
  confirmDelete(module: any) {
    const confirmation = confirm('Voulez-vous vraiment supprimer ce module ?');
    if (confirmation) {
      this.http.delete(`${this.apiUrl}/modules/${module.id}`).subscribe(
        response => {
          console.log('Module supprimée avec succès', response);
          this.modules = this.modules.filter(m => m.id !== module.id);
          this.filterModules();
        },
        error => {
          console.error('Erreur lors de la suppression du module', error);
          alert('Une erreur est survenue lors de la suppression du module.');
        }
      );
    }
  }
}
