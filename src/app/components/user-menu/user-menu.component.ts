import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './user-menu.component.html',
  styles: ``,
})
export class UserMenuComponent {
  protected authService = inject(AuthService);
}
