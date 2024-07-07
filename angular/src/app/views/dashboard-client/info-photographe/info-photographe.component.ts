import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/Photographe/service/image/image.service';

@Component({
  selector: 'app-info-photographe',
  standalone: true,
  imports: [],
  templateUrl: './info-photographe.component.html',
  styleUrl: './info-photographe.component.scss'
})
export class InfoPhotographeComponent implements OnInit {

  id: any;

  constructor(private router: Router, private route: ActivatedRoute, private service1: ImageService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      // Faites quelque chose avec l'ID...
      console.log("L'identifiant de la photo selectionnee est : ",this.id)
    });
  }

}
