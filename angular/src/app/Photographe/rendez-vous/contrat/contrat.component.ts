import { EventInfo } from './../../../model/contrat/EventInfo/event-info';
import { ContratService } from './../service/contrat.service';
import { PaymentInfo } from './../../../model/contrat/paymentInfo/payment-info';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contrat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contrat.component.html',
  styleUrl: './contrat.component.scss'
})
export class ContratComponent implements OnInit {

  paymentInfo = new PaymentInfo();
  data : any;
  dataPhotographe : any;
  photographe_id = localStorage.getItem('user_id');
  isVisible: boolean = true;

  constructor(private service: ContratService, private router: Router){}

  ngOnInit(): void {
    this.getData()
    this.eventInfo.photographe_id = localStorage.getItem('user_id');
    this.paymentInfo.photographe_id = localStorage.getItem('user_id');
  }

  getData(){
    this.service.getDataContratByPhotographe(this.photographe_id).subscribe( res => {
      this.dataPhotographe=res;
      console.log(res)
    });
  }

  createContrat(form: NgForm) {
    console.log(this.paymentInfo);
    if (form.valid){
      if(confirm("Voulez vous enregistrer ce contrat ? ")){
        this.service.insertDataContrat(this.paymentInfo).subscribe(res => {
          console.log(res)
          this.data = res
          // localStorage.setItem("contrat_id", JSON.stringify(this.data.id))
          console.log("L'id de ce contrat est :", this.data.id)
          this.isVisible=false;
          this.getData()

        })
      }
    }else {
      // Le formulaire n'est pas valide, affichez un message d'erreur
      alert('Veuillez remplir tous les champs obligatoires.');
    }

  }

  rendez_vous(){
    this.isVisible = false
  }
  BackTo(){
    this.isVisible = true;
  }

  eventInfo = new EventInfo();

  Rendez_vous(form1: NgForm){
    console.log(this.eventInfo);
    if (form1.valid){
      if(confirm("Voulez vous enregistrer ce rendez-vous ?")){
        this.service.insertDataEvent(this.eventInfo).subscribe(res => {
          console.log(res)
          this.router.navigate(["/rendez-vous"])

        })
      }
    }else {
      // Le formulaire n'est pas valide, affichez un message d'erreur
      alert('Veuillez remplir tous les champs obligatoires.');
    }

  }

}
