import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-galerie-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './galerie-modal.component.html',
  styleUrl: './galerie-modal.component.scss'
})
export class GalerieModalComponent implements OnInit {

  // isVisible: boolean = false;
  @Input() title!: string;
  @Output() closed = new EventEmitter<void>();

  isVisible = false;

  // openModal() {
  //   this.isVisible = true;
  // }

  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.isVisible = true;
    console.log("regent openModal")
  }

  // closeModal() {
  //   this.isVisible = false;
  // }

}
