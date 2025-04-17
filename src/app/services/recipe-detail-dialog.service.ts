import { inject, Injectable } from '@angular/core';
import type { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import type { Recipe } from '../../types/app';
import { RecipeDetailDialogComponent } from '../components/recipe-detail-dialog/recipe-detail-dialog.component';

/**
 * Configuración del diálogo de detalle de receta
 */
export interface RecipeDialogConfig {
  width?: string;
  maxWidth?: string;
}

/**
 * Servicio responsable de mostrar diálogos de detalle de recetas
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  /**
   * Configuración por defecto para el diálogo de recetas
   */
  private readonly defaultConfig: RecipeDialogConfig = {
    width: '100%',
    maxWidth: '600px',
  };

  /**
   * Abre un diálogo con el detalle de una receta
   * @returns Referencia al diálogo abierto
   */
  openRecipeDetail(
    recipe: Recipe,
    config?: RecipeDialogConfig,
  ): MatDialogRef<RecipeDetailDialogComponent> {
    const dialogConfig = {
      ...this.defaultConfig,
      ...config,
      data: { recipe },
    };

    return this.dialog.open(RecipeDetailDialogComponent, dialogConfig);
  }
}
