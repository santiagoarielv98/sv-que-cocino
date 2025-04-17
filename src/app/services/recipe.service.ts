import { Injectable, inject, signal } from '@angular/core';
import type {
  CollectionReference,
  DocumentData,
  Query,
} from '@angular/fire/firestore';
import {
  Firestore,
  collection,
  collectionData,
  getCountFromServer,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import type { Observable } from 'rxjs';
import { BehaviorSubject, switchMap, map, tap } from 'rxjs';
import type { Recipe } from '../../types/app';
import type { RecipeGenerationPayload } from './recipe-api.service';
import { RecipeApiService } from './recipe-api.service';

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
  private readonly loadingMore = signal<boolean>(false);
  private readonly hasMoreRecipes = signal<boolean>(true);
  private readonly totalRecipes = signal<number>(0);

  // BehaviorSubject para controlar el límite de recetas
  private limitSubject = new BehaviorSubject<number>(this.pageSize);

  constructor() {
    // Obtener el total de recetas disponibles
    this.getTotalRecipeCount();
    
    // Escuchar cambios en la cantidad de recetas cargadas para actualizar hasMoreRecipes
    this.recipes$.subscribe(recipes => {
      this.hasMoreRecipes.set(recipes.length < this.totalRecipes());
    });
  }

  /**
   * Observable con las recetas, ordenadas por fecha de creación descendente
   */
  public readonly recipes$: Observable<Recipe[]> = this.limitSubject.pipe(
    switchMap((currentLimit) => {
      const recipesQuery: Query = query(
        this.recipeCollection,
        orderBy('createdAt', 'desc'),
        limit(currentLimit),
      );

      return collectionData(recipesQuery, {
        idField: 'id',
      }) as Observable<Recipe[]>;
    }),
  );

  /**
   * Indica si se están cargando más recetas
   */
  get isLoadingMore(): boolean {
    return this.loadingMore();
  }

  /**
   * Indica si hay más recetas disponibles para cargar
   */
  get hasMore(): boolean {
    return this.hasMoreRecipes();
  }

  /**
   * Cantidad actual de recetas por página
   */
  get currentLimit(): number {
    return this.recipesPerPage();
  }

  /**
   * Obtiene el número total de recetas disponibles
   */
  private async getTotalRecipeCount(): Promise<void> {
    try {
      const snapshot = await getCountFromServer(this.recipeCollection);
      const count = snapshot.data().count;
      this.totalRecipes.set(count);
      this.hasMoreRecipes.set(this.pageSize < count);
    } catch (error) {
      console.error('Error al obtener el total de recetas:', error);
      // Asumir que hay más recetas como fallback
      this.hasMoreRecipes.set(true);
    }
  }

  /**
   * Carga más recetas incrementando el límite
   */
  loadMoreRecipes(): void {
    if (!this.hasMoreRecipes()) {
      return;
    }
    
    this.loadingMore.set(true);
    const newLimit = this.limitSubject.value + this.pageSize;
    this.recipesPerPage.set(newLimit);
    this.limitSubject.next(newLimit);

    // Verificar si hay más recetas para cargar después de esta carga
    this.hasMoreRecipes.set(newLimit < this.totalRecipes());

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
