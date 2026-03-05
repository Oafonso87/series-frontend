
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() loginSuccess = new EventEmitter<void>(); // Avisaremos a la App cuando entremos
  
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private auth: Auth) {}

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: () => {
        this.loginSuccess.emit(); // ¡Bingo! Hemos entrado
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        console.error(err);
      }
    });
  }
}