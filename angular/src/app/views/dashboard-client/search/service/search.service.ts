import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private value: any;

  getValue(){
    return this.value;

  }
  setValue(value: any){
    this.value = value;
  }

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/search`;

  globalSearch(value: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?query=${value}`);
  }
}
