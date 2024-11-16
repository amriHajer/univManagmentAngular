import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutEtudiantComponent } from './demo/elements/ajout-etudiant/ajout-etudiant.component';
import { EnseignantComponent } from './demo/elements/enseignant/enseignant.component';
import { ListEnseignantComponent } from './demo/elements/list-enseignant/list-enseignant.component';
import { ListEtudiantComponent } from './demo/elements/list-etudiant/list-etudiant.component';
import { ClasseDetailComponent } from './demo/pages/classe-detail/classe-detail.component';
import { ClasseListComponent } from './demo/pages/classe-list/classe-list.component';
import { ClasseComponent } from './demo/pages/classe/classe.component';
import { EmploiDuTempsComponent } from './demo/pages/emploi-du-temps/emploi-du-temps.component';
import { MatiereComponent } from './demo/pages/matiere/matiere.component';
import { ModuleListComponent } from './demo/pages/module-list/module-list.component';
import { ModuleComponent } from './demo/pages/module/module.component';

import { SalleComponent } from './demo/pages/salle/salle.component';
import { SpecialiteComponent } from './demo/pages/specialite/specialite.component';
import { EnseignantSpaceComponent } from './demo/userSpaces/enseignant-space/enseignant-space.component';
import { EtudiantSpaceComponent } from './demo/userSpaces/etudiant-space/etudiant-space.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
//import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./demo/login/login.component').then((c) => c.LoginComponent)
  },

  {
    path: 'etudiantSpace',
    loadComponent: () => import('./demo/userSpaces/etudiant-space/etudiant-space.component').then((c) => c.EtudiantSpaceComponent)
  },

  {
    path: 'enseignantSpace',
    loadComponent: () => import('./demo/userSpaces/enseignant-space/enseignant-space.component').then((c) => c.EnseignantSpaceComponent)
  },
  // {
  //   path: 'cours',
  //   loadComponent: () => import('./demo/userSpaces/enseignant-details/cours/cours.component').then((c) => c.CoursComponent)
  // },
  
  {
    path: '',
    component: EnseignantSpaceComponent,
    children: [
      {
        path: 'enseignantSpace',
        redirectTo: '/',
        // redirectTo: '/cours',
        pathMatch: 'full'
      },
      {
        path: 'cours',
        loadComponent: () => import('./demo/userSpaces/enseignant-details/cours/cours.component').then((c) => c.CoursComponent)
      },
      {
        path: 'profileEns',
        loadComponent: () => import('./demo/userSpaces/enseignant-details/profile-enseignant/profile-enseignant.component').then((c) => c.ProfileEnseignantComponent)
      },
      {
        path: 'emploiEns',
        loadComponent: () => import('./demo/userSpaces/enseignant-details/emploi-enseignant/emploi-enseignant.component').then((c) => c.EmploiEnseignantComponent)
      },
    ]
  },


  /******************************************* */
  {
    path: '',
    component: EtudiantSpaceComponent,
    children: [
      {
        path: 'etudiantSpace',
        redirectTo: '/message',
        // redirectTo: '/cours',
        pathMatch: 'full'
      },
      {
        path: 'message',
        loadComponent: () => import('./demo/userSpaces/etudiant-details/msg-entudiant/msg-entudiant.component').then((c) => c.MsgEntudiantComponent)
      },
      {
        path: 'profileEtd',
        loadComponent: () => import('./demo/userSpaces/etudiant-details/profile-etudiant/profile-etudiant.component').then((c) => c.ProfileEtudiantComponent)
      },
      {
        path: 'emploiEtd',
        loadComponent: () => import('./demo/userSpaces/etudiant-details/emploi-etudiant/emploi-etudiant.component').then((c) => c.EmploiEtudiantComponent)
      },
    ]
  },
  /*********************************************** */
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component').then((c) => c.DefaultComponent)
      },
      /************************************ */
      {
        path: 'login',
        loadComponent: () => import('./demo/login/login.component').then((c) => c.LoginComponent)
      },
      

      /***************************** */
      
      
      {
        path: 'salle',
        loadComponent: () => import('./demo/pages/salle/salle.component').then((c) => SalleComponent)
      } ,
      {
        path: 'emploi',
        loadComponent: () => import('./demo/pages/emploi-du-temps/emploi-du-temps.component').then((c) => EmploiDuTempsComponent)
      } ,

      {
        path: 'classe',
        loadComponent: () => import('./demo/pages/classe/classe.component').then((c) => ClasseComponent)
      } ,

      {
        path: 'listeClasse',
        loadComponent: () => import('./demo/pages/classe-list/classe-list.component').then((c) => ClasseListComponent)
      } ,

      {
        path: 'classeDetail/:id',
        loadComponent: () => import('./demo/pages/classe-detail/classe-detail.component').then((c) => ClasseDetailComponent)
      } ,

      {
        path: 'specialite',
        loadComponent: () => import('./demo/pages/specialite/specialite.component').then((c) => SpecialiteComponent)
      } ,

      {
        path: 'matiere',
        loadComponent: () => import('./demo/pages/matiere/matiere.component').then((c) => MatiereComponent)
      } ,

      {
        path: 'module',
        loadComponent: () => import('./demo/pages/module/module.component').then((c) => ModuleComponent)
      } ,

      {
        path: 'listeModule',
        loadComponent: () => import('./demo/pages/module-list/module-list.component').then((c) => ModuleListComponent)
      } ,

      {
        path: 'enseignant',
        loadComponent: () => import('./demo/elements/enseignant/enseignant.component').then((c) => EnseignantComponent)
      }  ,
      {
        path: 'ListeEnseignant',
        loadComponent: () => import('./demo/elements/list-enseignant/list-enseignant.component').then((c) => ListEnseignantComponent)
      }   ,
      {
        path: 'ajoutEtudiant',
        loadComponent: () => import('./demo/elements/ajout-etudiant/ajout-etudiant.component').then((c) => AjoutEtudiantComponent)
      }  ,
      {
        path: 'ListEtudiant',
        loadComponent: () => import('./demo/elements/list-etudiant/list-etudiant.component').then((c) => ListEtudiantComponent)
      }  ,

    ]
  }  ,
  
  /*************************************** */
   // Redirection pour toute autre route non définie vers login
   {
    path: '**',
    redirectTo: '/login'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
