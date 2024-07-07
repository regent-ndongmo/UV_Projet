import { ModalComponent } from './modal/modal.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective } from '@coreui/angular';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [
    ModalComponent
  ],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent implements OnInit {

  categories : any;
  images: any;
  dataDemo: any;

  constructor(private serviceCategorie: CategorieService, private servicePhoto: ImageService){}

  @ViewChild(ModalComponent) photoModal!: ModalComponent;
  @ViewChild('likeIcon', { static: true }) likeIconRef!: ElementRef<HTMLElement>;

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

  //Modal

  openModal(id: any) {
    console.log("l'id de la photo est : ", id)
    this.photoModal.openModal(id)
    // this.servicePhoto.getAllBYid(id).subscribe(res=>{
    //   console.log(res);
    //   this.dataDemo = res;

    // })
  }
  onModalClosed() {
    console.log('La modale a été fermée');
  }


  isLiked = false;
  likeCount = 0;

  toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.incrementLikes();
    } else {
      this.decrementLikes();
    }
  }

  incrementLikes() {
    this.likeCount++;
    this.animateLike();
  }

  decrementLikes() {
    if (this.likeCount > 0) {
      this.likeCount--;
    }
  }

  animateLike() {
    if (this.likeIconRef && this.likeIconRef.nativeElement) {
      this.likeIconRef.nativeElement.classList.add('liked');
      setTimeout(() => {
        this.likeIconRef.nativeElement.classList.remove('liked');
      }, 300);
    }
  }



}
