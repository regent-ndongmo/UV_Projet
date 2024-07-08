import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategorieService } from 'src/app/Photographe/service/Categorie/categorie.service';
import { ImageService } from 'src/app/Photographe/service/image/image.service';
import { DashboardClientComponent } from '../dashboard-client.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, DashboardClientComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {


  categories : any;
  uniqueCategories: any
  isVisible = true

  constructor(private router: Router,private serviceCategorie: CategorieService, private servicePhoto: ImageService){}

  ngOnInit(): void {

    this.getDataCategorie()
    // this.getDataPhoto()

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
