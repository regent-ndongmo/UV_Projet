import { environment } from './../../../environments/environment.development';
import { PhotographeService } from './../service/photographe.service';
import { Photographe } from './../../model/photographe/photographe';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  photographe = new Photographe()


  @ViewChild('fileInput') fileInput!: ElementRef;

  userFile: File | null = null;
  imgURL: any;
  message: string = '';


  id: any;
  data:any;
  public imgPath: any;

  file: File | null = null;

  defaultImageUrl: string = 'assets/account.png';

  constructor(private route: ActivatedRoute, private service: PhotographeService) {
    // this.photographe.user_id = 3;
  }

    ngOnInit(): void {
      // Any initialization logic can go here
      this.id = localStorage.getItem('user_id');
      console.log(this.id);
      this.getData();
      this.photographe.user_id = +this.id
    }

  getData() {
    this.service.getPhotographeById(this.id).subscribe(res => {
        this.data = res;
        this.photographe = this.data;

        // Construire l'URL de l'image
        if (this.photographe.photo) {
            // Utiliser une URL relative en supposant que les images sont dans le dossier 'assets'
            this.imgURL = `${environment.baseUrl}/${this.photographe.photo}`;

            // this.imgURL = 'assets/account.png';
            console.log('la photo du photographe est : ', this.photographe.photo)
        } else {
            this.imgURL = 'assets/account.png'; // Chemin de l'image par défaut
        }
    });
  }

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

  changeProfile(): void {
    console.log(this.file);
    console.log(this.file?.name);
    console.log('Données du formulaire :');

    const formData = new FormData();

    if (this.file) {
      formData.append('photo', this.file, this.file.name);  // Use 'photo' instead of 'file'
    } else {
      formData.append('photo', new Blob(), '');  // Empty file to indicate no file selected
    }
    formData.append('user_id', this.photographe.user_id.toString());
    formData.append('nom', this.photographe.nom);
    formData.append('ville', this.photographe.ville);
    formData.append('pays', this.photographe.pays);
    formData.append('numero', this.photographe.numero);
    formData.append('signature', this.photographe.signature);
    formData.append('description', this.photographe.description);

    console.log("Les data se presente comme suit", formData)
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.service.changeProfile(formData).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}
