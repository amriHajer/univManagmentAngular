import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-specialite',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './specialite.component.html',
  styleUrl: './specialite.component.scss'
})

export class SpecialiteComponent implements OnInit {
  specialites: any[] = []; // Liste des spécialités
  specialite: any = { nomSpecialite: '', cycle: '' }; // Modèle pour la spécialité
  modalTitle: string = ''; // Titre du modal
  modalButtonText: string = ''; // Texte du bouton du modal
  private specialiteModal: any; // Référence au modal

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSpecialites(); // Charger la liste des spécialités
    this.specialiteModal = new bootstrap.Modal(document.getElementById('specialiteModal')); // Initialisation du modal
  }

  // Ouvrir le modal pour ajouter ou modifier une spécialité
  openModal(mode: string, specialite: any = { nomSpecialite: '', cycle: '' }) {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter une Spécialité';
      this.modalButtonText = 'Ajouter';
      this.specialite = { nomSpecialite: '', cycle: '' }; // Initialiser avec des valeurs vides
    } else {
      this.modalTitle = 'Modifier la Spécialité';
      this.modalButtonText = 'Modifier';
      this.specialite = { ...specialite }; // Copier les données de la spécialité à modifier
    }
    this.specialiteModal.show();
  }

  // Récupérer la liste des spécialités
  getSpecialites() {
    this.http.get<any[]>('http://localhost:8083/public/specialites')
      .subscribe(
        response => {
          this.specialites = response;
        },
        error => {
          console.error('Erreur lors de la récupération des spécialités', error);
        }
      );
  }

  // Soumettre le formulaire pour ajouter ou modifier une spécialité
  submitForm() {
    if (this.specialite.nomSpecialite && this.specialite.cycle) {
      const url = 'http://localhost:8083/public/specialites';
      if (this.modalTitle === 'Ajouter une Spécialité') {
        this.http.post(url, this.specialite).subscribe(
          response => {
            console.log('Spécialité ajoutée avec succès', response);
            this.specialites.push(response); // Ajouter la spécialité à la liste
            this.specialiteModal.hide(); // Fermer le modal
          },
          error => console.error('Erreur lors de l\'ajout de la spécialité', error)
        );
      } else {
        this.http.put(`${url}/${this.specialite.id}`, this.specialite).subscribe(
          response => {
            console.log('Spécialité modifiée avec succès', response);
            this.getSpecialites(); // Actualiser la liste des spécialités
            this.specialiteModal.hide(); // Fermer le modal
          },
          error => console.error('Erreur lors de la modification de la spécialité', error)
        );
      }
    }
  }

  // Confirmation et suppression de spécialité
  confirmDelete(specialite: any) {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette spécialité ?');
    if (confirmation) {
      this.http.delete(`http://localhost:8083/public/specialites/${specialite.id}`).subscribe(
        response => {
          console.log('Spécialité supprimée avec succès', response);
          this.specialites = this.specialites.filter(s => s.id !== specialite.id); // Mettre à jour la liste
        },
        error => console.error('Erreur lors de la suppression de la spécialité', error)
      );
    }
  }
}