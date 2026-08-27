import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { FavoriteService } from '../../services/favorite.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private favoriteService = inject(FavoriteService);
  private snackBar = inject(MatSnackBar);
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
  addToFavorites(game: Game): void {
    const added = this.favoriteService.addFavorite(game);
    if(added){
      this.snackBar.open(
        `${game.name} has been added to your favorites`,
        'Close',
        {
          duration: 2000
        }
      );
    } else {
      this.snackBar.open(
        `${game.name} is already in your favorites`,
        'Close',
        {
          duration: 2000
        }
      );
    }
  }
}
