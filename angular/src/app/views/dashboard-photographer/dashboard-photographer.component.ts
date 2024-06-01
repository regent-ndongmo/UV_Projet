import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/Auth/service/auth.service';

@Component({
  selector: 'app-dashboard-photographer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-photographer.component.html',
  styleUrl: './dashboard-photographer.component.scss'
})
export class DashboardPhotographerComponent {

  constructor(private service: AuthService, private router: Router){}
  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/dasboard']);
  }

  role = this.service.getRole()
}
