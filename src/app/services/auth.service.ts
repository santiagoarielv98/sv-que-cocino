import { inject, Injectable } from '@angular/core';
import type { User } from '@angular/fire/auth';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import type { Observable } from 'rxjs';

/**
 * Servicio responsable de la autenticación de usuarios
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly googleProvider = new GoogleAuthProvider();

  /**
   * Observable del usuario autenticado actual
   */
  readonly user$: Observable<User | null> = user(this.auth);

  /**
   * Iniciar sesión con email y contraseña
   * @throws Error si las credenciales son inválidas
   */
  async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Iniciar sesión con Google
   * @throws Error si la autenticación con Google falla
   */
  async loginWithGoogle(): Promise<void> {
    await signInWithPopup(this.auth, this.googleProvider);
  }

  /**
   * Registrar un nuevo usuario con email y contraseña
   * @throws Error si el registro falla
   */
  async registerWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Cerrar sesión del usuario actual
   */
  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
