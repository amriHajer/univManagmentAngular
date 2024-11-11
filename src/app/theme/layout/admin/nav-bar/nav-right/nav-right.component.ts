// Angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{
  user: any;
  imageUrl: string;

  constructor(private router: Router) {}

  ngOnInit() {
    // Récupérer les données de l'utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.imageUrl = `http://localhost:8083/uploads/${this.user.imageUrl.split('/').pop()}`; // Assure-toi que l'URL est correcte
 
      
    }
  }


  
  logout() {
    // Effacer les données de l'utilisateur du localStorage
   // localStorage.removeItem('user');
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
