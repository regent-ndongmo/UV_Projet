import { Component, OnInit } from '@angular/core';
import { GestionPhotographeService } from '../service/gestion-photographe.service';

@Component({
  selector: 'app-liste-photographe',
  standalone: true,
  imports: [],
  templateUrl: './liste-photographe.component.html',
  styleUrl: './liste-photographe.component.scss'
})
export class ListePhotographeComponent implements OnInit{

  data : any;

  constructor(private servicePhotographe: GestionPhotographeService){}

  ngOnInit(){
    this.getPhotographe();
  }

  getPhotographe(){
    this.servicePhotographe.getAllUser().subscribe(res=>{
      console.log(res)
      this.data = res;
    })
  }

}
