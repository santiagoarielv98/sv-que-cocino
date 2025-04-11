import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { getDifficultyLabel } from '../../utils/difficulty';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { Recipe } from '../../../types/app';
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  styles: `
    .recipe-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .recipe-image-container {
      height: 300px;
      overflow: hidden;
    }

    .recipe-image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--mat-sys-on-primary);
      border-radius: 4px 4px 0 0;
    }

    @media (min-width: 768px) {
      .recipe-card {
        flex-direction: row;
      }

      .recipe-image-container {
        max-width: 400px;
        padding: 16px;
        width: 100%;
      }

      mat-card-actions {
        justify-content: flex-start;
      }
    }

    .recipe-image-container img {
      width: 100%;
      object-fit: cover;
    }

    .recipe-content {
      display: flex;
      flex-direction: column;
    }

    .recipe-tags {
      margin-bottom: 16px;
    }

    .recipe-metadata {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    .metadata-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    mat-card-actions {
      justify-content: flex-end;
    }

    @media (max-width: 500px) {
      .recipe-metadata {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class RecipeCardComponent {
  @Input({
    required: true,
    transform: (v: Recipe) => ({
      ...v,
      difficulty: getDifficultyLabel(v.difficulty),
    }),
  })
  recipe!: Recipe;

  @Output() generateImageRequest = new EventEmitter<string>();
  @Output() viewRecipe = new EventEmitter<Recipe>();

  generateImage() {
    // if (this.recipeId) {
    //   this.generateImageRequest.emit(this.recipeId);
    // }
  }

  viewFullRecipe(): void {
    if (this.recipe) {
      this.viewRecipe.emit(this.recipe);
    }
  }
}
