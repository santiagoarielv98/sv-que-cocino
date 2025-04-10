import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// Custom validator for password matching
function passwordMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register-form',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './register-form.component.html',
  styles: `
    .register-container {
      padding: 0 16px;
    }

    .full-width {
      width: 100%;
    }

    .form-field {
      margin-bottom: 16px;
    }

    .register-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
    }

    .visibility-icon {
      cursor: pointer;
    }
  `,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  hidePassword = true;
  hideConfirmPassword = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Register form submitted:', this.registerForm.value);
      // Here you would typically call a registration service
      alert('Cuenta creada para: ' + this.registerForm.value.email);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.registerForm.markAllAsTouched();
    }
  }
}
