import { BarCodeComponent } from './../../layout/bar-code/bar-code.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [BarCodeComponent],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent {

}
