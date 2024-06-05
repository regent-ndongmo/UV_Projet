import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Photographe } from 'src/app/model/photographe/photographe';

@Injectable({
  providedIn: 'root'
})
export class PhotographeService{

  constructor(private httpClient: HttpClient) { }

  getData(){
    return this.httpClient.get("http://127.0.0.1:8000/api/Photographe");
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
    return this.httpClient.post("http://127.0.0.1:8000/api/Photographe", formData);
  }

  //Supprimer les donnees
  deleteData(id: Photographe){
    return this.httpClient.delete('http://127.0.0.1:8000/api/photographe/'+id);

  }

  uploadImage(id: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', image);
    return this.httpClient.put('http://127.0.0.1:8000/api/photographe/'+id, formData);
  }

  //Recuperer un employe en utilisant specifique en utilisant l'id
  getPhotographeById(id: Photographe){
    return this.httpClient.get<Photographe>('http://127.0.0.1:8000/api/photographe/'+id);

  }

  //Modifier l'Photographe selectionne (updatePhotographe)
  changeProfile(id: Photographe, data: any) {
    return this.httpClient.patch(`http://127.0.0.1:8000/api/photographe/${id}`, data);
  }

  // registerPhotographe(data: any){
  //   return this.httpClient.post('http://127.0.0.1:8000/api/register', data)
  // }
}
