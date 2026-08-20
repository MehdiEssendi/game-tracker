import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.development';
import { GameDetails } from '../pages/game-details/game-details';
import { Details, GamesResponse } from '../models/game.model';
/**
* Service responsable de la communication avec l'API RAWG
* Centralise les appels HTTP liés aux jeux
*/
@Injectable({
  providedIn: 'root',
})


export class GameService {
  /**
  * URL de base de l'API RAWG
  * La clé API est obligatoire pour authentifier les requêtes
  */
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = environment.rawgApiKey
  /**
  * Injection du HttpClient Angular
  * Permet de faire des requêtes HTTP (GET, POST, etc.)
  */
  constructor(private http: HttpClient) {}
  
  /**
  * Récupère la liste des jeux depuis l'API RAWG
  * Retourne un Observable car les requêtes HTTP sont asynchrones
  */
  getGames(): Observable<GamesResponse> {
    return this.http.get<GamesResponse>(
      `${this.apiUrl}?key=${this.apiKey}` 
    );
  }
  
  getGameById(id: string): Observable<Details> {
    return this.http.get<Details>(
      `${this.apiUrl}/${id}?key=${this.apiKey}`
    );
  }
}
