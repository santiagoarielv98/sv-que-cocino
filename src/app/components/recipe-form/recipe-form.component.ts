import { Component, inject, signal } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  styles: `
    .recipe-form-card {
      overflow: hidden;
    }
    .full-width {
      width: 100%;
    }

    .row {
      display: flex;
      flex-direction: row;
    }

    .col {
      flex: 1;
      margin-right: 20px;
    }

    .col:last-child {
      margin-right: 0;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      margin: 15px 0;
      align-items: flex-start;
    }
  `,
})
export class RecipeFormComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    recipeInput: [null, Validators.required],
    recipeType: ['idea', Validators.required],
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
    this.addressForm.reset({
      recipeInput: null,
      recipeType: 'idea',
    });

    this.customRestrictions.set([]);

    this.selectedRestrictions.setValue([]);

    this.announcer.announce('Formulario reiniciado');
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.addressForm.disable();
      this.isLoading.set(true);
      this.announcer.announce('Generando receta, por favor espere...');

      setTimeout(() => {
        this.addressForm.enable();
        this.isLoading.set(false);
        this.announcer.announce('¡Receta generada!');
      }, 1000);
    } else {
      this.announcer.announce('Por favor completa los campos requeridos');
    }
  }
}
