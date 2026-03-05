import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // La URL de tu Laravel

  constructor(private http: HttpClient) { }

  // Método para buscar en TVMaze a través de Laravel
  searchSeries(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }

  // Método para guardar una serie en Supabase
  saveSerie(tvmazeId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/series`, { tvmaze_id: tvmazeId });
  }
}