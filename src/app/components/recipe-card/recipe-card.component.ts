import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { Recipe } from '../../../types/app';
import { getDifficultyLabel } from '../../utils/difficulty';
import { ImageService } from '../../services/image.service';
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
  private imageService = inject(ImageService);
  isLoading = this.imageService.isLoading;

  @Input({
    required: true,
    transform: (v: Recipe) => ({
      ...v,
      difficulty: getDifficultyLabel(v.difficulty),
    }),
  })
  recipe!: Recipe;

  @Output() viewRecipe = new EventEmitter<Recipe>();

  generateImage() {
    if (this.isLoading()) return;
    if (this.recipe.id) {
      this.imageService.generateImage(this.recipe.id);
    }
  }

  viewFullRecipe(): void {
    if (this.recipe) {
      this.viewRecipe.emit(this.recipe);
    }
  }
}
