import { PictureModalComponent } from './../../Photographe/picture-modal/picture-modal.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';

@Component({
  selector: 'app-dashboard-photographer',
  standalone: true,
  imports: [RouterModule, PictureModalComponent],
  templateUrl: './dashboard-photographer.component.html',
  styleUrl: './dashboard-photographer.component.scss'
})
export class DashboardPhotographerComponent implements OnInit{

  @ViewChild(PictureModalComponent) pictureModal!: PictureModalComponent;

  constructor(private service: AuthService, private router: Router, private service1 : ImageService){}

  isAuthenticated: boolean = true;
  @Input() title!: string;
  isVisible = false;
  photographer_id = localStorage.getItem("user_id")
  data: any
  ngOnInit(): void {
    console.log("l'Id du photographe connecte est: ", this.photographer_id)
    this.getData()
    this.isAuthenticated = this.service.isAuthenticated();

    this.service1.refresh$.subscribe(() => {
      this.getData();
    });
  }

  openModalPicture(){
    this.pictureModal.ngOnInit();
    this.pictureModal.openModal();
  }

  onModalClosed() {
    console.log('La modale a été fermée');
  }

  getData(){
    this.service1.getAll().subscribe(res=>{
      console.log("l'ensemble des photo existante pour ce photographe sont: ",res)
      this.data=res;
      // console.log("image: ", this.data.url)
      if (this.data && this.data.length > 0) {
        this.data.forEach((photo: any) => {
          // console.log("Image URL:", photo.url);
        });
      } else {
        console.log("Aucune photo trouvée.");
      }
    })
  }



  items = ["10", "10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10",
    "10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10","10",
  ]

  // Méthode pour se déconnecter
  logout() {
    this.service.logout();
    // this.service.changeState(false);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  role = this.service.getRole()

  updateImage(id: any){
    console.log("la photo dont on veu faire une mise a jour a pour id ", id)
  }

  deleteImage(id: any){
    console.log("la photo dont on veu supprimer a pour id ", id)
    if(confirm("Voulez vous vraiment supprimer cette photo ? ")){
      this.service1.deleteImage(id).subscribe(res=>{
        console.log("photo supprime avec succes : ", res)
        this.getData()
      })
    }
  }
}
