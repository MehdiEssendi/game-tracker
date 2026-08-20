import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Favorites } from './pages/favorites/favorites';
import { GameList } from './pages/gamelist/gamelist';
import { GameDetails } from './pages/game-details/game-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path:'gamelist', component: GameList},
  { path: 'favorites', component: Favorites },
  {
  path: 'games/:id',
  component: GameDetails
  }
];
