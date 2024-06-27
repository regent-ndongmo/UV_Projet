import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {

  constructor(private route: Router){}

  items = []

  backTo(){
    this.route.navigate(['/galerie']);
    localStorage.removeItem('categorie_id');
  }

}
