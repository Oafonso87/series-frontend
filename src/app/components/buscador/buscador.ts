/* import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador',
  imports: [],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {

} */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ¡Importante para el buscador!
import { SerieService } from '../../services/serie';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class Buscador {
  searchTerm: string = '';
  results: any[] = [];

  constructor(private serieService: SerieService) {}

  search() {
    if (this.searchTerm.trim()) {
      this.serieService.searchSeries(this.searchTerm).subscribe(data => {
        this.results = data;
      });
    }
  }

  addSerie(tvmazeId: number) {
    this.serieService.saveSerie(tvmazeId).subscribe(response => {
      alert('¡Serie añadida con éxito!');
      // Opcional: limpiar resultados o redirigir
    });
  }
}
