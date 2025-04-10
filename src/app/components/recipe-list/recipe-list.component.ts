import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-list',
  imports: [MatListModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styles: ``,
})
export class RecipeListComponent {}
