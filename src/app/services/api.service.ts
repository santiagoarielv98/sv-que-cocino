import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import type { Recipe } from '../../types/app';

export interface GenerateRecipeOptions {
  ingredients: string[];
  restrictions: string[];
}

export interface GenerateImageOptions {
  idea?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  generateRecipe(recipe: GenerateRecipeOptions) {
    return this.http.post<Recipe>(`${this.apiUrl}/recipes`, recipe);
  }

  generateImage(recipeId: string) {
    return this.http.post(`${this.apiUrl}/recipes/image`, {
      recipeId: recipeId,
    });
  }
}
