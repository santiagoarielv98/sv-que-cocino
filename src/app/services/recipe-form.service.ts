import { inject, Injectable, signal } from '@angular/core';
import type { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ingredientValidator } from '../validators/ingredient.directive';

@Injectable({
  providedIn: 'root',
})
export class RecipeFormService {
  private fb = inject(FormBuilder);
  private recipeForm = this.fb.group({
    ingredients: ['', [ingredientValidator()]],
    restrictions: this.fb.array([]),
  });

  constructor() {
    this.recipeForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  customRestrictions = signal<string[]>([]);

  toggleRestriction(restriction: string, isSelected: boolean) {
    const currentSelections = this.restrictions.controls.map(
      (control) => control.value,
    );
    if (isSelected) {
      if (!currentSelections.includes(restriction)) {
        this.restrictions.push(this.fb.control(restriction));
      }
    } else {
      const index = currentSelections.indexOf(restriction);
      if (index !== -1) {
        this.restrictions.removeAt(index);
      }
    }
  }

  addCustomRestriction(restriction: string) {
    const value = restriction.trim();
    if (value.length < 2) return;

    const allRestrictions = this.allRestrictions;

    if (!allRestrictions.includes(value.toLowerCase())) {
      this.customRestrictions.update((prev) => [...prev, restriction]);
      this.restrictions.push(this.fb.control(restriction));
      return true;
    }
    return false;
  }

  removeCustomRestriction(restriction: string) {
    this.customRestrictions.update((prev) =>
      prev.filter((item) => item !== restriction),
    );
    const index = this.restrictions.controls.findIndex(
      (control) => control.value === restriction,
    );
    if (index !== -1) {
      this.restrictions.removeAt(index);
    }
  }

  resetForm() {
    this.recipeForm.reset();
  }

  get allRestrictions() {
    const customRestrictions = this.customRestrictions();
    const allRestrictions = [
      ...customRestrictions,
      ...this.defaultRestrictions,
    ].map((restriction) => restriction.trim().toLowerCase());
    return allRestrictions;
  }

  get form() {
    return this.recipeForm;
  }
  get ingredients() {
    return this.recipeForm.get('ingredients')!;
  }

  get restrictions() {
    return this.recipeForm.get('restrictions')! as FormArray;
  }

  get defaultRestrictions() {
    return [
      'Sin TACC',
      'Vegano',
      'Vegetariano',
      'Sin lactosa',
      'Sin frutos secos',
    ];
  }
}
