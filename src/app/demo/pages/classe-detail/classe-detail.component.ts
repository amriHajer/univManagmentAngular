import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classe-detail',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './classe-detail.component.html',
  styleUrl: './classe-detail.component.scss'
})
export class ClasseDetailComponent {
  classDetails: any;
  students: any[] = [];
  allStudents: any[] = []; // Liste complète des étudiants pour le modal
  selectedStudentId: number | null = null; // ID de l'étudiant sélectionné dans le modal
  modalTitle = 'Ajouter un étudiant';
  modalButtonText = 'Ajouter';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId) {
      this.getClassDetails(classId);
      this.getStudents(classId);
    }
    this.getAllStudents(); // Récupère tous les étudiants pour le modal
  }

  getClassDetails(classId: string): void {
    this.http.get<any>(`http://localhost:8083/public/classes/${classId}`).subscribe(
      response => {
        this.classDetails = response;
      },
      error => console.error('Erreur lors de la récupération des détails de la classe : ', error)
    );
  }

  getStudents(classId: string): void {
    this.http.get<any[]>(`http://localhost:8083/public/classes/${classId}/etudiants`).subscribe(
      response => {
        this.students = response;
        this.students.forEach(student => {
          student.imageUrl = `http://localhost:8083/uploads/${student.imageUrl.split('/').pop()}`; // Ajout de l'URL de l'image
        });
      },
      error => console.error('Erreur lors de la récupération des étudiants de la classe : ', error)
    );
  }

  getAllStudents(): void {
    this.http.get<any[]>('http://localhost:8083/public/listEtudiantUsers').subscribe(
      response => {
        this.allStudents = response;
        this.allStudents.forEach(etudiant => {
          etudiant.imageUrl = `http://localhost:8083/uploads/${etudiant.imageUrl.split('/').pop()}`;
        });
      },
      error => console.error('Erreur lors de la récupération de tous les étudiants : ', error)
    );
  }

  addStudent(): void {
    if (this.selectedStudentId) {
      const classId = this.route.snapshot.paramMap.get('id');
      if (classId) {
        this.http.post(`http://localhost:8083/public/classes/${classId}/add-students`, [this.selectedStudentId]).subscribe(
          () => {
            this.getStudents(classId); // Rafraîchit la liste des étudiants de la classe
            this.selectedStudentId = null; // Réinitialise la sélection
            console.log('Étudiant ajouté avec succès');
          },
          error => console.error('Erreur lors de l\'ajout de l\'étudiant : ', error)
        );
      }
    }
  }

  openModal(): void {
    this.selectedStudentId = null; // Réinitialiser la sélection lorsque le modal est ouvert
  }



  deleteEtudiant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      this.http.delete(`http://localhost:8083/public/dltEtudiant/${id}`).subscribe(
        () => {
          this.students = this.students.filter(etudiant => etudiant.id !== id);
          console.log('Étudiant supprimé avec succès');
        },
        error => {
          console.error('Erreur lors de la suppression de l\'étudiant : ', error);
        }
      );
    }
  }
}