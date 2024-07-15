import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photographe } from 'src/app/model/photographe/photographe';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PhotographeService{

  private apiUrl = `${environment.apiUrl}/photographe`;
  private apiCommentaire = `${environment.apiUrl}/commentaires`;
  private apiMessage = `${environment.apiUrl}/messages`;


  constructor(private httpClient: HttpClient) { }

  getData(){
    return this.httpClient.get(`${this.apiUrl}`);
  }

  private imageSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
  currentImage = this.imageSource.asObservable();

  changeImage(image: string | ArrayBuffer | null) {
    this.imageSource.next(image);
  }

  //insertion des donnees dans la Base de donnee
  insertData(photographe: Photographe): Observable<any> {
    const formData = new FormData();
    (Object.keys(photographe) as (keyof Photographe)[]).forEach(key => {
      if (key === 'photo' && photographe[key] instanceof File) {
        formData.append(key, photographe[key]);
      } else {
        formData.append(key, String(photographe[key]));
      }
    });
    return this.httpClient.post(`${this.apiUrl}`, formData);
  }

  //Supprimer les donnees
  deleteData(id: Photographe){
    return this.httpClient.delete(`${this.apiUrl}/${id}`);

  }

  //Recuperer un employe en utilisant specifique en utilisant l'id
  getPhotographeById(id: Photographe){
    return this.httpClient.get<Photographe>(`${this.apiUrl}/${id}`);

  }

  //Modifier l'Photographe selectionne (updatePhotographe)
  changeProfile(id: Photographe, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.httpClient.post<any>(`${this.apiUrl}/${id}`, data, { headers });
  }

  EnvoyerCommentaire(data: any){
    return this.httpClient.post(`${this.apiCommentaire}`, data);
  }
  getCommentByPhotographe(id : any){
    return this.httpClient.get<any>(`${this.apiCommentaire}/photographer/${id}`);
  }

  EnvoyerMessage(data: any){
    return this.httpClient.post<any>(`${this.apiMessage}`, data);
  }

  getMessageByPhotograhe(id: any){
    return this.httpClient.get<any>(`${this.apiMessage}/${id}`);
  }

}
