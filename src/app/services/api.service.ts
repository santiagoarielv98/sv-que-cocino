import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface GenerateRecipeOptions {
  generationType: string;
  idea: string;
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
    return this.http.post(`${this.apiUrl}/recipes`, recipe);
  }

  generateImage(recipe: GenerateImageOptions) {
    return this.http.post(`${this.apiUrl}/generate-image`, recipe);
  }
}
