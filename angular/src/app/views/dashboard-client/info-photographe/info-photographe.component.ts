import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';
import { PhotographeService } from 'src/app/Photographe/service/photographe.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-info-photographe',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './info-photographe.component.html',
  styleUrl: './info-photographe.component.scss'
})
export class InfoPhotographeComponent implements OnInit {
  @ViewChild('likeIcon', { static: true }) likeIconRef!: ElementRef<HTMLElement>;

  id: any;
  photographe: any;
  categories : any;
  images : any
  showModal = false;
  imgURL: any;
  page: number = 1;
  pageSize: number = 8

  constructor(private router: Router, private route: ActivatedRoute, private service: PhotographeService, private service1: ImageService, private service2: CategorieService){}
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



}
