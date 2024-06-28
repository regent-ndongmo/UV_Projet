import { CategorieService } from './../service/Categorie/categorie.service';
import { Categorie } from './../../model/Categorie/categorie';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GalerieComponent } from '../galerie/galerie.component';


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

  // @ViewChild(GalerieComponent) galerieCompo!: GalerieComponent;

  isVisible = false;

  categorie = new Categorie();

  errors=new Categorie

  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }

  constructor(private  service: CategorieService, private route: Router) { }

  ngOnInit() {
    this.categorie.photographe_id = localStorage.getItem("user_id")
  }

  openModal() {
    this.isVisible = true;
    console.log("regent openModal")
  }

  Valider(){
    console.log(this.categorie)
    this.service.create(this.categorie).subscribe(res => {
      console.log(res);

      this.categorie.categorie = '';
      this.service.triggerRefresh();  // Trigger the refresh
      this.closeModal();

    },
    (error: any) => {
      console.error('Error:', error);
    });

  }

}
