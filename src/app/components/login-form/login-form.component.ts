import { Component, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AuthErrorCodes } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

const initialEmail = 'demo@example.com';
const initialPassword = 'password2';

@Component({
  selector: 'app-login-form',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login-form.component.html',
  styles: `
    .login-container {
      margin-top: 16px;
      padding: 0 16px;
    }

    .full-width {
      width: 100%;
    }

    .form-field {
      margin-bottom: 16px;
    }

    .login-actions {
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
export class LoginFormComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: [initialEmail, [Validators.required, Validators.email]],
    password: [initialPassword, [Validators.required, Validators.minLength(6)]],
  });

  hidePassword = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(
          this.loginForm.value.email as string,
          this.loginForm.value.password as string,
        );
      } catch (error) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
              this.loginForm.setErrors({
                invalidLogin: true,
              });
              break;
            case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
              this.loginForm.setErrors({
                tooManyAttempts: true,
              });
              break;
            default:
              console.log('Login error:', error.code);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
