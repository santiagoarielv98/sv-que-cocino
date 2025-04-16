import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import type { Observable } from 'rxjs';
import type { Recipe } from '../../types/app';
import type { GenerateRecipeOptions } from './api.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private firestore = inject(Firestore);
  private apiService = inject(ApiService);
  private recipeCollection = collection(this.firestore, 'recipes');
  private recipeQuery = query(
    this.recipeCollection,
    orderBy('createdAt', 'desc'),
    limit(20),
  );
  recipes$ = collectionData(this.recipeQuery, {
    idField: 'id',
  }) as Observable<Recipe[]>;

  generateRecipe(options: GenerateRecipeOptions) {
    return this.apiService.generateRecipe(options);
  }
}
