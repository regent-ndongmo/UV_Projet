import { ActivatedRoute, RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [
    ModalComponent,
    NgxPaginationModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent implements OnInit {

  page: number = 1;
  categories : any;
  images: any;
  pageSize: number = 8

  constructor(private route: ActivatedRoute ,private serviceCategorie: CategorieService, private servicePhoto: ImageService){}

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
      // Ajouter la propriété isLiked pour chaque image
      this.images = res.map((image: any) => ({
        ...image,
        isLiked: false,
      }));
    });
  }

  //Modal

  openModal(id: any) {
    console.log("l'id de la photo est : ", id)
    this.photoModal.openModal(id)

  }
  onModalClosed() {
    console.log('La modale a été fermée');
  }


  // isLiked = false;
  likeCount = 0;
  likedId: number = 0;

  toggleLike(image: any) {
    image.isLiked = !image.isLiked;
    if (image.isLiked) {
      this.incrementLikes(image);
    } else {
      this.decrementLikes(image);
    }
  }


  incrementLikes(image: any) {
    this.servicePhoto.incrementLikes(image.id).subscribe(res => {
      image.likes++;
      console.log("incrementation du like ", image.id)
    });
  }


  decrementLikes(image: any) {
    // this.servicePhoto.decrementLikes(image.id).subscribe(res => {
    //   image.likes--;
    // });
  }

  animateLike(id: number) {
    this.likedId = id;

    if (this.likeIconRef && this.likeIconRef.nativeElement) {
      const likeIcon = this.likeIconRef.nativeElement;

      // Ajoutez la classe CSS pour lancer l'animation
      likeIcon.classList.add('liked');

      // Retirez la classe CSS après 300 ms pour terminer l'animation
      setTimeout(() => {
        likeIcon.classList.remove('liked');
      }, 300);
    }
    // if (this.likeIconRef && this.likeIconRef.nativeElement) {
    //   this.likeIconRef.nativeElement.classList.add('liked');
    //   setTimeout(() => {
    //     this.likeIconRef.nativeElement.classList.remove('liked');
    //   }, 300);
    // }
  }



}
