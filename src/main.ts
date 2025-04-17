import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Punto de entrada principal de la aplicación
 * Inicializa el componente raíz con la configuración definida
 */
bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error('Error durante la inicialización de la aplicación:', err);
});
