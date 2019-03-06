import { Component, OnInit } from '@angular/core';
import { GamestorageService } from '../gamestorage.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games;

  constructor(private _gamestorageService: GamestorageService) { }

  ngOnInit() {
    this.games = [];
    this.getGames();
  }

  getGames() {
    this._gamestorageService.getGame()
    .subscribe(
      (games) => {
        this.games = games;
      },
      (err) => { console.log(err); }
    );
  }

  deleteGames(id) {
    this._gamestorageService.deleteGame(id)
    .subscribe(
      (response) => {
        this.getGames();
      },
      (err) => { console.log(err); }
    );
  }

}
