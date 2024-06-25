import { ApiResponse } from './../../interface/api-response';
import { Login } from './../../model/login';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  login = new Login;
  showPassword: boolean = false;

  constructor(private service: AuthService, private router: Router, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {

  }

  onSubmit(){
    console.log("bonsoir")
    console.log(this.login);

    this.service.login(this.login).subscribe((res: ApiResponse)=>{
      // console.log(res);
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("user_id", JSON.stringify(res.id))
      console.log("Le role du photographe conncte est ", res.role);
      if(res.role == "photographe"){
        this.service.changeState(true);
        // this.service.refreshComponent('/photographe');
        // this.cdr.markForCheck();
        // console.log('rafraichissement fait sans probleme')
        // this.router.navigate(['/photographe'])

        // this.router.navigate(['/photographe']).then(() => {
        //   window.location.reload();
        // });
        window.location.href = '/photographe';
      }
      else{
        this.router.navigate(['/dashboard'])
        alert("Votre compte a ete bloque")
      }
    })
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('form2Example27') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}
