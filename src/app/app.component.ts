import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  user,
} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Recipe {
  tags: string[];
  cookTime: number;
  imageGeneratedAt: AtedAt;
  imageUrl: string;
  prepTime: number;
  servings: number;
  userId: string;
  difficulty: string;
  name: string;
  imageGenerationAttempts: number;
  restrictions: string[];
  ingredients: string[];
  createdAt: AtedAt;
  id?: string;
  updatedAt: AtedAt;
  instructions: string[];
  nutrition: Nutrition;
  description: string;
}

export interface AtedAt {
  seconds: number;
  nanoseconds: number;
}

export interface Nutrition {
  calories: number;
  protein: number;
  sugar?: number;
  fat?: number;
  carbs?: number;
  fiber?: number;
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
  private auth = inject(Auth);
  private recipeCollection = collection(this.firestore, 'recipes');
  private provider = new GoogleAuthProvider();
  user$ = user(this.auth);

  searchTerm = '';
  isDisabled = false;

  async onSubmit() {
    const token = await this.auth.currentUser?.getIdToken();
    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    const ingredients = this.searchTerm
      .split(',')
      .map((ingredient) => ingredient.trim());
    this.http
      .post(
        `${environment.apiUrl}/recipes`,
        {
          ingredients,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .subscribe((response) => {
        console.log('Response from server:', response);
        this.isDisabled = true;
      });
  }

  recipes$ = collectionData(this.recipeCollection, {
    idField: 'id',
  }) as Observable<Recipe[]>;

  login() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  }
}
