import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiService = inject(ApiService);
  isLoading = signal(false);

  generateImage(recipeId: string) {
    this.isLoading.set(true);
    this.apiService.generateImage(recipeId).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
