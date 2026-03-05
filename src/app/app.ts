import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SeriesList } from './components/series-list/series-list';
import { Buscador } from './components/buscador/buscador';
import { Login } from './components/login/login';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SeriesList, Buscador, Login, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('series-frontend');
  view: string = 'list';
  isAuthenticated: boolean = false;

  constructor(private authService: Auth) {}

  ngOnInit() {
    // Al abrir la app, comprobamos si ya hay un token guardado
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  onLoginSuccess() {
    this.isAuthenticated = true;
    this.view = 'list'; // Redirigir al listado al entrar
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}