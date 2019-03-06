import { GameEditComponent } from './game-edit/game-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameNewComponent } from './game-new/game-new.component';





const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/games' },
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: GameNewComponent },
  { path: 'games/:id/edit', component: GameEditComponent },
  { path: 'games/:id', component: GameDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }