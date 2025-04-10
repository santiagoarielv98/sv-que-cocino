import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './recipe-card.component.html',
  styles: `
    @media (min-width: 768px) {
      .recipe-card {
        flex-direction: row;
      }

      .recipe-image-container {
        max-width: 400px;
        padding: 16px;
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
  @Input() title = '';
  @Input() description = '';
  @Input() imageUrl?: string;
  @Input() tags: string[] = [];
  @Input() difficulty?: string;
  @Input() prepTime?: number;
  @Input() cookTime?: number;
  @Input() servings?: number;
  @Input() dietaryRestrictions: string[] = [];

  viewFullRecipe(): void {
    console.log('Viewing full recipe for:', this.title);
  }
}
