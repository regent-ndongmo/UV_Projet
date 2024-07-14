import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value)
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
        (response: any) => {
          this.message = 'Le code de reinitiallisation a ete envoye sur votre address email';
          this.error = '';
          this.router.navigate(['/reset_password']);
        },
        (error: any) => {
          this.error = 'Erreur veuillez renseigner l\'email associer a votre compte';
          this.message = '';
        }
      );
    }
  }
}
