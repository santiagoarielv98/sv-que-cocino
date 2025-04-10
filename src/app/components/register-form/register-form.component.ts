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
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { AuthErrorCodes } from '@angular/fire/auth';

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
      margin-top: 16px;
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
  private authService = inject(AuthService);
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
      try {
        this.authService.register(
          this.registerForm.value.email as string,
          this.registerForm.value.password as string,
        );
      } catch (error) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case AuthErrorCodes.EMAIL_EXISTS:
              this.registerForm.get('email')?.setErrors({ emailExists: true });
              break;
            case AuthErrorCodes.WEAK_PASSWORD:
              this.registerForm
                .get('password')
                ?.setErrors({ weakPassword: true });
              break;
            default:
              console.error('Registration error:', error.code);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
