import { FormsModule } from '@angular/forms';
import { GalerieModalComponent } from './../galerie-modal/galerie-modal.component';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [GalerieModalComponent, FormsModule],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.scss'
})
export class GalerieComponent {

  @ViewChild(GalerieModalComponent) formModal!: GalerieModalComponent;

  openModal() {
    this.formModal.openModal();
  }



  onModalClosed() {
    console.log('La modale a été fermée');
  }

  //

  constructor(private route: Router){}

  categorie: string= 'regent';

  openCategorie(){
    localStorage.setItem("categorie_id", JSON.stringify(10));
    this.route.navigate(['/categorie'])

  }


}
