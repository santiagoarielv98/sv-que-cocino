import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import type { Recipe } from '../../../types/app';

@Component({
  selector: 'app-recipe-list',
  imports: [MatListModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styles: `
    .recipe-list-header {
      margin-bottom: 24px;
    }

    .recipe-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin: 0 auto;
    }

    .no-recipes {
      text-align: center;
      padding: 32px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
  `,
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [];
}
