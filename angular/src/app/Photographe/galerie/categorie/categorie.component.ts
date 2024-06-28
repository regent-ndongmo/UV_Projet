import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {

  id!: string;

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      // Faites quelque chose avec l'ID...
      console.log("L'identifiant de la categorie selectionnee est : ",this.id)
    });
  }


  items = []

  backTo(){
    this.router.navigate(['/galerie']);
    localStorage.removeItem('categorie_id');
  }

}
