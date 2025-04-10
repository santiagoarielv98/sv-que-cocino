import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  user,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private googleProvider = new GoogleAuthProvider();
  user$ = user(this.auth);

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await signInWithPopup(this.auth, this.googleProvider);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }
}
