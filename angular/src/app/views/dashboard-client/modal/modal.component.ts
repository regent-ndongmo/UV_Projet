import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective } from '@coreui/angular';
import { ImageService } from 'src/app/Photographe/service/image/image.service';
import { PhotographeService } from 'src/app/Photographe/service/photographe.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{

  // isVisible: boolean = false;
  // @Input() title!: string;
  @Output() closed = new EventEmitter<void>();

  dataDemo: any;
  isVisible = false;
  photographe: any

  constructor(private servicePhoto: ImageService, private router: Router, private servicePhotographe: PhotographeService){}

  ngOnInit(): void {

  }

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

      this.getDataPhotographe(this.dataDemo.photographeId)

    })
  }

  getDataPhotographe(id: any){
    this.servicePhotographe.getPhotographeById(id).subscribe(res=>{
      console.log("Photographe", res)
      this.photographe = res
    })
  }
  goToProfile(id: any){
    console.log("l'id est : ", id);
    this.router.navigate(["/info-photographe", id])

  }


}
