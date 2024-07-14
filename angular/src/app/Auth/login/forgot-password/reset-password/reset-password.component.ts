import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/service/auth.service';

class Code{
  reset_code: any;
}

class Reset{
  email: any;
  new_password: any;
  confirm_password: any
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  codeEntry : boolean = true
  reset = new Reset()
  code = new Code()
  errors = new Code()
  error = new Reset()

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
      this.code.reset_code= code

      this.service1.verifyResetCode(this.code).subscribe(res => {
        console.log("Verification avec succes.")
        this.codeEntry = false;
        //
      }),
      ((err: any) =>{
        this.errors = err.error.errors;

      });

      // Add your verification logic here
    }
  }

  Reset(){
    console.log(this.reset)
    this.service1.resetPassword(this.reset).subscribe(res=>{
      console.log("Bonjour")
      this.router.navigate(['/login'])
    })
  }

}
