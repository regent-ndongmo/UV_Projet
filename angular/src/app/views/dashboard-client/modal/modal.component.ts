import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective } from '@coreui/angular';
import { ImageService } from 'src/app/Photographe/service/image/image.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  // isVisible: boolean = false;
  // @Input() title!: string;
  @Output() closed = new EventEmitter<void>();

  dataDemo: any;
  isVisible = false;

  constructor(private servicePhoto: ImageService, private router: Router){}


  //Modal
  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }

  openModal( id: any) {
    console.log("l'id de la photo est : ", id)
    this.isVisible = true
    this.servicePhoto.getAllBYid(id).subscribe(res=>{
      console.log(res);
      this.dataDemo = res;

    })
  }
  goToProfile(id: any){
    console.log("l'id est : ", id);
    this.router.navigate(["/info-photographe", id])

  }


}
