import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule] 
})

export class EnseignantComponent implements OnInit {

  formData: any = {
    role: 'ENSEIGNANT',
    name: '',
    email: '',
    password: '',
    departement: '',
    imageUrl: '',
    matieresIds: [] // Pour stocker les IDs des matières sélectionnées
  };

  selectedFile: File | null = null; // Pour gérer le fichier
  matieres: any[] = []; // Pour stocker les matières récupérées
  selectedMatiere: any = null; // Matière actuellement sélectionnée
  matieresSelectionnees: any[] = [];

  private apiUrl = 'http://localhost:8083/public'; // Remplacez avec votre API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMatieres(); // Charger les matières lors de l'initialisation
  }

  // Méthode pour charger les matières depuis l'API
  loadMatieres() {
    this.http.get<any[]>(`${this.apiUrl}/matieres`).subscribe(data => this.matieres = data);
  }

  // Gestion de la sélection du fichier
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ajouterMatiere() {
    if (this.selectedMatiere) {
      this.matieresSelectionnees.push(this.selectedMatiere);
      this.formData.matieresIds.push(this.selectedMatiere.id); // Ajouter l'ID de la matière sélectionnée
      this.selectedMatiere = null; // Reset selection after adding
    }
  }

  retirerMatiere(matiere: any) {
    this.matieresSelectionnees = this.matieresSelectionnees.filter(m => m !== matiere);
    this.formData.matieresIds = this.formData.matieresIds.filter(id => id !== matiere.id); // Retirer l'ID
  }

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.formData.name);
    formData.append('email', this.formData.email);
    formData.append('password', this.formData.password);
    formData.append('departement', this.formData.departement);
    formData.append('role', this.formData.role);
    
    // Ajouter les matières en tant que tableau d'IDs
    this.formData.matieresIds.forEach((matiereId: any) => {
      formData.append('matieresIds[]', matiereId); // Ajouter l'ID avec un tableau
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post<any>('http://localhost:8083/auth/signup', formData)
      .subscribe(
        response => {
          console.log('Enseignant ajouté avec succès : ', response);
          // Réinitialiser le formulaire après le succès
          this.resetForm();
        },
        error => {
          console.log('Erreur lors de l\'ajout de l\'enseignant : ', error);
        }
      );
  }

  resetForm() {
    this.formData = {
      role: 'ENSEIGNANT',
      name: '',
      email: '',
      password: '',
      departement: '',
      imageUrl: '',
      matieresIds: []
    };
    this.selectedFile = null;
    this.matieresSelectionnees = [];
  }
}