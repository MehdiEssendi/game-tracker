import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Details } from '../../models/game.model';

@Component({
  selector: 'app-game-details',
  imports: [],
  templateUrl: './game-details.html',
  styleUrl: './game-details.scss',
})

export class GameDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);

    game = signal<Details | null>(null);
    ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('ID:', id);

    if (id) {

      this.gameService.getGameById(id)
        .subscribe({
          next: (data) => {
            console.log('API DATA:', data);

            this.game.set(data);

            console.log('GAME VARIABLE:', this.game());
          },

          error: (err) => {
            console.error(err);
          }
        });

    }
  }
}
