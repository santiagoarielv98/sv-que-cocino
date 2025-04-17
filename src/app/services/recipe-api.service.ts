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
 * Servicio responsable de comunicarse con la API externa de recetas
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Solicita la generación de una receta a partir de ingredientes y restricciones
   */
  createRecipe(payload: RecipeGenerationPayload): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, payload);
  }

  /**
   * Solicita la generación de una imagen para una receta específica
   */
  createRecipeImage(recipeId: string): Observable<ImageGenerationResponse> {
    const payload: ImageGenerationPayload = { recipeId };
    return this.http.post<ImageGenerationResponse>(
      `${this.baseUrl}/recipes/image`,
      payload,
    );
  }
}
