import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Photo } from 'src/app/model/photographe/photo';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = `${environment.SpringURL}`;

  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }

  constructor(private http: HttpClient) { }

  upload(data: any): Observable<any> {

    return this.http.post(this.apiUrl, data);
  }

  incrementLikes(id: number): Observable<Photo> {
    return this.http.patch<Photo>(`${this.apiUrl}/${id}/like`, {});
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAll():Observable<void[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  getAllBYid(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }



  // photos non suprimmées d'une categorie
  getAllByPhotographeId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/photographe/"+id);
  }

  // photos non suprimmées d'un photographe
  getAllByCategorieId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/categorie/"+id);
  }

  // photos non suprimmées
  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //photos suprimmées
  getFilesTrashed(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"?isDeleted=true");
  }

  //nombre de photo
  count(): Observable<number> {
    return this.http.get<number>(this.apiUrl+"/count");
  }
}


