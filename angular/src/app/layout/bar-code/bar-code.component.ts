import { Component, Input } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-bar-code',
  standalone: true,
  imports: [],
  templateUrl: './bar-code.component.html',
  styleUrl: './bar-code.component.scss'
})
export class BarCodeComponent {
  @Input() websiteUrl: string = 'https://www.votresite.com';

  ngAfterViewInit() {
    this.generateBarcode();
  }

  generateBarcode() {
    JsBarcode('#barcode', this.websiteUrl, {
      format: 'CODE128',
      displayValue: true,
      fontSize: 18,
      width: 2,
      height: 100
    });
  }

}
