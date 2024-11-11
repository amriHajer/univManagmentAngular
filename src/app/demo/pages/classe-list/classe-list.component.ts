import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-classe-list',
  standalone: true,
  imports: [CommonModule,   
  FormsModule,    
  RouterModule, ],
  templateUrl: './classe-list.component.html',
  styleUrl: './classe-list.component.scss'
})
export class ClasseListComponent {
  specialites: any[] = [];
  niveaux: any[] = [];
  classes: any[] = [];          // Liste complète des classes
  filteredClasses: any[] = [];   // Liste filtrée des classes

  selectedSpecialite: string = '';
  selectedNiveau: string = '';
  searchNomClasse: string = '';

  private apiUrl = 'http://localhost:8083/public';

  constructor(private http: HttpClient) {}

  ngOnInit() {
      this.loadData();
      this.loadClasses();  // Charge initialement toutes les classes
  }

  // Charger les spécialités, niveaux, et toutes les classes depuis l'API
  loadData() {
      this.http.get<any[]>(`${this.apiUrl}/specialites`).subscribe(data => {
          this.specialites = data;
      });

      this.http.get<any[]>(`${this.apiUrl}/niveaux`).subscribe(data => {
          this.niveaux = data;
      });
  }

  loadClasses() {
      this.http.get<any[]>(`${this.apiUrl}/classes`).subscribe(data => {
          this.classes = data;
          this.filteredClasses = data;  // Initialement, affiche toutes les classes
      });
  }

  // Filtrer les classes selon la spécialité et le niveau
  filterClasses() {
      const params: any = {};

      if (this.selectedSpecialite) {
          params.specialiteId = this.selectedSpecialite;
      }
      if (this.selectedNiveau) {
          params.niveauId = this.selectedNiveau;
      }

      this.http.get<any[]>(`${this.apiUrl}/classes/search`, { params }).subscribe(data => {
          this.filteredClasses = data;
      });
  }

  // Recherche par nom de classe avec autocomplétion
  searchByNomClasse() {
      if (this.searchNomClasse) {
          this.http.get<any[]>(`${this.apiUrl}/classes/search/nom`, {
              params: { nomClasse: this.searchNomClasse }
          }).subscribe(data => {
              this.filteredClasses = data;
          });
      } else {
          this.filteredClasses = this.classes;  // Remet la liste initiale si aucun nom n'est recherché
      }
  }


  // Confirm deletion of a class
  confirmDelete(classe: any) {
    const confirmed = confirm(`Are you sure you want to delete the class: ${classe.nomClasse}?`);
    if (confirmed) {
      this.deleteClass(classe.id);
    }
  }

  // Delete class by ID
  deleteClass(classId: number) {
    this.http.delete(`${this.apiUrl}/classes/${classId}`).subscribe(() => {
      // Refresh the list after deletion
      this.filteredClasses = this.filteredClasses.filter(c => c.id !== classId);
    });
  }

}
