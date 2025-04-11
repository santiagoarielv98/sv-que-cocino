import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  orderBy,
  query,
} from '@angular/fire/firestore';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import type { GenerateRecipeOptions } from './api.service';
import { ApiService } from './api.service';
import type { Recipe } from '../../types/app';

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
  );
  recipes$ = collectionData(this.recipeQuery, {
    idField: 'id',
  }) as Observable<Recipe[]>;

  generateRecipe(options: GenerateRecipeOptions) {
    return this.apiService.generateRecipe(options).pipe(
      tap((recipe) => {
        addDoc(this.recipeCollection, {
          ...recipe,
          createdAt: new Date(),
        })
          .then(() => console.log('Recipe saved to Firestore'))
          .catch((error) => console.error('Error saving recipe:', error));
      }),
    );
  }
}
