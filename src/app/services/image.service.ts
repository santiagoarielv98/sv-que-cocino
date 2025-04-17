import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { RecipeApiService } from './recipe-api.service';

/**
 * Servicio para gestionar la generación de imágenes de recetas
 */
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly recipeApi = inject(RecipeApiService);

  /**
   * Indica si está en proceso de generación de imagen
   */
  readonly isLoading = signal(false);

  /**
   * Último error ocurrido durante la generación de imágenes
   */
  readonly error = signal<string | null>(null);

  /**
   * Solicita la generación de una nueva imagen para una receta
   */
  generateImageForRecipe(recipeId: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.recipeApi
      .createRecipeImage(recipeId)
      .pipe(
        catchError((err) => {
          this.error.set('Error al generar la imagen de la receta');
          console.error('Error generating recipe image:', err);
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe();
  }
}
