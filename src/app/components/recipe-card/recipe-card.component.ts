import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { Recipe } from '../../../types/app';
import { getDifficultyLabel } from '../../utils/difficulty';
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
  styleUrls: ['./recipe-card.component.css'],
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
