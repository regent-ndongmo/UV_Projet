import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';
import { PhotographeService } from 'src/app/Photographe/service/photographe.service';
import { environment } from 'src/environments/environment.development';
import { ModalComponent } from '../modal/modal.component';

// class Commentaire{
//   photographe_id: any;
//   nom_client : any;
//   ville_client: any;
//   description: any;
//   email_client: any;
// }

class Message{
  photographe_id : any;
  nom_client : any;
  ville_client : any;
  libelle : any;
  email_client : any
  numero_telephone : any;
}

@Component({
  selector: 'app-info-photographe',
  standalone: true,
  imports: [NgxPaginationModule, FormsModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './info-photographe.component.html',
  styleUrl: './info-photographe.component.scss'
})
export class InfoPhotographeComponent implements OnInit {
  @ViewChild(ModalComponent) photoModal!: ModalComponent;
  @ViewChild('likeIcon', { static: true }) likeIconRef!: ElementRef<HTMLElement>;

  id: any;
  photographe: any;
  categories : any;
  images : any
  showModal = false;
  imgURL: any;
  page: number = 1;
  pageSize: number = 8
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: PhotographeService,
    private service1: ImageService,
    private service2: CategorieService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder){

      this.contactForm = this.fb.group({
        photographe_id: ['', Validators.required],
        nom_client: ['', Validators.required],
        ville_client: ['', Validators.required],
        description: ['', Validators.required],
        email_client: ['', [Validators.required, Validators.email]]
      });

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      // Faites quelque chose avec l'ID...
      console.log("L'identifiant de la photo selectionnee est : ",this.id)
    });
    this.getPhotographe(this.id);
    this.getCategorie(this.id);
    this.getPhoto(this.id);

    this.contactForm.patchValue({
      photographe_id: this.id
    });

    this.message.photographe_id = this.id

    this.getComment(this.id)
  }

  getPhotographe(id : any){
    this.service.getPhotographeById(id).subscribe(res =>{
      console.log("Photographe", res)
      this.photographe = res
      if (this.photographe.photo) {
        // Utiliser une URL relative en supposant que les images sont dans le dossier 'assets'
        this.imgURL = `${environment.baseUrl}/${this.photographe.photo}`;

        // this.imgURL = 'assets/account.png';
        console.log('la photo du photographe est : ', this.photographe.photo)
    } else {
        this.imgURL = 'assets/account.png'; // Chemin de l'image par défaut
    }
    })

  }
  getCategorie(id: any){
    this.service2.getCategoriePhotographe(id).subscribe(res=>{
      console.log("categorie ", res);
      this.categories = res;
    })
  }
  getPhoto(id: any){
    this.service1.getAllByPhotographeId(id).subscribe(res => {
      console.log("Image : ", res)
      this.images = res;
    })
  }

  openModalPhoto(id: any) {
    console.log("l'id de la photo est : ", id)
    this.photoModal.openModal(id)

  }
  onModalClosedPhoto() {
    console.log('La modale a été fermée');
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  //Like
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
    this.service1.incrementLikes(image.id).subscribe(res => {
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

  message = new Message()
  messages: any

  sendMessage(){
    console.log(this.message)
    this.service.EnvoyerMessage(this.message).subscribe(res => {
      console.log(res)
      this.messages = res
    })
  }






  isVisible : boolean = false
  // commentaire = new Commentaire()
  contactForm: FormGroup;
  comments: any;
  displayedComments: any;
  remainingComments: any;

  openContactForm(): void {
    this.isVisible = true
  }
  closeModall(): void {
    this.isVisible = false
  }

  getComment(id: any){
    this.service.getCommentByPhotographe(id).subscribe(res =>{
      console.log(res)
      this.comments = res
      this.loadInitialComments();
    })
  }

  loadInitialComments() {
    this.displayedComments = this.comments.slice(0, 6); // Affiche initialement les 4 premiers commentaires
    this.remainingComments = this.comments.slice(6); // Garde les commentaires restants à charger
  }

  loadMoreComments() {
    this.displayedComments = [...this.displayedComments, ...this.remainingComments.slice(0, 4)];
    this.remainingComments = this.remainingComments.slice(4);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form Data:', formData);
      this.service.EnvoyerCommentaire(formData).subscribe(res =>{
        console.log(res)
        this.ngOnInit()
        this.closeModall();
      })

      // Envoyer les données du formulaire au serveur
    }
  }

}
