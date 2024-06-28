import { PictureModalComponent } from './../../Photographe/picture-modal/picture-modal.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/Auth/service/auth.service';

@Component({
  selector: 'app-dashboard-photographer',
  standalone: true,
  imports: [RouterModule, PictureModalComponent],
  templateUrl: './dashboard-photographer.component.html',
  styleUrl: './dashboard-photographer.component.scss'
})
export class DashboardPhotographerComponent implements OnInit{

  @ViewChild(PictureModalComponent) pictureModal!: PictureModalComponent;

  constructor(private service: AuthService, private router: Router){}

  isAuthenticated: boolean = true;
  @Input() title!: string;
  isVisible = false;
  ngOnInit(): void {

    this.isAuthenticated = this.service.isAuthenticated();
  }

  openModalPicture(){
    this.pictureModal.openModal();
  }

  onModalClosed() {
    console.log('La modale a été fermée');
  }


  items = []

  // Méthode pour se déconnecter
  logout() {
    this.service.logout();
    // this.service.changeState(false);
  }

  role = this.service.getRole()
}
