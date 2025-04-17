import { Component, inject, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { Recipe } from '../../../types/app';
import { RecipeDialogService } from '../../services/recipe-dialog.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [
    MatListModule,
    RecipeCardComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  private dialogService = inject(RecipeDialogService);
  private recipeService = inject(RecipeService);

  @Input() recipes: Recipe[] = [];

  /**
   * Abre el diálogo de detalle de una receta
   */
  openDetail(recipe: Recipe) {
    this.dialogService.openRecipeDetail(recipe);
  }

  /**
   * Carga más recetas
   */
  loadMore() {
    this.recipeService.loadMoreRecipes();
  }

  /**
   * Indica si se están cargando más recetas
   */
  get isLoadingMore(): boolean {
    return this.recipeService.isLoadingMore;
  }

  /**
   * Indica si hay más recetas disponibles para cargar
   */
  get hasMoreRecipes(): boolean {
    return this.recipeService.hasMore;
  }
}
