import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interface/api-response';
import { Login } from 'src/app/model/login';
import { Register } from 'src/app/model/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private httpClient: HttpClient, private router: Router) {}


  login(data: Login): Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>('http://127.0.0.1:8000/api/login', data);
  }

  register(data: Register) {
    return this.httpClient.post('http://127.0.0.1:8000/api/register', data);
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  // Méthode pour obtenir le rôle de l'utilisateur
  getRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/dasboard']);
  }
}
