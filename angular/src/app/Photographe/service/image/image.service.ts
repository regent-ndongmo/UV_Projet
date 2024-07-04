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

  upload(file: File, image: Photo): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', image.title);
    formData.append('description', image.description);
    formData.append('category_id', image.category_id);
    formData.append('price', image.price);
    formData.append('phototographer_id', image.photographer_id);
    console.log("formdata",formData)

    return this.http.post(this.apiUrl, formData);
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
}
