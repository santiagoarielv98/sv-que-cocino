import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../components/auth-dialog/auth-dialog.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthDialogService {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private isAuthenticated = false;

  constructor() {
    this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (user) {
        this.closeAuthDialog();
      } else {
        this.openAuthDialog();
      }
    });
  }

  openAuthDialog() {
    if (this.isAuthenticated) {
      return;
    }
    this.dialog.open(AuthDialogComponent, {
      maxWidth: '420px',
      width: '100%',
      autoFocus: true,
    });
  }

  closeAuthDialog() {
    this.dialog.closeAll();
  }
}
