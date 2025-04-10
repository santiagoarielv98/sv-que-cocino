import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { tap } from 'rxjs';
import { ApiService } from './api.service';

interface GenerateRecipeOptions {
  generationType: string;
  idea: string;
  ingredients: string[];
  restrictions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private firestore = inject(Firestore);
  private apiService = inject(ApiService);
  private recipeCollection = collection(this.firestore, 'recipes');
  recipes$ = collectionData(this.recipeCollection, {
    idField: 'id',
  });

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
