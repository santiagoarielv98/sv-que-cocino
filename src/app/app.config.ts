import type { ApplicationConfig } from '@angular/core';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { authInterceptor } from './auth.interceptor';

/**
 * Configura Firebase con emuladores si está en modo desarrollo
 */
function configureFirebase() {
  return provideFirebaseApp(() => {
    const app = initializeApp(environment.firebaseConfig);
    if (environment.useEmulators) {
      connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
    }
    return app;
  });
}

/**
 * Configura el servicio de autenticación
 */
function configureAuth() {
  return provideAuth(() => {
    const auth = getAuth();
    if (environment.useEmulators) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    return auth;
  });
}

/**
 * Configuración global de la aplicación
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideExperimentalZonelessChangeDetection(),
    configureFirebase(),
    configureAuth(),
    provideFirestore(() => getFirestore()),
  ],
};
