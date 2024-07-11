import { Component, OnInit } from '@angular/core';
import { GestionPhotographeService } from '../service/gestion-photographe.service';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { CommonModule } from '@angular/common';

class Photo {
  userId: any
  newRole: any
}
@Component({
  selector: 'app-liste-photographe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './liste-photographe.component.html',
  styleUrl: './liste-photographe.component.scss'
})
export class ListePhotographeComponent implements OnInit{

  data : any;
  imgURL: any;
  photo = new Photo()
  selectedRole: string = '';

  constructor(private servicePhotographe: GestionPhotographeService){}

  ngOnInit(){
    this.getPhotographe();
  }

  getPhotographe(){
    this.servicePhotographe.getAllUser().subscribe(res => {
      console.log(res);
      this.data = res;
      this.data.forEach((item : any) => {
        if (item.photo) {
          // alert("ndjndjn"+ item.photo)
          item.imgURL = `${environment.baseUrl}/${item.photo}`;
        }
      });
    });
  }

  onRoleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRole = selectElement.options[selectElement.selectedIndex].text;
    this.photo.newRole = selectElement.options[selectElement.selectedIndex].text;
    console.log(this.selectedRole);
  }

  Appliquer(id: any, role: any){
    this.photo.userId = id
    this.photo.newRole = role
    console.log(this.photo)

    if(confirm("Voulez vous modifier le role de cet utilisateur ? ")){
      this.servicePhotographe.modifyRole(this.photo).subscribe(res=>{
        console.log(res)
        alert("Role applique avec succes")
      })
    }
  }

}
