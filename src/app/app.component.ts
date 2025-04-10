import { Component, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Recipe } from '../types/app';

@Component({
  imports: [
    NavbarComponent,
    RecipeFormComponent,
    RecipeListComponent,
    AsyncPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: `
    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 0 20px;
    }
  `,
})
export class AppComponent {
  private recipeService = inject(RecipeService);
  recipes$ = this.recipeService.recipes$ as Observable<Recipe[]>;
}
