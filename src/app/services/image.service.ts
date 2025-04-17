import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpClientService } from './api.service';

/**
 * Servicio para gestionar la generación de imágenes de recetas
 */
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly httpClient = inject(HttpClientService);

  /**
   * Indica si está en proceso de generación de imagen
   */
  readonly isLoading = signal(false);

  /**
   * Solicita la generación de una nueva imagen para una receta
   */
  generateImageForRecipe(recipeId: string): void {
    this.isLoading.set(true);

    this.httpClient
      .createRecipeImage(recipeId)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe();
  }
}
