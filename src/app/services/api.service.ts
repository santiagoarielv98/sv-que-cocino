import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recipe } from '../../types/app';

export interface GenerateRecipeOptions {
  generationType: string;
  idea: string;
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
    return this.http.post(`${this.apiUrl}/recipes`, recipe);
  }

  generateImage(recipe: Recipe) {
    return this.http
      .post<GenerateImageResponse>(`${this.apiUrl}/generate-image`, recipe)
      .pipe();
  }
}
