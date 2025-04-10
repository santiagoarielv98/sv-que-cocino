import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface GenerateRecipeOptions {
  idea?: string;
}

export interface GenerateImageOptions {}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  generateRecipe(recipe: GenerateRecipeOptions) {
    return this.http.post(`${this.apiUrl}/generate-recipe`, recipe);
  }

  generateImage(recipe: GenerateImageOptions) {
    return this.http.post(`${this.apiUrl}/generate-image`, recipe);
  }
}
