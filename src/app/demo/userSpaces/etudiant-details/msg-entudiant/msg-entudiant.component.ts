import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-msg-entudiant',
  standalone: true,
  imports: [CommonModule ,DatePipe],
  templateUrl: './msg-entudiant.component.html',
  styleUrl: './msg-entudiant.component.scss'
})
export class MsgEntudiantComponent {
  etudiant: any;
  messages: any[] = [];
  classeId!: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les données de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.etudiant = JSON.parse(userData);
      console.log('Étudiant connecté:', this.etudiant);

      // Vérifier si l'étudiant a une classe associée
      if (this.etudiant.id) {
        this.getClasseEtudiant(this.etudiant.id);
      }
    }
  }

  // Récupérer la classe de l'étudiant par son ID
  getClasseEtudiant(etudiantId: number): void {
    this.http.get<any>(`http://localhost:8083/public/etudiants/${etudiantId}/classe`)
      .subscribe({
        next: (response) => {
          if (response && response.classeId) {
            this.classeId = response.classeId;
            console.log('Classe de l\'étudiant:', this.classeId);

            // Récupérer les messages de la classe
            this.getMessagesByClasse(this.classeId);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la classe:', error);
        }
      });
  }

  // Récupérer les messages de la classe
  getMessagesByClasse(classeId: number): void {
    this.http.get<any[]>(`http://localhost:8083/public/messages/messagesByClass?classeId=${classeId}`)
      .subscribe({
        next: (data) => {
          this.messages = data;
          console.log('Messages reçus:', this.messages);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des messages:', error);
        }
      });
  }
}