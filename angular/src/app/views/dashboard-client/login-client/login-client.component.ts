import { ChangeDetectorRef, Component } from '@angular/core';
import { ClientService } from '../service/client.service';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.scss'
})
export class LoginClientComponent {

  contactForm: FormGroup;
  email_client: any
  isVisible = false;
  imgURL: any;
  client_id: any;
  visible: boolean = true
  errorMessage: string = '';


  constructor(
    private service: ClientService,
    private serviceAuth: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder){

      this.contactForm = this.fb.group({
        // name: ['', Validators.required],
        password_client: ['', Validators.required],
        email_client: ['', [Validators.required, Validators.email]]
      });

  }

  ngOnInit(): void {
    this.email_client = localStorage.getItem('client_email');

  }

  openModall(){
    this.isVisible = true
  }

  closeModall(){
    this.isVisible = false
  }


  onSubmit(): void {
    console.log(this.email_client);

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form Data:', formData)

      this.service.loginClient(formData).subscribe(res => {
        console.log('Login successful', res);
        localStorage.setItem("client_name", res.name)
        // localStorage.setItem("client_email", res.email_client)
        localStorage.setItem("client_id", res.id)
        this.serviceAuth.changeEmail(true);
        this.serviceAuth.changeClient(res.email_client)
        this.isVisible =false
        this.ngOnInit()
        window.location.href = '/dashbord';
      },
      (error: any) => {
        console.log('Error:', error.message);
        this.errorMessage = error.error.message;
      })
      // this.service.register(formData).subscribe(res=> {


      // },
      // (error: any) => {
      //   console.log('Error:', error.message);
      //   this.errorMessage = error.error.message;
      // })
      // Envoyer les données du formulaire au serveur
    }
    else{
      alert("Vueillez remplir les information correcte")
    }
  }

  GoToRegister(){
    this.router.navigate(['/register-client'])
    this.isVisible = false
  }

}
