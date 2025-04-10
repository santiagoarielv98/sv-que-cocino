import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule],
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
  authservice = inject(AuthService);
}
