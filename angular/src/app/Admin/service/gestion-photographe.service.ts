import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GestionPhotographeService {

  private apiUrl = `${environment.apiUrl}/photographes`;

  constructor(private httpClient: HttpClient) { }

  getAllUser(){
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }
}
