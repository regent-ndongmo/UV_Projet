import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInfo } from 'src/app/model/contrat/EventInfo/event-info';
import { PaymentInfo } from 'src/app/model/contrat/paymentInfo/payment-info';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private apiUrl = `${environment.apiUrl}`;
  constructor(private httpClient: HttpClient) { }

  insertDataContrat(data: PaymentInfo){
    return this.httpClient.post(`${this.apiUrl}/contrats`, data);
  }
  insertDataEvent(data: EventInfo){
    return this.httpClient.post(`${this.apiUrl}/rendez-vous`, data)
  }

  getDataContrat(){}


  getDataContratByPhotographe(id: any){

    return this.httpClient.get(`${this.apiUrl}/contratsPhotographe/${id}`)

  }

  getDataRendezVousByPhotographe(id: any){

    return this.httpClient.get(`${this.apiUrl}/rendez-vousByPhotographe/${id}`)

  }
}
