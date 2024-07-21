import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';
import { DashboardClientComponent } from '../dashboard-client.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../search/service/search.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, DashboardClientComponent, FormsModule, SearchComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  // @ViewChild(SearchComponent) search!: SearchComponent;

  inputSearch = ''
  categories : any;
  uniqueCategories: any

  constructor(
    private router: Router,
    private serviceCategorie: CategorieService,
    private serviceSearch: SearchService

  ){}

  ngOnInit(): void {

    this.inputSearch = ''
    this.getDataCategorie()
    // this.getDataPhoto()

  }
  onSubmit(){

    this.serviceSearch.setValue(this.inputSearch)
    console.log(this.inputSearch);

    // this.search.onSearch(this.inputSearch);
    this.router.navigate(['/search'])

  }

  getDataCategorie() {
    this.serviceCategorie.getAll().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  openCategorie(name: string){
    console.log(name)
    this.router.navigate(['/categorieN/', name])
    // triggerInit();
    this.serviceCategorie.triggerInit()

  }

}
