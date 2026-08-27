import { Component, inject } from '@angular/core';
import { Game } from '../../models/game.model';
import { FavoriteService } from '../../services/favorite.service';
import { MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-favorites',
  imports: [MatCardModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {

  private favoriteService = inject(FavoriteService);

  favorites = this.favoriteService.favorites;

  removeFavorite(gameId: number): void {
    this.favoriteService.removeFavorite(gameId);
  }

}
