import { AfterViewInit, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
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
export class AppComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);

  ngAfterViewInit(): void {
    this.dialog.open(AuthDialogComponent, {
      maxWidth: '420px',
      width: '100%',
      autoFocus: true,
      disableClose: true,
    });
  }
}
