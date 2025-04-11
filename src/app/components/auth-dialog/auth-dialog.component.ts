import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-auth-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css'],
})
export class AuthDialogComponent {}
