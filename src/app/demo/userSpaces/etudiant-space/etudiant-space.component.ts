import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-etudiant-space',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './etudiant-space.component.html',
  styleUrl: './etudiant-space.component.scss'
})
export class EtudiantSpaceComponent {

}
