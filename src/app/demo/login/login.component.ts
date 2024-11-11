import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  loginForm!: FormGroup;
  loginError: string = '';
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitLoginForm(): void {
    const credentials = this.loginForm.getRawValue();

    this.http.post('http://localhost:8083/auth/signin', credentials)
      .subscribe(
        (response: any) => {
          const userData = response.users;
          console.log('Données de l\'utilisateur connecté :', userData);

// Stocker les informations de l'utilisateur dans localStorage
localStorage.setItem('user', JSON.stringify(userData));



if (userData.role === 'ADMIN') { 
  this.router.navigate(['/default']);
} else if (userData.role === 'ENSEIGNANT') {
  this.router.navigate(['/enseignantSpace']);
} else if (userData.role === 'ETUDIANT') {
  this.router.navigate(['etudiantSpace']);
} 
},
(error) => {
console.error('Erreur de connexion :', error);
this.loginError = 'Identifiants incorrects. Veuillez réessayer.';
}
);
}
}

