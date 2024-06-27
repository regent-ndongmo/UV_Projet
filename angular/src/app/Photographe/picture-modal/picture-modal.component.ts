import { Photo } from './../../model/photographe/photo';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-picture-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './picture-modal.component.html',
  styleUrl: './picture-modal.component.scss'
})
export class PictureModalComponent {

  // isVisible: boolean = false;
  @Input() title!: string;
  @Output() closed = new EventEmitter<void>();

  isVisible = false;

  // openModal() {
  //   this.isVisible = true;
  // }

  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.isVisible = true;
    console.log("regent openModal")
  }

  // closeModal() {
  //   this.isVisible = false;
  // }


  @ViewChild('fileInput') fileInput!: ElementRef;

  userFile: File | null = null;
  imgURL: any;
  message: string = '';


  id: any;
  data:any;
  public imgPath: any;

  file: File | null = null;

  defaultImageUrl: string = 'assets/account.png';
  photo = new Photo();



  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onSelectFile(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;

      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported';
        return;
      }

      const reader = new FileReader();
      this.imgPath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;

      };
    } else {
      this.imgURL = this.defaultImageUrl;
      this.file = null;
    }
  }

  Publier(){
    console.log("les informations sur les photos sont : ", this.photo)
  }


}
