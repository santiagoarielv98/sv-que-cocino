import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import type { MatChipInputEvent } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RecipeFormService } from '../../services/recipe-form.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent {
  private recipeService = inject(RecipeService);
  protected formService = inject(RecipeFormService);

  isLoading = signal(false);
  recipeForm = this.formService.form;
  readonly customRestrictions = this.formService.customRestrictions;
  readonly defaultRestrictions = this.formService.defaultRestrictions;

  isSelected = (value: string) => {
    const selectedRestrictions = this.formService.restrictions.value;
    return selectedRestrictions.includes(value);
  };
  addCustomRestriction(event: MatChipInputEvent): void {
    if (!this.formService.addCustomRestriction(event.value)) return;
    event.chipInput!.clear();
  }

  resetForm() {
    this.formService.resetForm();
  }

  onSubmit() {
    if (this.recipeForm.invalid) return;
    this.isLoading.set(true);
    const value = this.formService.ingredients.value as string;

    const ingredients = value.split(',').map((ingredient) => ingredient.trim());
    const restrictions = this.formService.restrictions.value;

    this.recipeService
      .generateRecipe({
        ingredients,
        restrictions,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.resetForm();
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }
}
