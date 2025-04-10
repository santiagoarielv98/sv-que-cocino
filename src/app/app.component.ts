import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
@Component({
  imports: [NavbarComponent, RecipeFormComponent, RecipeListComponent],
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
export class AppComponent {}
