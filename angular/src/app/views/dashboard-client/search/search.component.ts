import { CommonModule } from '@angular/common';
import { SearchService } from './service/search.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

  constructor(
    private service: SearchService,
    private router: Router

  ){}

  query: string = '';
  results: any;

  ngOnInit(): void {
      this.query = this.service.getValue()

      this.onSearch(this.query)
  }

  onSearch(query: any) {
    console.log("La valeur recherche est", query)
      this.service.globalSearch(query).subscribe(data => {
        console.log("La data de recherche est", data)
        this.results = data;
        this.results.photographes.forEach((item : any) => {
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
