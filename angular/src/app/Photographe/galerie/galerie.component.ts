import { FormsModule } from '@angular/forms';
import { GalerieModalComponent } from './../galerie-modal/galerie-modal.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [GalerieModalComponent, FormsModule],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.scss'
})
export class GalerieComponent {

  @ViewChild(GalerieModalComponent) formModal!: GalerieModalComponent;
  private modalComponent!: GalerieModalComponent;

  openModal() {
    this.formModal.openModal();
  }



  onModalClosed() {
    console.log('La modale a été fermée');
  }

}
