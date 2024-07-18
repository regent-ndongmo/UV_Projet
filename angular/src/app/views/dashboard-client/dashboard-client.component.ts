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

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [
    ModalComponent,
    NgxPaginationModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule
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
  contactForm: FormGroup;
  email_client: any
  client_id: any;
  visible: boolean = true
  errorMessage: string = '';

  constructor(
    private servicePhotographe:  PhotographeService,
    private serviceCategorie: CategorieService,
    private servicePhoto: ImageService,
    private service: ClientService,
    private fb: FormBuilder){

      this.contactForm = this.fb.group({
        // name: ['', Validators.required],
        password_client: ['', Validators.required],
        email_client: ['', [Validators.required, Validators.email]]
      });

  }
  @ViewChild(ModalComponent) photoModal!: ModalComponent;

  @ViewChild('likeIcon', { static: true }) likeIconRef!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.client_id = localStorage.getItem('client_id');
    this.email_client = localStorage.getItem('client_email');
    this.getDataPhotographe()
    this.getDataCategorie()
    this.getDataPhoto()

  }

  openModall(){
    this.isVisible = true
  }

  closeModall(){
    this.isVisible = false
  }

  onSubmit(): void {
    this.visible = true
    console.log(this.email_client);

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form Data:', formData)

      this.service.loginClient(formData).subscribe(res => {
        console.log('Login successful', res);
        localStorage.setItem("client_name", res.name)
        localStorage.setItem("client_email", res.email_client)
        localStorage.setItem("client_id", res.id)
        this.isVisible =false
        this.ngOnInit()
      },
      (error: any) => {
        console.log('Error:', error.message);
        this.errorMessage = error.error.message;
      })
      // this.service.register(formData).subscribe(res=> {


      // },
      // (error: any) => {
      //   console.log('Error:', error.message);
      //   this.errorMessage = error.error.message;
      // })
      // Envoyer les données du formulaire au serveur
    }
    else{
      alert("Vueillez remplir les information correcte")
    }
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
