import { ImageService } from './../service/image/image.service';
import { Photo } from './../../model/photographe/photo';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../service/Categorie/categorie.service';
import { Observable } from 'rxjs';
import { event } from 'jquery';
import { HttpResponse } from '@angular/common/http';

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


  image = new Photo()
  images?: Observable<any>
  selectedFiles?:FileList

  @ViewChild('fileInput') fileInput!: ElementRef;

  userFile: File | null = null;
  imgURL: any;
  message: string = '';


  // id: any;
  data:any;
  public imgPath: any;

  file: File | null = null;

  defaultImageUrl: string = 'assets/account.png';
  // photo = new Photo();

  // openModal() {
  //   this.isVisible = true;
  // }

  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }

  constructor(private service: ImageService, private service1: CategorieService) { }

  ngOnInit() {
    this.images=this.service.getAll()

    this.photographe_id = localStorage.getItem("user_id")
    this.image.photographer_id = this.photographe_id;
    console.log("l'id du photographe est : ", this.photographe_id)

    this.getDataCategorie();
  }

  selectFiles(event:any):void{
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


  publier(){
    console.log("les informations sur les photos sont : ", this.image)
    console.log(this.file);
    console.log(this.file?.name);
    console.log('Données du formulaire :');

    const formData = new FormData();

    if (this.file) {
      formData.append('file', this.file, this.file.name);  // Use 'photo' instead of 'file'
    } else {
      formData.append('file', new Blob(), '');  // Empty file to indicate no file selected
    }
    formData.append('price', this.image.price);
    formData.append('photographer_id', this.image.photographer_id);
    formData.append('title', this.image.title);
    formData.append('description', this.image.description);
    formData.append('category_id', this.image.category_id);


    console.log("Les data se presente comme suit", formData)
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    console.log("regent regent")

    if(confirm("voulez vouz vraiment publier cette photo ? ")){
      this.service.upload(formData).subscribe(res=>{
        this.service.triggerRefresh();
        this.isVisible = false;
        console.log("Photo upload avec succes ; ", res)
      })
    }
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
    this.image.category_id = id;
    console.log("La categorie selectionne pour cette photo a pour id : ", id)
  }



  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }


}
