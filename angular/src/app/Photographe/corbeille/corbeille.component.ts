import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image/image.service';

@Component({
  selector: 'app-corbeille',
  standalone: true,
  imports: [],
  templateUrl: './corbeille.component.html',
  styleUrl: './corbeille.component.scss'
})
export class CorbeilleComponent implements OnInit {
  data: any;

  constructor(private service1 : ImageService){}

  ngOnInit(): void {
    console.log("regenet")
      this.getData()
  }
  getData(){
    this.service1.getFilesTrashed().subscribe(res=>{
      console.log("l'ensemble des photo existante pour ce photographe sont: ",res)
      this.data=res;
      
    })
  }

  updateImage(id: any){

  }

  deleteImage(id: any){

  }

}
