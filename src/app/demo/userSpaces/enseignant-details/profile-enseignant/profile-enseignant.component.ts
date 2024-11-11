import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-enseignant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-enseignant.component.html',
  styleUrl: './profile-enseignant.component.scss'
})
export class ProfileEnseignantComponent {
  enseignant: any;  
  imageUrl: string | undefined; // Déclarer imageUrl ici

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Récupérer les données de l'utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.enseignant = JSON.parse(userData);
      console.log('Enseignant connecté:', this.enseignant);

      // Si l'image est présente dans les données récupérées
      if (this.enseignant.imageUrl) {
        this.imageUrl = `http://localhost:8083/uploads/${this.enseignant.imageUrl.split('/').pop()}`;
      }
    }
  }

  getEnseignantById(id: number) {
    this.http.get(`http://localhost:8083/public/enseignant/${id}`)
      .subscribe(
        (response: any) => {
          this.enseignant = response;

          // Corriger l'URL de l'image en s'assurant que l'URL du backend est utilisée
          if (this.enseignant.imageUrl) {
            this.imageUrl = `http://localhost:8083/uploads/${this.enseignant.imageUrl.split('/').pop()}`;
          }
        },
        error => {
          console.error('Erreur lors de la récupération du profil de l\'enseignant : ', error);
        }
      );
  }
}