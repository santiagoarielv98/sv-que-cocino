import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function ingredientValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value || value.trim() === '') {
      return { required: true };
    }
    const ingredients = value.split(',').map((ingredient) => ingredient.trim());
    if (ingredients.length === 0) {
      return { required: true };
    }

    return null;
  };
}
