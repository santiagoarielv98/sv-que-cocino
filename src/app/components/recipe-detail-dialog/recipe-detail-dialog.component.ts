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
  styles: `
    .recipe-header {
      position: relative;
      color: white;
    }

    .recipe-header-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    }

    .recipe-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .image-placeholder {
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
    }

    .recipe-content {
      padding: 0;
      max-height: calc(100vh - 7.5rem);
    }

    .c {
      padding: 24px;
    }

    .recipe-metadata {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin: 20px 0;
    }

    .metadata-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .recipe-section {
      margin: 24px 0;
    }

    .recipe-section h3 {
      margin-bottom: 16px;
      font-weight: 500;
    }

    .ingredients-list,
    .steps-list {
      padding-left: 20px;
    }

    .ingredients-list li,
    .steps-list li {
      margin-bottom: 8px;
    }

    .steps-list li {
      margin-bottom: 16px;
    }

    .action-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 16px 24px;
    }

    @media (max-width: 500px) {
      .recipe-metadata {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class RecipeDetailDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RecipeDetailDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly detail = model(this.data.recipe);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
