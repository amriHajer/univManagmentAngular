import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-profile-etudiant',
  standalone: true,
  imports: [CommonModule ,DatePipe],
  templateUrl: './profile-etudiant.component.html',
  styleUrl: './profile-etudiant.component.scss'
})
export class ProfileEtudiantComponent {
  etudiant: any;
  imageUrl: string | undefined;
  nomClasse: string | undefined;
  etudiantId!: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Récupérer les données de l'utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.etudiant = JSON.parse(userData);
      console.log('Étudiant connecté:', this.etudiant);

      // Construire l'URL de l'image
      if (this.etudiant.imageUrl) {
        this.imageUrl = `http://localhost:8083/${this.etudiant.imageUrl}`;
      }

      // Appeler la fonction pour récupérer la classe de l'étudiant
      if (this.etudiant.id) {
        this.getEtudiantById(this.etudiant.id);
        this.getClasseEtudiant(this.etudiant.id);
      }
    }
  }

  // Fonction pour récupérer les informations complètes d'un étudiant par son ID
  getEtudiantById(id: number) {
    this.http.get(`http://localhost:8083/public/etudiant/${id}`)
      .subscribe(
        (response: any) => {
          this.etudiant = response;
          console.log('Détails de l\'étudiant:', this.etudiant);

          // Construire l'URL de l'image
          if (this.etudiant.imageUrl) {
            this.imageUrl = `http://localhost:8083/${this.etudiant.imageUrl}`;
          }
        },
        error => {
          console.error('Erreur lors de la récupération du profil de l\'étudiant:', error);
        }
      );
  }

  // Fonction pour récupérer la classe d'un étudiant par son ID
  getClasseEtudiant(id: number) {
    this.http.get(`http://localhost:8083/public/etudiants/${id}/classe`)
      .subscribe(
        (response: any) => {
          if (response && response.nomClasse) {
            this.nomClasse = response.nomClasse;
          } else {
            console.warn('Aucune classe trouvée pour cet étudiant');
          }
        },
        error => {
          console.error('Erreur lors de la récupération de la classe de l\'étudiant:', error);
        }
      );
  }
}