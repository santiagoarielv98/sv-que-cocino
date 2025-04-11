import { FirebaseError } from '@angular/fire/app';
import { AuthErrorCodes } from '@angular/fire/auth';
import type { FormGroup } from '@angular/forms';

export class FirebaseErrorUtil {
  static handleAuthError(error: unknown, form: FormGroup): boolean {
    if (!(error instanceof FirebaseError)) return false;

    switch (error.code) {
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        form.setErrors({ invalidLogin: true });
        return true;

      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        form.setErrors({ tooManyAttempts: true });
        return true;

      case AuthErrorCodes.EMAIL_EXISTS:
        form.get('email')?.setErrors({ emailExists: true });
        return true;

      case AuthErrorCodes.WEAK_PASSWORD:
        form.get('password')?.setErrors({ weakPassword: true });
        return true;

      default:
        console.error('Firebase error:', error.code);
        return false;
    }
  }
}
