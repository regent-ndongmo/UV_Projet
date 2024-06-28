import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/model/photographe/photo';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = `${environment.SpringURL}`;

  constructor(private http: HttpClient) { }

  upload(data: any): Observable<any> {

    // console.log("regent service")
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post(`${this.apiUrl}`, data, { headers });
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }

  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.apiUrl+"/count");
  }

  rechercherImages(title: string, description: string): Observable<any> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    if (description) {
      params = params.set('description', description);
    }
    return this.http.get(`${this.apiUrl}/recherche`, { params: params });
  }
}
