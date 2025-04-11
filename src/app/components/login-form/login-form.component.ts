import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { FirebaseErrorUtil } from '../../utils/firebase-error.util';
import { demoCredentials } from '../../constants/credentials';

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
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: [demoCredentials.email, [Validators.required, Validators.email]],
    password: [
      demoCredentials.password,
      [Validators.required, Validators.minLength(6)],
    ],
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
        if (!FirebaseErrorUtil.handleAuthError(error, this.loginForm)) {
          console.error('Unhandled error during login:', error);
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
