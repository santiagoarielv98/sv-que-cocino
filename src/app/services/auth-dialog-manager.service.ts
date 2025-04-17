import { inject, Injectable } from '@angular/core';
import type { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthDialogComponent } from '../components/auth-dialog/auth-dialog.component';
import { AuthService } from './auth.service';

/**
 * Servicio responsable de gestionar el diálogo de autenticación
 */
@Injectable({
  providedIn: 'root',
})
export class AuthDialogManager {
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private isAuthenticated = false;
  private dialogRef: MatDialogRef<AuthDialogComponent> | null = null;

  constructor() {
    this.subscribeToAuthChanges();
  }

  /**
   * Abre el diálogo de autenticación si el usuario no está autenticado
   */
  openAuthDialog(): void {
    if (this.isAuthenticated || this.dialogRef) {
      return;
    }

    this.dialogRef = this.dialog.open(AuthDialogComponent, {
      maxWidth: '420px',
      width: '100%',
      autoFocus: true,
    });
  }

  /**
   * Cierra el diálogo de autenticación
   */
  closeAuthDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  /**
   * Se suscribe a los cambios en el estado de autenticación
   */
  private subscribeToAuthChanges(): void {
    this.authService.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.isAuthenticated = !!user;

      if (user) {
        this.closeAuthDialog();
      } else {
        this.openAuthDialog();
      }
    });
  }
}
