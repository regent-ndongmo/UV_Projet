import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../components/upload-files/upload-files.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080/image';

  constructor(private http: HttpClient) { }

  // poster une photo
  upload(file: File, image: Image): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', image.title);
    formData.append('description', image.description);
    formData.append('category_id', image.category_id);
    formData.append('price',image.price)
    formData.append('phototographer_id', image.phototographer_id);
    console.log("formdata",formData)

    return this.http.post(this.baseUrl, formData);
  }

  incrementLikes(id: number): Observable<Image> {
    return this.http.patch<Image>(`${this.baseUrl}/${id}/like`, {});
  }

  // recuperer une image
  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'blob' });
  }

  //suprimmer une photo
  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // photos non suprimmées d'une categorie
  getAllByPhotographeId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/photographe"+id);
  }

  // photos non suprimmées d'un photographe
  getAllByCategorieId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/categorie"+id);
  }

  // photos non suprimmées
  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  //photos suprimmées
  getFilesTrashed(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"?isDeleted=true");
  }


  //nombre de photo
  count(): Observable<number> {
    return this.http.get<number>(this.baseUrl+"/count");
  }

  rechercherImages(title?: string, description?: string, likes?: number, photographerId?: number, categoryId?: number): Observable<any> {

      let params = new HttpParams();
      if (title) {
        params = params.append('title', title);
      }
      if (description) {
        params = params.append('description', description);
      }
      if (likes) {
        params = params.append('likes', likes);
      }
      if (photographerId) {
        params = params.append('likes', photographerId);
      }
      if (categoryId) {
        params = params.append('likes', categoryId);
      }


    return this.http.get(`${this.baseUrl}/search`, { params: params });
  }
}
