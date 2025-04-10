import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { AuthService } from './services/auth.service';

@Component({
  imports: [NavbarComponent, RecipeFormComponent, RecipeListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: `
    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 0 20px;
    }
  `,
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (!user) {
        this.dialog.open(AuthDialogComponent, {
          maxWidth: '420px',
          width: '100%',
          autoFocus: true,
          disableClose: true,
        });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
