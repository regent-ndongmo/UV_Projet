import { TruncatePipe } from './../../pipe/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { GalerieModalComponent } from './../galerie-modal/galerie-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategorieService } from '../service/Categorie/categorie.service';
import { Categorie } from 'src/app/model/Categorie/categorie';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [GalerieModalComponent, FormsModule, CommonModule, TruncatePipe],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.scss'
})
export class GalerieComponent implements OnInit{

  data: any;
  categories!: any[]

  @ViewChild(GalerieModalComponent) formModal!: GalerieModalComponent;

  openModal() {
    this.formModal.openModal();
  }



  onModalClosed() {
    console.log('La modale a été fermée');
  }

  //

  constructor(private route: Router, private service: CategorieService, private activatedRoute: ActivatedRoute){}
  categorie: string= 'regent';
  id: any;

  ngOnInit(){

    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.activatedRoute.snapshot.url.length > 0) {
        this.getDataP();
      }
    });

    this.id = localStorage.getItem("user_id")
    this.getDataP()

    this.service.refresh$.subscribe(() => {
      this.getDataP();
    });
  }

  openCategorie(id: any){
    localStorage.setItem("categorie_id", JSON.stringify(10));
    this.route.navigate(['/categorie', id])

  }

  getDataP() {
    console.log(this.id);
    this.service.getCategoriePhotographe(this.id).subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }


  delete(id: any){
    if (confirm('Voulez-vous vraiment supprimer cette photo ?')) {
      this.service.Delete(id).subscribe(res => {
        console.log(res);
        this.getDataP();
      },
      (error: any) => {
        console.error('Error:', error);
      });
    }
  }

  modifier(id: any){


  }

}
