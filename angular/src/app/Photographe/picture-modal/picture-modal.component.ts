import { ImageService } from './../service/image/image.service';
import { Photo } from './../../model/photographe/photo';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../service/Categorie/categorie.service';

@Component({
  selector: 'app-picture-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './picture-modal.component.html',
  styleUrl: './picture-modal.component.scss'
})
export class PictureModalComponent implements OnInit {

  // isVisible: boolean = false;
  @Input() title!: string;
  @Output() closed = new EventEmitter<void>();

  isVisible = false;
  photographe_id : any;
  categories!: any[]

  // openModal() {
  //   this.isVisible = true;
  // }

  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }

  constructor(private service: ImageService, private service1: CategorieService) { }

  ngOnInit() {
    this.photo.user_id = localStorage.getItem("user_id")

    this.photographe_id = localStorage.getItem("user_id")


    this.getDataCategorie();
  }

  openModal() {
    this.isVisible = true;
    console.log("regent openModal")
  }

  getDataCategorie() {
    console.log("getDataCategorie");
    console.log(this.photographe_id);
    this.service1.getCategoriePhotographe(this.photographe_id).subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  categorieID(id: any){
    this.photo.categorie_id = id;
    console.log("La categorie selectionne pour cette photo a pour id : ", id)
  }


  @ViewChild('fileInput') fileInput!: ElementRef;

  userFile: File | null = null;
  imgURL: any;
  message: string = '';


  // id: any;
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
    console.log(this.file);
    console.log(this.file?.name);
    console.log('Données du formulaire :');

    const formData = new FormData();

    if (this.file) {
      formData.append('file', this.file, this.file.name);  // Use 'photo' instead of 'file'
    } else {
      formData.append('file', new Blob(), '');  // Empty file to indicate no file selected
    }
    formData.append('phototographer_id', this.photo.user_id.toString());
    formData.append('title', this.photo.titre);
    formData.append('description', this.photo.description);
    formData.append('categorie_id', this.photo.categorie_id.toString());


    console.log("Les data se presente comme suit", formData)
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    console.log("regent regent")

    this.service.upload(formData).subscribe(res=>{

    })
  }

}
