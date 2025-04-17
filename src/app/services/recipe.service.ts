import { Injectable, inject, signal } from '@angular/core';
import type { CollectionReference, DocumentData, Query } from '@angular/fire/firestore';
import {
  Firestore,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
  startAfter,
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
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

  private readonly pageSize = 10;
  private readonly recipesPerPage = signal<number>(this.pageSize);
  private readonly lastVisibleDocument = signal<DocumentData | null>(null);
  private readonly loadingMore = signal<boolean>(false);

  // BehaviorSubject para controlar el límite de recetas
  private limitSubject = new BehaviorSubject<number>(this.pageSize);

  /**
   * Observable con las recetas, ordenadas por fecha de creación descendente
   */
  public readonly recipes$: Observable<Recipe[]> = this.limitSubject.pipe(
    switchMap(currentLimit => {
      const recipesQuery: Query = query(
        this.recipeCollection,
        orderBy('createdAt', 'desc'),
        limit(currentLimit),
      );
      
      return collectionData(recipesQuery, {
        idField: 'id',
      }) as Observable<Recipe[]>;
    })
  );

  /**
   * Indica si se están cargando más recetas
   */
  get isLoadingMore(): boolean {
    return this.loadingMore();
  }

  /**
   * Cantidad actual de recetas por página
   */
  get currentLimit(): number {
    return this.recipesPerPage();
  }

  /**
   * Carga más recetas incrementando el límite
   */
  loadMoreRecipes(): void {
    this.loadingMore.set(true);
    const newLimit = this.limitSubject.value + this.pageSize;
    this.recipesPerPage.set(newLimit);
    this.limitSubject.next(newLimit);
    
    setTimeout(() => {
      this.loadingMore.set(false);
    }, 300);
  }

  /**
   * Solicita la generación de una nueva receta
   */
  generateRecipe(options: RecipeGenerationPayload): Observable<Recipe> {
    return this.recipeApi.createRecipe(options);
  }
}
