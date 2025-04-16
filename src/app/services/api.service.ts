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

export interface GenerateImageResponse {
  base64: string;
  mimeType: string;
  uint8Array: Uint8Array;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  generateRecipe(recipe: GenerateRecipeOptions) {
    return this.http.post<Recipe>(`${this.apiUrl}/recipe`, recipe);
  }

  generateImage(recipe: Recipe) {
    return this.http
      .post<GenerateImageResponse>(`${this.apiUrl}/image`, recipe)
      .pipe();
  }
}
