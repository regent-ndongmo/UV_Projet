import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Categorie } from 'src/app/model/Categorie/categorie';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = `${environment.apiUrl}/categories`;

  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }

  constructor(private httpClient: HttpClient) { }

  private reloadSubject = new Subject<void>();



  create(data: Categorie) : Observable<any>{
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.httpClient.post<any>(`${this.apiUrl}`, data, { headers });
  }

  getAll(){
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }

  getCategoriePhotographe(id: Categorie){
    return this.httpClient.get<any>(`${this.apiUrl}/photographes/${id}`);
  }

  Delete(id: Categorie){
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }


}
