import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { Recipe } from '../../types/app';
import { RecipeDetailDialogComponent } from '../components/recipe-detail-dialog/recipe-detail-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailDialogStateService {
  private dialog = inject(MatDialog);

  openRecipeDetailDialog(recipe: Recipe) {
    this.dialog.open(RecipeDetailDialogComponent, {
      data: { recipe },
      width: '100%',
      maxWidth: '600px',
    });
  }
}
