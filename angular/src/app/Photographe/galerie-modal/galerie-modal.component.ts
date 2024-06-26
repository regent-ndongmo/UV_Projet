import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galerie-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galerie-modal.component.html',
  styleUrl: './galerie-modal.component.scss'
})
export class GalerieModalComponent implements OnInit {

  isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.isVisible = true;
    console.log("regent openModal")
  }

  closeModal() {
    this.isVisible = false;
  }

}
