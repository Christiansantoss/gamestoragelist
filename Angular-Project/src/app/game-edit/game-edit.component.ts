import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GamestorageService } from "../gamestorage.service";

@Component({
  selector: "app-game-edit",
  templateUrl: "./game-edit.component.html",
  styleUrls: ["./game-edit.component.css"]
})
export class GameEditComponent implements OnInit {
  editableGame;
  nameError;
  descriptionError;
  esrbError;
  genre1Error;
  genre2Error;
  scoreError;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _gamestorageService: GamestorageService
  ) {}

  ngOnInit() {
    this.descriptionError = "";
    this.genre1Error = "";
    this.genre2Error = "";
    this.scoreError = "";
    this.nameError = "";
    this.esrbError = "";
    this._route.params.subscribe((params: Params) => {
      this._gamestorageService.getOneGame(params["id"]).subscribe(
        game => {
          this.editableGame = game;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  updateGame() {
    this._gamestorageService.updateGame(this.editableGame).subscribe(
      response => {
        if (response["status"]) {
          this._router.navigateByUrl("/games/" + this.editableGame._id);
        } else {
          console.log(response["error"]["errors"]);
          if (response["error"]["errors"]["description"]) {
            this.descriptionError = response["error"]["errors"]["description"]["message"];
          } else {
            this.descriptionError = "";
          }
          if (response["error"]["errors"]["genre1"]) {
            this.genre1Error = response["error"]["errors"]["genre1"]["message"];
          } else {
            this.genre1Error = "";
          }
          if (response["error"]["errors"]["name"]) {
            this.nameError = response["error"]["errors"]["name"]["message"];
          } else {
            this.nameError = "";
          }
          if (response["error"]["errors"]["genre2"]) {
            this.genre2Error = response["error"]["errors"]["genre2"]["message"];
          } else {
            this.genre2Error = "";
          }
          if (response["error"]["errors"]["score"]) {
            this.scoreError = response["error"]["errors"]["score"]["message"];
          } else {
            this.scoreError = "";
          }
          if (response["error"]["errors"]["esrb"]) {
            this.esrbError = response["error"]["errors"]["esrb"]["message"];
          } else {
            this.esrbError = "";
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
