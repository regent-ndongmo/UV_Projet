import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interface/api-response';
import { Login } from 'src/app/model/login';
import { Register } from 'src/app/model/register';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;


  private componentState: BehaviorSubject<boolean>;
  currentState ;

  constructor(private httpClient: HttpClient, private router: Router) {
    const savedState = localStorage.getItem('componentState');
    this.componentState = new BehaviorSubject<boolean>(savedState === 'true');
    this.currentState = this.componentState.asObservable();
  }

  changeState(state: boolean) {
    localStorage.setItem('componentState', state.toString());
    this.componentState.next(state);
  }


  private buttonClicked = new BehaviorSubject<boolean>(false);
  buttonClicked$ = this.buttonClicked.asObservable();

  clickButton(): void {
    this.buttonClicked.next(true);
  }

  login(data: Login): Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(`${this.apiUrl}/login`, data);
  }

  register(data: Register) {
    return this.httpClient.post(`${this.apiUrl}/register`, data);
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  // Méthode pour obtenir le rôle de l'utilisateur
  getRole(): string{
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : "client";
  }

  // Méthode pour se déconnecter
  logout() {
    if(confirm("Voulez vous vous deconnecter de tout vos compte ? ")){
      this.changeState(false);
      localStorage.removeItem('user');
      // localStorage.removeItem('user_id');
      localStorage.removeItem("headerVisible");
      localStorage.removeItem('categorie_id')
      this.router.navigate(['/dashboard'])
    }

  }

  //Profile
  registerProfile(data : any){
    return this.httpClient.post(`${this.apiUrl}/registerPhotographe`, data);
  }
}
