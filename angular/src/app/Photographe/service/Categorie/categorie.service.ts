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

  private categorieSource = new BehaviorSubject<Categorie | null>(null);
  categorieCreated$ = this.categorieSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  private reloadSubject = new Subject<void>();

  reload$ = this.reloadSubject.asObservable();

  triggerReload() {
    this.reloadSubject.next();
  }

  createCategorie(categorie: Categorie) {
    this.categorieSource.next(categorie);
  }

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


}
