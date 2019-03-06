import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamestorageService {

  constructor(private _http: HttpClient) { }

  getGame() {
    console.log("Angular > GameService > getGames()");
    return this._http.get('/api/games');
  }

  createGame(newGame) {
    return this._http.post('/api/games', newGame);
  }

  getOneGame(id){
    return this._http.get('/api/games/' + id);
  }

  updateGame(editableGame){
    return this._http.put('/api/games/' + editableGame._id, editableGame);
  }

  deleteGame(id){
    return this._http.delete('/api/games/' + id);
  }

}