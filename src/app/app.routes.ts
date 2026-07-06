import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'favorites', component: Favorites }
];
