import { CommonModule } from '@angular/common';
import { SearchService } from './service/search.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
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
    if(query){
      console.log("La valeur recherche est", query)
      this.service.globalSearch(query).subscribe(data => {
        console.log("La data de recherche est", data)
        this.results = data;
      });
    }
    else{
      this.router.navigate(['/404'])
    }

  }

}
