import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { AuthDialogStateService } from '../../services/auth-dialog-state.service';
@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    UserMenuComponent,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private authDialogStateService = inject(AuthDialogStateService);
  user$ = this.authService.user$;

  openDialog() {
    this.authDialogStateService.openAuthDialog();
  }
}
