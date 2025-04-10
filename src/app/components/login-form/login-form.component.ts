import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  hidePassword = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      // Here you would typically call an authentication service
      alert('Iniciar sesión con: ' + this.loginForm.value.email);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
    }
  }
}
