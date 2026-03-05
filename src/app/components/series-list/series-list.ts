/* import { Component } from '@angular/core';

@Component({
  selector: 'app-series-list',
  imports: [],
  templateUrl: './series-list.html',
  styleUrl: './series-list.css',
})
export class SeriesList {

}
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerieService } from '../../services/serie';
import { SerieCard } from '../serie-card/serie-card';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, SerieCard], // Importamos la tarjeta que ya creamos
  templateUrl: './series-list.html',
  styleUrl: './series-list.css'
})
export class SeriesList implements OnInit {
  allSeries: any[] = [];      // Aquí guardamos TODO lo que viene de la BBDD
  filteredSeries: any[] = []; // Aquí solo lo que cumple el filtro de la letra
  
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  numbers: string[] = '0123456789'.split('');
  selectedFilter: string = '';

  constructor(private serieService: SerieService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSeries();
  }

  /* loadSeries() {
    this.serieService.getSeries().subscribe(data => {
      this.allSeries = data;
      this.filteredSeries = data; // Al principio mostramos todas
    });
  } */

    loadSeries() {
    this.serieService.getSeries().subscribe(data => {
      this.allSeries = data;
      this.filteredSeries = [...data]; // <--- Esto asegura que al cargar aparezcan todas
      this.selectedFilter = '';   // Marcamos que no hay filtro activo
      this.cdr.detectChanges();
    });
  }

  filterBy(letter: string) {
    this.selectedFilter = letter;
    this.filteredSeries = this.allSeries.filter(s => 
      s.title.toUpperCase().startsWith(letter)
    );
  }

  showAll() {
    this.selectedFilter = '';
    this.filteredSeries = this.allSeries;
  }

  onSerieDeleted(id: number) {
    // Quitamos la serie del array localmente
    this.allSeries = this.allSeries.filter(s => s.id !== id);
    this.filteredSeries = this.filteredSeries.filter(s => s.id !== id);
  }

}