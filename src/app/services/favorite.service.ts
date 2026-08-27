import { Injectable, signal } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})

export class FavoriteService {

  favorites = signal<Game[]>([]);

  constructor() {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      this.favorites.set(JSON.parse(storedFavorites));
    }
  }

  addFavorite(game: Game): boolean {

    const alreadyFavorite = this.favorites()
      .some(favorite => favorite.id === game.id);

    if (alreadyFavorite) {
      return false;
    }

    this.favorites.update(favorites => [
      ...favorites,
      game
    ]);

    return true;
  }

  removeFavorite(gameId: number): void {

    this.favorites.update(favorites =>
      favorites.filter(game => game.id !== gameId)
    );

    this.saveFavorites();
  }

  isFavorite(gameId: number): boolean {
    return this.favorites()
      .some(game => game.id === gameId);
  }

  private saveFavorites(): void {
    localStorage.setItem(
      'favorites',
      JSON.stringify(this.favorites())
    );
  }
}
