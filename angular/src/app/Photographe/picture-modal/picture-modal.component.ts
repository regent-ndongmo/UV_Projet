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

  // openModal() {
  //   this.isVisible = true;
  // }

  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }

  constructor(private imageService: ImageService, private service1: CategorieService) { }

  ngOnInit() {
    this.images=this.imageService.getAll()

    this.photographe_id = localStorage.getItem("user_id")
    this.image.photographer_id = this.photographe_id;
    console.log("l'id du photographe est : ", this.photographe_id)

    this.getDataCategorie();
  }

  selectFiles(event:any):void{
    this.selectedFiles=event.target.files
    if(this.selectedFiles){
      this.image.url=this.selectedFiles[0]
      this.imgURL = this.image.url

    }
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
    console.log(this.selectedFiles);

    console.log("url",this.image.url);

  }

  upload(file:File):void{
    if(file){
      this.imageService.upload(file,this.image).subscribe({
        next:(event:any)=>{
          if(event instanceof HttpResponse){
            this.images=this.imageService.getAll()
            console.log("post succesful");
            console.log(this.image);


          }
        },error(err:any){
          console.error(err);

        }
      })
    }
  }


  publier(){
    if(this.selectedFiles){
      for(let i=0;i<this.selectedFiles.length; i++){
        this.upload(this.selectedFiles[i])
      }
      this.selectedFiles=undefined
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
    this.photo.category_id = id;
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


}
