import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import type { Recipe } from '../../types/app';
import type { Observable } from 'rxjs';

export interface RecipeGenerationPayload {
  ingredients: string[];
  restrictions: string[];
}

export interface ImageGenerationPayload {
  recipeId: string;
}

export interface ImageGenerationResponse {
  imageUrl: string;
  success: boolean;
}

/**
 * Servicio responsable de comunicarse con la API externa
 */
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  createRecipe(payload: RecipeGenerationPayload): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, payload);
  }

  createRecipeImage(recipeId: string): Observable<ImageGenerationResponse> {
    const payload: ImageGenerationPayload = { recipeId };
    return this.http.post<ImageGenerationResponse>(
      `${this.baseUrl}/recipes/image`,
      payload,
    );
  }
}
