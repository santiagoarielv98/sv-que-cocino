import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleAiService } from './services/google-ai.service';
import { CommonModule } from '@angular/common';

interface Recipe {
  title: string;
  description: string;
  servings: number;
  prep_time_minutes: number;
  cook_time_minutes: number;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  tags: string[];
}

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private googleAiService = inject(GoogleAiService);
  recipe: Recipe | null = null;
  ingredients = '';
  restrictions = '';
  loading = false;
  error = '';

  async generateRecipe() {
    this.loading = true;

    const prompt = `You are a smart cooking assistant. Based on the list of ingredients and dietary restrictions provided by the user, generate a recipe that uses those ingredients and follows those restrictions. The output should be in the same language as the input.

Respond only in the following JSON format:

{
  "title": "Recipe name",
  "description": "Short description of the recipe",
  "servings": Number of servings,
  "prep_time_minutes": Preparation time in minutes,
  "cook_time_minutes": Cooking time in minutes,
  "ingredients": [
    {
      "name": "Ingredient name",
      "quantity": "Amount with unit"
    }
  ],
  "instructions": [
    "Step 1...",
    "Step 2...",
    ...
  ],
  "tags": ["tag1", "tag2", "tag3"]
}

Input:
Ingredients: ${this.ingredients}
Restrictions: ${this.restrictions}
`;
    try {
      const text = await this.googleAiService.generateContent(prompt);
      this.recipe = JSON.parse(text) as Recipe;

      this.error = '';
    } catch (error) {
      console.error('Error generating text:', error);
      this.error = 'Error generating text: ' + error;
      this.recipe = null;
    } finally {
      this.loading = false;
    }
  }
}
