import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Register } from './../../model/register';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errors = new Register
  register = new Register

  constructor(private service: AuthService, private router: Router){
  }
  onSubmit(){
    console.log(this.register)

    this.service.register(this.register).subscribe(res => {
      console.log(res);

      //Redirect to Dashbord
      this.router.navigate(['/login'])
    },
    (err)=>{
      this.errors = err.error.errors;

    });
  };

}
