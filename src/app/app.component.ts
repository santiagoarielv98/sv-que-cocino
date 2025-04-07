import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
interface Recipe {
  id?: string;
  ingredients: string[];
  title: string;
  description: string;
  instructions: string[];
  restrictions?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  image?: string;
  tags?: string[];
}
@Component({
  imports: [FormsModule, CommonModule, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private firestore = inject(Firestore);
  private http = inject(HttpClient);
  private recipeCollection = collection(this.firestore, 'recipes');

  searchTerm = '';
  isDisabled = false;

  onSubmit() {
    console.log('Form submitted with search term:', this.searchTerm);
    const ingredients = this.searchTerm
      .split(',')
      .map((ingredient) => ingredient.trim());
    // Add your form submission logic here
    this.http
      .post(environment.apiUrl, {
        ingredients,
      })
      .subscribe((response) => {
        console.log('Response from server:', response);
        this.isDisabled = true;
      });
  }

  recipes$ = collectionData(this.recipeCollection, {
    idField: 'id',
  }) as Observable<Recipe[]>;
}
