import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enseignant-space',
  standalone: true,
  imports: [CommonModule , RouterModule ],
  templateUrl: './enseignant-space.component.html',
  styleUrl: './enseignant-space.component.scss'
})
export class EnseignantSpaceComponent {
 
}
