import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // private apiUrl = 'http://localhost:8000/api'; <-- Borra o comenta esta
  private apiUrl = 'https://series-api-d1vr.onrender.com/api'; // <-- Pon esta  

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Cuando Laravel nos da el token, lo guardamos en el navegador
        localStorage.setItem('auth_token', response.access_token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}