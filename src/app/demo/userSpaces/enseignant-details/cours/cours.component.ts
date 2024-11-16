import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent {
  
  message: string = '';           
  selectedFile: File | null = null;  
  selectedClass: string = '';     
  classes: any[] = [];            
  user: any;                      

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Récupérer les données de l'utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('Utilisateur connecté:', this.user);
      this.loadClasses(); // Charge les classes de l'enseignant connecté
    }
  }

  // Charger les classes de l'enseignant depuis le backend
  loadClasses() {
    if (this.user && this.user.id) {
      const userId = this.user.id; // Utiliser l'ID de l'utilisateur connecté dynamiquement
      const url = `http://localhost:8083/public/seances/enseignant/${userId}/classes`;
  
      this.http.get<any[]>(url)
        .subscribe(
          data => {
            this.classes = data;
            console.log('Classes chargées:', this.classes);
          },
          error => {
            console.error('Erreur lors du chargement des classes:', error);
          }
        );
    } else {
      console.warn('Aucun utilisateur connecté trouvé.');
    }
  }
  

  // Gestion du changement de fichier
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Envoyer le message et gérer le fichier
  sendMessage() {
    if (!this.selectedClass) {
      alert('Veuillez sélectionner une classe');
      return;
    }

    console.log('Classe:', this.selectedClass);
    console.log('Message:', this.message);
    if (this.selectedFile) {
      console.log('Fichier:', this.selectedFile.name);
    }

    // Préparer le form data pour envoyer le fichier et le message
    const formData = new FormData();
    formData.append('contenu', this.message);
    formData.append('classeId', this.selectedClass);
    formData.append('userId', this.user.id); // ID de l'enseignant (utilisateur connecté)

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    // Envoyer les données au backend
    this.http.post('http://localhost:8083/public/messages/send', formData).subscribe(
      response => {
        console.log('Message envoyé avec succès:', response);
        // Réinitialiser le formulaire après l'envoi
        this.resetForm();
      },
      error => {
        console.error('Erreur lors de l\'envoi du message:', error);
      }
    );
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.message = '';
    this.selectedFile = null;
    this.selectedClass = '';
  }
}