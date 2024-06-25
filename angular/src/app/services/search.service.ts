import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:8000/api'; // Adjust the base URL accordingly

  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, { params: { query } });
  }

  autocomplete(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/autocomplete`, { params: { query } });
  }
}