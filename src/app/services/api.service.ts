import { HttpClient } from '@angular/common/http';
import type { OnDestroy } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import type { Recipe } from '../../types/app';
import { Auth, idToken } from '@angular/fire/auth';
import type { Subscription } from 'rxjs';

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
export class ApiService implements OnDestroy {
  private auth: Auth = inject(Auth);

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private idToken$ = idToken(this.auth);
  private idTokenSubscription: Subscription;
  private idToken: string | null = null;

  constructor() {
    this.idTokenSubscription = this.idToken$.subscribe((token) => {
      this.idToken = token;
    });
  }

  ngOnDestroy(): void {
    if (this.idTokenSubscription) {
      this.idTokenSubscription.unsubscribe();
    }
  }

  generateRecipe(recipe: GenerateRecipeOptions) {
    return this.http.post(`${this.apiUrl}/recipes`, recipe, {
      headers: {
        Authorization: `Bearer ${this.idToken}`,
      },
    });
  }

  generateImage(recipe: Recipe) {
    return this.http
      .post<GenerateImageResponse>(`${this.apiUrl}/generate-image`, recipe)
      .pipe();
  }
}
