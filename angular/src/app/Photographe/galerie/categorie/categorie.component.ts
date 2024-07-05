import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../service/image/image.service';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {

  id!: string;
  data:any
  photographe_id : any

  constructor(private router: Router, private route: ActivatedRoute, private service1: ImageService){}

  ngOnInit(): void {
    this.photographe_id = localStorage.getItem("user_id")
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      // Faites quelque chose avec l'ID...
      console.log("L'identifiant de la categorie selectionnee est : ",this.id)
    });
    this.getData()
  }


  getData(){
    this.service1.getAllByPhotographeId(this.photographe_id).subscribe(res=>{
      console.log("l'ensemble des photo existante pour ce photographe sont: ",res)
      this.data=res;
      // console.log("la data est : ", this.data)
      // console.log("image categorie id: ", this.data.categorie_id)
      if (this.data && this.data.length > 0) {
        // Filtrer les données pour ne garder que celles avec categorie_id === 10
        this.data = this.data.filter((photo: any) => photo.categorieId === +this.id);
        // console.log("categorie id : ", photo.categorieId)

        console.log("ID",+this.id)

        console.log("la data est : ", this.data)
        if (this.data.length > 0) {
          this.data.forEach((photo: any) => {
            // console.log("Image categorie id: ", photo.categorie_id);
            console.log("Image URL: ", photo.url); // Assurez-vous que la propriété 'url' existe dans vos objets photo
          });
        }
      } else {
        console.log("Aucune photo trouvée.");
      }
    })
  }

  items = []

  backTo(){
    this.router.navigate(['/galerie']);
    localStorage.removeItem('categorie_id');
  }

  updateImage(id: any){
    console.log("la photo dont on veu faire une mise a jour a pour id ", id)
  }

  deleteImage(id: any){
    console.log("la photo dont on veu supprimer a pour id ", id)
  }

}
