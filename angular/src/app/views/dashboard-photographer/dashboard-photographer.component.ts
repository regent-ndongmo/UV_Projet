import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/Auth/service/auth.service';

@Component({
  selector: 'app-dashboard-photographer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-photographer.component.html',
  styleUrl: './dashboard-photographer.component.scss'
})
export class DashboardPhotographerComponent implements OnInit{

  constructor(private service: AuthService, private router: Router){}

  isAuthenticated: boolean = true;
  ngOnInit(): void {
    
    this.isAuthenticated = this.service.isAuthenticated();
  }

  // Méthode pour se déconnecter
  logout() {
    this.service.logout();
    this.service.changeState(false);
  }

  role = this.service.getRole()
}
