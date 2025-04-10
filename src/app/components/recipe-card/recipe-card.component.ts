import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './recipe-card.component.html',
  styles: `
    .example-card {
      max-width: 400px;
    }

    .example-header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }
  `,
})
export class RecipeCardComponent {}
