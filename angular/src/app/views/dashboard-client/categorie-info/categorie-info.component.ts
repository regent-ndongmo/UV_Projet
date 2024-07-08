import { ModalComponent } from './../modal/modal.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription, from, mergeMap, toArray } from 'rxjs';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';

@Component({
  selector: 'app-categorie-info',
  standalone: true,
  imports: [NgxPaginationModule, ModalComponent],
  templateUrl: './categorie-info.component.html',
  styleUrl: './categorie-info.component.scss'
})
export class CategorieInfoComponent implements OnInit{
  @ViewChild(ModalComponent) photoModal!: ModalComponent;
  @ViewChild('likeIcon', { static: true }) likeIconRef!: ElementRef<HTMLElement>;

  private subscription!: Subscription;

  name: string = '';
  AllId: any[] = [];
  data: any[] = [];
  images: any[] = [];
  page: number = 1;
  pageSize: number = 8

  constructor(private route: ActivatedRoute, private router: Router,private serviceCategorie: CategorieService, private servicePhoto: ImageService){}


  ngOnInit(): void {
    console.log("L'identifiant de la categorie selectionnee est : ",this.name)

    this.name = this.route.snapshot.paramMap.get('name')!;
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name')!;
      // Faites quelque chose avec l'ID...
      console.log("L'identifiant de la categorie selectionnee est : ",this.name)
    });
    this.getAllId(this.name);

    this.getPhoto()

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.subscription = this.serviceCategorie.onInit().subscribe(() => {
      this.ngOnInit();
    });
  }

  getAllId(name: string) {
    this.serviceCategorie.getIdByName(name).subscribe(res => {
      this.AllId = res;
      this.data = [];

      // Utiliser from et mergeMap pour récupérer tous les résultats en parallèle
      from(this.AllId).pipe(
        mergeMap(id => this.servicePhoto.getAllByCategorieId(id)),
        toArray()
      ).subscribe(allResults => {
        // Aplatir les sous-tableaux dans allResults
        this.data = allResults.flat();
        console.log("Tous les résultats récupérés : ", this.data);
      });
    });
  }

  getPhoto(){
    this.servicePhoto.getAll().subscribe(res => {
      console.log(res)
      this.images = res;
    });
  }

  // get filteredImages() {
  //   return this.images.filter((image: any) => this.AllId.includes(image.categorieId));
  // }


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
  }


}
