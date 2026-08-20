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

export interface Details {
  id: number;
  name: string;
  background_image: string;
  description_raw: string;
  released: string;
  rating: number;
  metacritic: number;
}