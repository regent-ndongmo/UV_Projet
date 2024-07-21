import { LoginClientComponent } from './login-client/login-client.component';
import { ClientService } from './service/client.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { PhotographeService } from 'src/app/Photographe/service/photographe.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'jquery';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { LoginComponent } from 'src/app/Auth/login/login.component';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [
    ModalComponent,
    NgxPaginationModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    LoginClientComponent
  ],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent implements OnInit {

  page: number = 1;
  categories : any;
  images: any;
  photographes : any;
  pageSize: number = 12
  photographe: any;
  isVisible = false;
  imgURL: any;
  email_client: any
  client_id: any;
  visible: boolean = true
  errorMessage: string = '';

  constructor(
    private servicePhotographe:  PhotographeService,
    private serviceCategorie: CategorieService,
    private servicePhoto: ImageService,
    private service: ClientService,
    private serviceAuth: AuthService
  ){}
  @ViewChild(ModalComponent) photoModal!: ModalComponent;

  @ViewChild('likeIcon', { static: true }) likeIconRef!: ElementRef<HTMLElement>;
  @ViewChild(LoginClientComponent) loginC!: LoginClientComponent;

  ngOnInit(): void {
    this.client_id = localStorage.getItem('client_id');
    this.serviceAuth.currentClient.subscribe(state => this.email_client = state);
    // this.email_client = localStorage.getItem('client_email');
    this.getDataPhotographe()
    this.getDataCategorie()
    this.getDataPhoto()

  }

  openModall(){
    this.loginC.openModall()
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
      this.getUserLikes().then((likes: any) => {
        this.images = res.map((image: any) => ({
          ...image,
          isLiked: likes.some((like: any) => like.photo_id === image.id)
        }));
      });
    });
  }

  getDataPhotographe(){
    this.servicePhotographe.getData().subscribe(res=>{
      console.log("Photographe", res)
      this.photographes = res
    })
  }

  //Modal

  openModal(id: any) {
    console.log("l'id de la photo est : ", id)
    this.photoModal.openModal(id)

  }
  onModalClosed() {
    console.log('La modale a été fermée');
  }

  likeCount = 0;
  likedId: number = 0;

  toggleLike(image: any) {
    if(this.email_client){
      image.isLiked = !image.isLiked;
      if (image.isLiked) {
        this.incrementLikes(image);
      } else {
        this.decrementLikes(image);
      }
    }
    else{
      this.openModall()
    }

  }


  incrementLikes(image: any) {
    this.servicePhoto.incrementLikes(image.id).subscribe(res => {
      image.likes++;
      this.service.likePhoto(this.client_id, image.id).subscribe(res=>{
        console.log(res);

      })
      console.log("incrementation du like ", image.id)
    });

  }


  decrementLikes(image: any) {

    this.servicePhoto.decrementeLikes(image.id).subscribe(res => {
      image.likes--;
      this.service.unlikePhoto(this.client_id, image.id).subscribe(res=>{
        console.log(res)
      })
    });
  }
  getUserLikes() {
    return new Promise((resolve, reject) => {
      if (this.client_id) {
        this.service.getUserLikes(this.client_id).subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      } else {
        resolve([]);
      }
    });
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
