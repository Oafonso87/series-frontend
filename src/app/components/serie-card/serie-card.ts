import { Component, Input, Output, EventEmitter } from '@angular/core'; // Añadimos Output y EventEmitter
import { CommonModule } from '@angular/common';
import { SerieService } from '../../services/serie';

@Component({
  selector: 'app-serie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './serie-card.html',
  styleUrl: './serie-card.css'
})
// ... en la clase ...
export class SerieCard {
  @Input() serie: any;
  @Output() serieDeleted = new EventEmitter<number>(); // Para avisar al listado que borre la tarjeta

  isFlipped = false;

  constructor(private serieService: SerieService) {}

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  toggleSeason(event: Event, season: any) {
    event.stopPropagation();
    const nuevoEstado = !season.is_seen;

    // Llamamos a la API
    this.serieService.updateSeason(season.id, nuevoEstado).subscribe(() => {
      season.is_seen = nuevoEstado; // Solo cambiamos el color si la API responde OK
    });
  }

  deleteThisSerie(event: Event) {
    event.stopPropagation();
    if (confirm(`¿Seguro que quieres borrar ${this.serie.title}?`)) {
      this.serieService.deleteSerie(this.serie.id).subscribe(() => {
        this.serieDeleted.emit(this.serie.id); // Avisamos al padre
      });
    }
  }

  toggleCompleted(event: Event) {
    event.stopPropagation(); // Para que no gire la tarjeta
    const nuevoEstado = !this.serie.is_completed;

    this.serieService.updateSerieStatus(this.serie.id, nuevoEstado).subscribe(() => {
      this.serie.is_completed = nuevoEstado;
    });
  }
}
