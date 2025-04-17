import { inject, Injectable, signal } from '@angular/core';
import type { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ingredientValidator } from '../validators/ingredient.directive';

/**
 * Tipos de restricciones dietéticas predefinidas
 */
export enum DietaryRestriction {
  GLUTEN_FREE = 'Sin TACC',
  VEGAN = 'Vegano',
  VEGETARIAN = 'Vegetariano',
  LACTOSE_FREE = 'Sin lactosa',
  NUT_FREE = 'Sin frutos secos',
}

/**
 * Servicio para gestionar el formulario de recetas y sus restricciones
 */
@Injectable({
  providedIn: 'root',
})
export class RestrictionFormService {
  private readonly formBuilder = inject(FormBuilder);

  /**
   * Restricciones personalizadas agregadas por el usuario
   */
  readonly customRestrictions = signal<string[]>([]);

  /**
   * Formulario para ingredientes y restricciones
   */
  private readonly recipeForm: FormGroup = this.formBuilder.group({
    ingredients: ['', [ingredientValidator()]],
    restrictions: this.formBuilder.array([]),
  });

  /**
   * Activa/desactiva una restricción en el formulario
   */
  toggleRestriction(restriction: string, isSelected: boolean): void {
    const selectedRestrictions = this.getSelectedRestrictions();

    if (isSelected && !selectedRestrictions.includes(restriction)) {
      this.addRestrictionToForm(restriction);
    } else if (!isSelected) {
      this.removeRestrictionFromForm(restriction);
    }
  }

  /**
   * Agrega una restricción personalizada
   * @returns true si fue agregada, false si ya existía
   */
  addCustomRestriction(restriction: string): boolean {
    const trimmedValue = restriction.trim();
    if (trimmedValue.length < 2) return false;

    const normalizedValue = trimmedValue.toLowerCase();
    if (this.getAllRestrictions().includes(normalizedValue)) {
      return false;
    }

    this.customRestrictions.update((prev) => [...prev, trimmedValue]);
    this.addRestrictionToForm(trimmedValue);
    return true;
  }

  /**
   * Elimina una restricción personalizada
   */
  removeCustomRestriction(restriction: string): void {
    this.customRestrictions.update((prev) =>
      prev.filter((item) => item !== restriction),
    );

    this.removeRestrictionFromForm(restriction);
  }

  /**
   * Reinicia el formulario a su estado inicial
   */
  resetForm(): void {
    this.recipeForm.reset();
  }

  /**
   * Obtiene el formulario completo
   */
  get form(): FormGroup {
    return this.recipeForm;
  }

  /**
   * Obtiene el control de ingredientes
   */
  get ingredients(): AbstractControl {
    return this.recipeForm.get('ingredients')!;
  }

  /**
   * Obtiene el array de restricciones
   */
  get restrictions(): FormArray {
    return this.recipeForm.get('restrictions') as FormArray;
  }

  /**
   * Obtiene las restricciones predefinidas del sistema
   */
  get defaultRestrictions(): string[] {
    return Object.values(DietaryRestriction);
  }

  /**
   * Obtiene todas las restricciones (predefinidas y personalizadas)
   */
  private getAllRestrictions(): string[] {
    return [...this.customRestrictions(), ...this.defaultRestrictions].map(
      (restriction) => restriction.trim().toLowerCase(),
    );
  }

  /**
   * Obtiene las restricciones seleccionadas actualmente
   */
  private getSelectedRestrictions(): string[] {
    return this.restrictions.controls.map((control) => control.value);
  }

  /**
   * Añade una restricción al FormArray
   */
  private addRestrictionToForm(restriction: string): void {
    this.restrictions.push(this.formBuilder.control(restriction));
  }

  /**
   * Elimina una restricción del FormArray
   */
  private removeRestrictionFromForm(restriction: string): void {
    const index = this.getSelectedRestrictions().indexOf(restriction);
    if (index !== -1) {
      this.restrictions.removeAt(index);
    }
  }
}
