import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContratService } from './service/contrat.service';

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.scss'
})
export class RendezVousComponent implements OnInit {

  photographe_id = localStorage.getItem('user_id')
  data : any

  constructor(private service: ContratService){}


  ngOnInit(): void {
      // console.log("bonsoir", this.photographe_id)
      this.getData()
  }

  getData(){
    this.service.getDataRendezVousByPhotographe(this.photographe_id).subscribe(res=>{
      console.log(res)
      this.data = res;
    })
  }

}
