import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'default',
  //       title: 'Dashboard',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/default',
  //       icon: 'ti ti-dashboard',
  //       breadcrumbs: false
  //     }
  //   ]
  // },
//*************************************************** */


  
  {
    id: 'users',
    title: 'Users',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'enseignant',
        title: 'Enseignant',
        type: 'collapse',
        icon: 'ti ti-user',
        children: [
          {
            id:'enseignant',
            title: 'Ajoute un Enseignant',
            type: 'item',
            url: '/enseignant',
           
            breadcrumbs: true
          },
          {
            id: 'Listenseignant',
            title: 'Liste des enseignants',
            type: 'item',
            url: '/ListeEnseignant',
            
            breadcrumbs: false
          },
          
          
          
        ]
      } ,


      {
        id: 'etudiant',
        title: 'Etudiant',
        type: 'collapse',
        icon: 'ti ti-user',
        children: [
          {
            id:'ajoutEtudiant',
            title: 'Ajoute un Etudiant',
            type: 'item',
            url: '/ajoutEtudiant',
           
            breadcrumbs: true
          },
          {
            id: 'ListEtudiant',
            title: 'Liste des etudiants',
            type: 'item',
            url: '/ListEtudiant',
            
            breadcrumbs: false
          },
          
          
          
        ]
      }
    ]
  },

/************************************************************** */

{
  id: 'administration',
  title: 'Administration',
  type: 'group',
  icon: 'icon-navigation',
  children: [
    {
      id: 'salle',
      title: 'salle',
      type: 'item',
      classes: 'nav-item',
      url: '/salle',
      icon: 'ti ti-home'
    },
    
    // {
    //   id: 'classe',
    //   title: 'Ajouter classe',
    //   type: 'item',
    //   classes: 'nav-item',
    //   url: '/classe',
    //   icon: 'ti ti-typography'
    // },
    {
      id: 'classe',
      title: 'classe',
      type: 'item',
      classes: 'nav-item',
      url: '/listeClasse',
      icon: 'ti ti-typography'
     //icon: 'ti ti-calendar'
    },

    {
      id: 'emploi',
      title: 'emploi du temps',
      type: 'item',
      classes: 'nav-item',
      url: '/emploi',
      icon: 'ti ti-calendar'
    },

    {
      id: 'matiere',
      title: 'matieres',
      type: 'item',
      classes: 'nav-item',
      url: '/matiere',
      icon: 'ti ti-book'
    },


    
    {
      id: 'specialite',
      title: 'specialites',
      type: 'item',
      classes: 'nav-item',
      url: '/specialite',
      icon: 'ti ti-typography'
    },

    
   


    {
      id: 'listeModule',
      title: 'modules',
      type: 'item',
      classes: 'nav-item',
      url: '/listeModule',
      icon: 'ti ti-typography'
    },

    // {
    //   id: 'module',
    //   title: 'modules',
    //   type: 'item',
    //   classes: 'nav-item',
    //   url: '/module',
    //   icon: 'ti ti-typography'
    // },


    // {
    //   id: 'listeModule',
    //   title: 'listeModule',
    //   type: 'item',
    //   classes: 'nav-item',
    //   url: '/listeModule',
    //   icon: 'ti ti-typography'
    // },


  ]

 } ,







  
];






@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
