import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-ajout-etudiant',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './ajout-etudiant.component.html',
  styleUrl: './ajout-etudiant.component.scss'
})
export class AjoutEtudiantComponent {

  formData: any = {
    role: 'ETUDIANT',
    name: '',
    email: '',
    password: '',
    tel: '',
    cin: '',
    dateNaissance: null, 
    imageUrl: '',
  };

  selectedFile: File | null = null;  // Pour gérer le fichier

  constructor(private http: HttpClient) {}

  // Gestion de la sélection du fichier
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();
  
    // Ajout des champs au FormData
    formData.append('name', this.formData.name);
    formData.append('email', this.formData.email);
    formData.append('password', this.formData.password);
    formData.append('tel', this.formData.tel);
    formData.append('cin', this.formData.cin);
    formData.append('dateNaissance', this.formData.dateNaissance);
    formData.append('role', this.formData.role);

  
    // Vérification et ajout de l'image
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
  
    // Appel HTTP POST pour envoyer les données à l'API
    this.http.post('http://localhost:8083/auth/signup', formData).subscribe({
      next: (response) => {
        console.log('Étudiant ajouté avec succès', response);
        // Gestion du succès (affichage d'un message, redirection, etc.)
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
        // Gestion de l'erreur (affichage d'un message d'erreur, etc.)
      }
    });
  }
  
}