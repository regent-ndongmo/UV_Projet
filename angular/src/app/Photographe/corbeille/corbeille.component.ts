import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image/image.service';

@Component({
  selector: 'app-corbeille',
  standalone: true,
  imports: [],
  templateUrl: './corbeille.component.html',
  styleUrl: './corbeille.component.scss'
})
export class CorbeilleComponent implements OnInit {
  data: any;

  constructor(private service1 : ImageService){}

  ngOnInit(): void {
    console.log("regenet")
      this.getData()
  }
  getData(){
    this.service1.getAll().subscribe(res=>{
      console.log("l'ensemble des photo existante pour ce photographe sont: ",res)
      this.data=res;
      if (this.data && this.data.length > 0) {
        // Filtrer les données pour ne garder celle supprime
        this.data = this.data.filter((photo: any) => photo.deleted === false);
        console.log("les photos supprime sont : ",this.data)
        if (this.data.length > 0) {
          this.data.forEach((photo: any) => {
            // console.log("Image URL: ", photo.url); // Assurez-vous que la propriété 'url' existe dans vos objets photo
          });
        }
      } else {
        console.log("Aucune photo trouvée.");
      }
    })
  }

}
