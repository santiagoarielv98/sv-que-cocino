import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
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
  styles: `
    .toolbar-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      width: 100%;
      align-items: center;
    }
    .toolbar-spacer {
      flex: 1 1 auto;
    }
  `,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user$ = this.authService.user$;
}
