import { Cprofile } from './../../model/photographe/cprofile';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Register } from './../../model/register';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  radioForm: FormGroup;
  submitted = false;
  checkboxSelected = false;

  errors = new Register
  register = new Register

  @Input() user_id: number | undefined;

  constructor(private service: AuthService, private router: Router, private fb: FormBuilder){
    this.radioForm = this.fb.group({
      option: ['', Validators.required]
    });
  }
  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkboxSelected = true;
    } else {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      this.checkboxSelected = Array.from(checkboxes).some(checkbox => (checkbox as HTMLInputElement).checked);
    }
  }
  onSubmit(){
    this.submitted = true;
    console.log(this.register)
    console.log(this.user_id);

    if (this.checkboxSelected) {
      console.log('Selected option:', this.radioForm.value.option);
      this.service.register(this.register).subscribe((res: any) => {
        console.log(res);
        this.user_id = res.id;
        this.photographe.user_id = this.user_id;
        // this.changeProfile();

        localStorage.setItem('email', res.email);
        // localStorage.setItem('user_id', res.id);
        this.router.navigate(['/verified_code']);

      },
      (err)=>{
        this.errors = err.error.errors;

      });

    } else {
      alert("Veuillez accepter les termes et contition d'utilisation du site avant de soumettre.");
    }

  };





  //Creation du profil Photographe
  photographe = new Cprofile();
  defaultImageUrl: string = 'assets/account.png';
  @ViewChild('fileInput') fileInput!: ElementRef;

  file: File | null = null;
  imgURL: any;
  message: string = '';

  id: any;
  data: any;
  public imgPath: any;

  ngOnInit(): void {
    this.imgURL = this.defaultImageUrl;
    this.photographe.photo = this.defaultImageUrl;
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
    console.log(this.photographe);

    const formData = new FormData();

    if (this.file) {
      formData.append('photo', this.file, this.file.name);  // Use 'photo' instead of 'file'
    } else {
      formData.append('photo', new Blob(), '');  // Empty file to indicate no file selected
    }
    formData.append('user_id', this.photographe.user_id);
    formData.append('nom', this.photographe.nom);
    formData.append('ville', this.photographe.ville);
    formData.append('pays', this.photographe.pays);
    formData.append('numero', this.photographe.numero);
    formData.append('signature', this.photographe.signature);
    formData.append('description', this.photographe.description);

    this.service.registerProfile(formData).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}
