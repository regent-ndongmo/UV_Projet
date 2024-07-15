import { logo } from './../../icons/logo';
import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { DocsCalloutComponent } from '@docs-components/public-api';
import { CommonModule } from '@angular/common';
import { PhotographeService } from 'src/app/Photographe/service/photographe.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ChartsComponent implements OnInit{

  constructor(private service: PhotographeService){}
  items : any

  ngOnInit(): void {
      this.getMessage()
  }

  getMessage(){
    let id = localStorage.getItem("user_id")
    this.service.getMessageByPhotograhe(id).subscribe(res =>{
      console.log(res)
      this.items = res
    })
  }

}
