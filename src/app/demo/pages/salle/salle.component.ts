import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-salle',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './salle.component.html',
  styleUrl: './salle.component.scss'
})
export class SalleComponent implements OnInit {
  salles: any[] = []; // Liste des salles
  salle: any = { nomSalle: '', typeSalle: '' }; // Modèle pour la salle
  modalTitle: string = ''; // Titre du modal
  modalButtonText: string = ''; // Texte du bouton du modal
  private salleModal: any; // Référence au modal

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSalles(); // Charger la liste des salles
    this.salleModal = new bootstrap.Modal(document.getElementById('salleModal')); // Initialisation du modal
  }

  // Ouvrir le modal pour ajouter ou modifier une salle
  openModal(mode: string, salle: any = { nomSalle: '', typeSalle: '' }) {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter une Salle';
      this.modalButtonText = 'Ajouter';
      this.salle = { nomSalle: '', typeSalle: '' };
    } else {
      this.modalTitle = 'Modifier la Salle';
      this.modalButtonText = 'Modifier';
      this.salle = { ...salle }; // Copier les données de la salle à modifier
    }
    this.salleModal.show();
  }

  // Récupérer la liste des salles
  getSalles() {
    this.http.get<any[]>('http://localhost:8083/public/salles')
      .subscribe(
        response => {
          this.salles = response;
        },
        error => {
          console.error('Erreur lors de la récupération des salles', error);
        }
      );
  }

  // Soumettre le formulaire pour ajouter ou modifier une salle
  submitForm() {
    if (this.salle.nomSalle && this.salle.typeSalle) {
      const url = 'http://localhost:8083/public/salles';
      if (this.modalTitle === 'Ajouter une Salle') {
        this.http.post(url, this.salle).subscribe(
          response => {
            console.log('Salle ajoutée avec succès', response);
            this.salles.push(response); // Ajouter la salle à la liste
            this.salleModal.hide(); // Fermer le modal
          },
          error => console.error('Erreur lors de l\'ajout de la salle', error)
        );
      } else {
        this.http.put(`${url}/${this.salle.id}`, this.salle).subscribe(
          response => {
            console.log('Salle modifiée avec succès', response);
            this.getSalles(); // Actualiser la liste des salles
            this.salleModal.hide(); // Fermer le modal
          },
          error => console.error('Erreur lors de la modification de la salle', error)
        );
      }
    }
  }

  // Confirmation et suppression de salle
  confirmDelete(salle: any) {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette salle ?');
    if (confirmation) {
      this.http.delete(`http://localhost:8083/public/salles/${salle.id}`).subscribe(
        response => {
          console.log('Salle supprimée avec succès', response);
          this.salles = this.salles.filter(s => s.id !== salle.id); // Mettre à jour la liste
        },
        error => console.error('Erreur lors de la suppression de la salle', error)
      );
    }
  }
}