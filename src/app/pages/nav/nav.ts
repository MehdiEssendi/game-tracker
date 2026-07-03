import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

/**
 * Interface représentant un jeu retourné par l'API RAWG
 * Elle permet de typer les données au lieu d'utiliser "any"
 */
export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}
/**
 * Interface représentant la réponse globale de l'API RAWG
 */
export interface GamesResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Game[];
}
@Component({
  selector: 'app-nav',
  imports: [CommonModule, MatMenuModule, MatCardModule, MatButtonModule],
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  
  /**
   * Liste des jeux affichés dans le template
   */
  games = signal<any[]>([]);  
  private gameService = inject(GameService);
  // private cdr = inject(ChangeDetectorRef);
  constructor() {
    this.loadGames();
  }
  /**
   * Hook Angular exécuté au chargement du composant
   */
  loadGames(){
    // Appel de l'API pour récupérer les jeux
    this.gameService.getGames().subscribe({
      // Cas succès
      next: (data) => {
        this.games.set(data.results);
        // this.cdr.detectChanges(); // force refresh UI
        console.log(this.games);
      },
      // Cas erreur (API, réseau, clé invalide...)
      error: (err) => {
      console.error(err);
      }
    });
  }
}
