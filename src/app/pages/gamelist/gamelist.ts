import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';


@Component({
  selector: 'app-gamelist',
  imports: [CommonModule, MatMenuModule, MatCardModule, MatButtonModule, RouterLink],
  standalone: true,
  templateUrl: './gamelist.html',
  styleUrl: './gamelist.scss',
})
export class GameList {
  
  /**
   * Liste des jeux affichés dans le template
   */
  games = signal<Game[]>([]);  
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
        console.log(this.games());
      },
      // Cas erreur (API, réseau, clé invalide...)
      error: (err) => {
      console.error(err);
      }
    });
  }
}
