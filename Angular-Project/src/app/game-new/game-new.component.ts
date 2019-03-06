import { Component, OnInit } from '@angular/core';
import { GamestorageService } from '../gamestorage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.css']
})
export class GameNewComponent implements OnInit {
  newGame;
  nameError;
  descriptionError;
  esrbError;
  genre1Error;
  genre2Error;
  scoreError;

  constructor(
    private _gamestorageService: GamestorageService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.descriptionError = '';
    this.genre1Error = '';
    this.genre2Error = '';
    this.scoreError = '';
    this.nameError = '';
    this.esrbError = '';
    this.newGame = {
      name: '',
      esrb: '',
      description: '',
      genre1: '',
      genre2: '',
      score: '',
    };
  }

  createGame() {
    this._gamestorageService.createGame(this.newGame)
      .subscribe(
        (response) => {
          if (response['status']) {
            this._router.navigateByUrl('/games');
          } else {
            console.log(response['error']['errors']);
            if (response['error']['errors']['description']) { 
              this.descriptionError = response['error']['errors']['description']['message']; 
            } else {
              this.descriptionError = '';
            }
            if (response['error']['errors']['genre1']) { 
              this.genre1Error = response['error']['errors']['genre1']['message']; 
            } else {
              this.genre1Error = '';
            }
            if (response['error']['errors']['name']) { 
              this.nameError = response['error']['errors']['name']['message']; 
            } else {
              this.nameError = '';
            }
            if (response['error']['errors']['genre2']) { 
              this.genre2Error = response['error']['errors']['genre2']['message']; 
            } else {
              this.genre2Error = '';
            }
            if (response['error']['errors']['score']) { 
              this.scoreError = response['error']['errors']['score']['message']; 
            } else {
              this.scoreError = '';
            }
            if (response['error']['errors']['esrb']) { 
              this.esrbError = response['error']['errors']['esrb']['message']; 
            } else {
              this.esrbError = '';
            }

          }
        },
        (err) => { console.log(err); }
      );

  }

}
