import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Cprofile } from 'src/app/model/photographe/cprofile';
import { Router, RouterModule } from '@angular/router';

class Code{
  verification_code: any;
}
@Component({
  selector: 'app-verification-code',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.scss'
})
export class VerificationCodeComponent {

  code = new Code()
  errors = new Code()

  verificationForm: FormGroup;

  constructor(private fb: FormBuilder, private service1: AuthService, private service: AuthService, private router: Router) {
    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      const code = this.verificationForm.get('code')?.value;
      console.log('Verification code entered:', code);
      this.code.verification_code= code
      this.service1.verify(this.code).subscribe(res => {
        console.log("Verification avec succes.")
        // if(res.me)
        this.changeProfile();
        this.router.navigate(['/login'])
      }),
      ((err: any) =>{
        this.errors = err.error.errors;

      });

      // Add your verification logic here
    }
  }


  //

  // @Input() user_id: number | undefined;





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
    this.photographe.user_id = localStorage.getItem("user_id")
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
    console.log(this.photographe.user_id);
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
