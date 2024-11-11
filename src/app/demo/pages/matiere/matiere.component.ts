import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.scss'
})
export class MatiereComponent implements OnInit{
  matieres: any[] = []; // Tableau pour stocker les matières
  formData = {
    nomMatiere: ''
  };
  private matiereModal: any;  // Référence au modal

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMatieres();  // Appel pour récupérer les matières à l'initialisation

    // Initialisation du modal
    this.matiereModal = new bootstrap.Modal(document.getElementById('matiereModal'));
  }

  // Fonction pour ouvrir le modal
  openModal() {
    this.matiereModal.show();
  }

  // Récupérer la liste des matières
  getMatieres() {
    this.http.get('http://localhost:8083/public/matieres')
      .subscribe(
        (data: any) => {
          this.matieres = data;
        },
        error => {
          console.error('Erreur lors de la récupération des matières', error);
        }
      );
  }

  // Fonction pour ajouter une nouvelle matière
  submitForm() {
    const matiereData = {
      nomMatiere: this.formData.nomMatiere
    };

    this.http.post('http://localhost:8083/public/matieres', matiereData)
      .subscribe(
        response => {
          console.log('Matière ajoutée avec succès', response);
          this.formData.nomMatiere = '';  // Réinitialiser le formulaire
          this.getMatieres();  // Actualiser la liste des matières
          this.matiereModal.hide();  // Fermer le modal
        },
        error => {
          console.error('Erreur lors de l\'ajout de la matière', error);
        }
      );
  }

  

  confirmDelete(matiere: any) {
    if (window.confirm(`Es-tu sûr de vouloir supprimer la matière "${matiere.nomMatiere}" ?`)) {
      this.deleteMatiere(matiere.id);
    }
  }

  // Supprimer une matière
  deleteMatiere(id: number) {
    this.http.delete(`http://localhost:8083/public/matieres/${id}`)
      .subscribe(
        response => {
          console.log('Matière supprimée avec succès', response);
          this.getMatieres();  // Actualiser la liste des matières
        },
        error => {
          console.error('Erreur lors de la suppression de la matière', error);
        }
      );
  }
}