import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import type { Recipe } from '../../../types/app';

export interface DialogData {
  recipe: Recipe;
}
@Component({
  selector: 'app-recipe-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './recipe-detail-dialog.component.html',
  styleUrls: ['./recipe-detail-dialog.component.css'],
})
export class RecipeDetailDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RecipeDetailDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly detail = model(this.data.recipe);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
