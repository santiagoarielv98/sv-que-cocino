import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
@Component({
  imports: [NavbarComponent, RecipeFormComponent, RecipeListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
