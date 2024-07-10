import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { GestionPhotographeService } from 'src/app/Admin/service/gestion-photographe.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photographe-list',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './photographe-list.component.html',
  styleUrl: './photographe-list.component.scss'
})
export class PhotographeListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 8
  data : any;
  imgURL: any;
  selectedRole: string = '';

  constructor(private servicePhotographe: GestionPhotographeService, private router: Router){}

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

  goToProfile(id: any){
    console.log("l'id est : ", id);
    this.router.navigate(["/info-photographe", id])

  }

}
