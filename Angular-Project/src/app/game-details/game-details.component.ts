import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GamestorageService } from '../gamestorage.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _gamestorageService: GamestorageService
  ) { }

  ngOnInit() {
    this.game = {
      name: '',
      description: '',
      esrb: '',
      genre1: '',
      genre2: '',
      score: '',
    };
    this._route.params.subscribe((params: Params) => {
      this._gamestorageService.getOneGame(params['id'])
      .subscribe(
        (game) => {
          this.game = game;
        },
        (err) => { console.log(err); }
      );
    });
  }

}