import { Component,OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { PictureModalComponent } from 'src/app/Photographe/picture-modal/picture-modal.component';
import { ImageService } from 'src/app/Photographe/service/image/image.service';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [NgxPaginationModule, RouterModule, PictureModalComponent ]
})
export class DashboardComponent implements OnInit {
  @ViewChild(PictureModalComponent) pictureModal!: PictureModalComponent;

  page: number = 1;
  pageSize: number = 8
  data : any;
  photographer_id: any


  image = ["logo", "logo", "logo", "logo", "logo", "logo", "logo", "logo", "logo"]

  constructor(private service: AuthService, private router: Router, private service1 : ImageService){}

  ngOnInit(): void {
    this.photographer_id = localStorage.getItem("user_id")
    console.log("l'Id du photographe connecte est: ", this.photographer_id)
    this.getData()
    // this.isAuthenticated = this.service.isAuthenticated();

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

  updateImage(id: any){
    console.log("la photo dont on veu faire une mise a jour a pour id ", id)
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
