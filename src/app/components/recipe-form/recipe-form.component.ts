import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import type { MatChipInputEvent } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
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
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  recipeForm = this.fb.group({
    generationType: ['idea', Validators.required],
    idea: [''],
    ingredients: [''],
  });

  isLoading = signal(false);

  readonly defaultRestrictions = signal([
    'Sin TACC',
    'Vegano',
    'Vegetariano',
    'Sin lactosa',
    'Sin frutos secos',
  ]);

  readonly customRestrictions = signal<string[]>([]);

  readonly selectedRestrictions = new FormControl<string[]>([]);

  announcer = inject(LiveAnnouncer);

  toggleDefaultRestriction(restriction: string, isSelected: boolean): void {
    const currentSelections = this.selectedRestrictions.value || [];

    if (isSelected) {
      if (!currentSelections.includes(restriction)) {
        this.selectedRestrictions.setValue([...currentSelections, restriction]);
        this.announcer.announce(`Se seleccionó ${restriction}`);
      }
    } else {
      const newSelections = currentSelections.filter((r) => r !== restriction);
      this.selectedRestrictions.setValue(newSelections);
      this.announcer.announce(`Se deseleccionó ${restriction}`);
    }
  }

  toggleCustomRestriction(restriction: string, isSelected: boolean): void {
    this.toggleDefaultRestriction(restriction, isSelected);
  }

  removeCustomRestriction(restriction: string) {
    this.customRestrictions.update((restrictions) => {
      const index = restrictions.indexOf(restriction);
      if (index < 0) {
        return restrictions;
      }

      restrictions.splice(index, 1);

      const currentSelections = this.selectedRestrictions.value || [];
      if (currentSelections.includes(restriction)) {
        const newSelections = currentSelections.filter(
          (r) => r !== restriction,
        );
        this.selectedRestrictions.setValue(newSelections);
      }

      this.announcer.announce(`Se eliminó ${restriction} de las restricciones`);
      return [...restrictions];
    });
  }

  addCustomRestriction(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const allRestrictions = [
        ...this.defaultRestrictions(),
        ...this.customRestrictions(),
      ];

      if (!allRestrictions.includes(value)) {
        this.customRestrictions.update((restrictions) => [
          ...restrictions,
          value,
        ]);
        this.announcer.announce(`Se agregó ${value} a las restricciones`);
        this.selectedRestrictions.setValue([
          ...(this.selectedRestrictions.value || []),
          value,
        ]);
      }
    }

    event.chipInput!.clear();
  }

  resetForm(): void {
    this.recipeForm.reset({
      generationType: 'idea',
      idea: '',
      ingredients: '',
    });

    this.selectedRestrictions.setValue([]);

    this.announcer.announce('Formulario reiniciado');
  }

  onSubmit(): void {
    const generationType = this.recipeForm.get('generationType')?.value;
    this.recipeForm.get('idea')?.setErrors(null);
    this.recipeForm.get('ingredients')?.setErrors(null);

    if (
      generationType === 'idea' &&
      !this.recipeForm.get('idea')?.value?.trim()
    ) {
      this.recipeForm.get('idea')?.setErrors({ required: true });
      this.announcer.announce('Por favor describe tu idea de receta');
      return;
    }

    if (generationType === 'ingredients') {
      const ingredientsString =
        this.recipeForm.get('ingredients')?.value?.trim() || '';
      const ingredientsArray = ingredientsString
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      if (ingredientsArray.length === 0) {
        this.recipeForm.get('ingredients')?.setErrors({ required: true });
        this.announcer.announce('Por favor ingresa al menos un ingrediente');
        return;
      }
    }

    if (this.recipeForm.valid) {
      const formData = {
        generationType,
        idea: this.recipeForm.get('idea')?.value || '',
        ingredients:
          generationType === 'ingredients'
            ? (this.recipeForm.get('ingredients')?.value || '')
                .split(',')
                .map((item: string) => item.trim())
                .filter((item: string) => item.length > 0)
            : [],
        restrictions: this.selectedRestrictions.value || [],
      };

      console.log('Data para enviar:', formData);

      this.recipeForm.disable();
      this.isLoading.set(true);
      this.announcer.announce('Generando receta, por favor espere...');

      const recipeOptions = {
        generationType: formData.generationType!,
        idea: generationType === 'idea' ? formData.idea : '',
        ingredients: formData.ingredients,
        restrictions: formData.restrictions || [],
      };

      this.recipeService.generateRecipe(recipeOptions).subscribe({
        next: (recipe) => {
          console.log('Receta generada:', recipe);
          this.recipeForm.enable();
          this.isLoading.set(false);
          this.announcer.announce('¡Receta generada!');
        },
        error: (error) => {
          console.error('Error al generar receta:', error);
          this.recipeForm.enable();
          this.isLoading.set(false);
          this.announcer.announce(
            'Error al generar la receta. Inténtalo nuevamente.',
          );
        },
      });
    } else {
      console.log(this.recipeForm.errors);
      this.announcer.announce('Por favor completa los campos requeridos');
    }
  }
}
