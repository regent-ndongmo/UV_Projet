import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}`;

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clients`, data);
  }
  getClient(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateClient(id: number, client: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/clients/${id}`, client);
  }

  loginClient(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clients/login`, credentials);
  }

  likePhoto(clientId: number, photoId: number) {
    return this.http.post(`${this.apiUrl}/likes`, { client_id: clientId, photo_id: photoId });
  }

  unlikePhoto(clientId: number, photoId: number) {
    return this.http.delete(`${this.apiUrl}/likes`, { body: { client_id: clientId, photo_id: photoId } });
  }

  getUserLikes(clientId: number) {
    return this.http.get(`${this.apiUrl}/clients/${clientId}/likes`);
  }
}
