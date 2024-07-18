import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';

class Client {
  name: any;
  email_client: any;
  password_client: any
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterClientComponent implements OnInit {

  client = new Client()

  isVisible = false;
  imgURL: any;
  email_client: any
  client_id: any;
  visible: boolean = true
  errorMessage: string = '';

  constructor(private service: ClientService, private router: Router){}

  ngOnInit(): void {
    this.client_id = localStorage.getItem('client_id');
    this.email_client = localStorage.getItem('client_email');

  }
  onSubmit(): void {
    // this.visible = true
    console.log(this.email_client);

      console.log('Form Data:', this.client)

      this.service.register(this.client).subscribe(res=> {
        console.log(res)
        
        this.router.navigate(['/dashboard'])
        this.ngOnInit()

      },
      (error: any) => {
        console.log('Error:', error.message);
        this.errorMessage = error.error.message;
      })
      // Envoyer les données du formulaire au serveur
    }
}
