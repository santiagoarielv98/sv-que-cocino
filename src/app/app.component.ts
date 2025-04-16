import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';

@Component({
  imports: [
    NavbarComponent,
    RecipeFormComponent,
    RecipeListComponent,
    AsyncPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private recipeService = inject(RecipeService);
  recipes$ = this.recipeService.recipes$;
}
