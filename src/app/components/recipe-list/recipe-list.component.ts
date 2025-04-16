import { Component, inject, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import type { Recipe } from '../../../types/app';
import { RecipeDetailDialogService } from '../../services/recipe-detail-dialog.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-list',
  imports: [MatListModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  private recipeDetailDialogStateService = inject(RecipeDetailDialogService);
  @Input() recipes: Recipe[] = [];

  openDetail(recipe: Recipe) {
    console.log('Opening detail for recipe:', recipe);
    this.recipeDetailDialogStateService.openRecipeDetailDialog(recipe);
  }
}
