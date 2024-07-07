import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent implements OnInit {

  categories : any;
  images: any;

  constructor(private serviceCategorie: CategorieService, private servicePhoto: ImageService){}


  ngOnInit(): void {
      this.getDataCategorie()
      this.getDataPhoto()
  }
  getDataCategorie() {
    this.serviceCategorie.getAll().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  getDataPhoto() {
    this.servicePhoto.getAll().subscribe(res => {
      console.log(res);
      this.images = res;
    })
  }



}
