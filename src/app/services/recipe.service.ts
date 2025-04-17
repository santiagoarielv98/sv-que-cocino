import { Injectable, inject } from '@angular/core';
import type { CollectionReference, Query } from '@angular/fire/firestore';
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
import type { RecipeGenerationPayload } from './api.service';
import { RecipeApiService } from './api.service';

/**
 * Servicio responsable de gestionar las recetas
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly firestore = inject(Firestore);
  private readonly recipeApi = inject(RecipeApiService);
  
  private readonly recipeCollection: CollectionReference = collection(
    this.firestore,
    'recipes',
  );

  private readonly recipeQuery: Query = query(
    this.recipeCollection,
    orderBy('createdAt', 'desc'),
    limit(20),
  );

  /**
   * Observable con las últimas 20 recetas, ordenadas por fecha de creación descendente
   */
  public readonly recipes$: Observable<Recipe[]> = collectionData(
    this.recipeQuery,
    {
      idField: 'id',
    },
  ) as Observable<Recipe[]>;

  /**
   * Solicita la generación de una nueva receta
   */
  generateRecipe(options: RecipeGenerationPayload): Observable<Recipe> {
    return this.recipeApi.createRecipe(options);
  }
}
