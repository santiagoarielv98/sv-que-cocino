import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  difficulty: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  dietaryRestrictions: string[];
}

@Component({
  selector: 'app-recipe-list',
  imports: [MatListModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styles: `
    .recipe-list-header {
      margin-bottom: 24px;
    }

    .recipe-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin: 0 auto;
    }

    .no-recipes {
      text-align: center;
      padding: 32px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
  `,
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [
    {
      id: 1,
      title: 'Pasta Carbonara',
      description:
        'Una deliciosa pasta italiana con huevo, queso parmesano, panceta y pimienta negra.',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      ingredients: ['Pasta', 'Huevo', 'Panceta'],
      difficulty: 'Media',
      prepTime: '15 min',
      cookTime: '10 min',
      servings: 4,
      dietaryRestrictions: ['Sin TACC', 'Vegetariano'],
    },
    {
      id: 2,
      title: 'Risotto de Hongos',
      description:
        'Un cremoso risotto con hongos frescos, cebolla, vino blanco y queso parmesano.',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      ingredients: ['Arroz Arborio', 'Hongos', 'Cebolla'],
      difficulty: 'Alta',
      prepTime: '20 min',
      cookTime: '30 min',
      servings: 2,
      dietaryRestrictions: ['Vegetariano'],
    },
    {
      id: 3,
      title: 'Ensalada César',
      description:
        'La clásica ensalada César con lechuga romana, crutones, aderezo César y queso parmesano.',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      ingredients: ['Lechuga romana', 'Crutones', 'Queso parmesano'],
      difficulty: 'Baja',
      prepTime: '10 min',
      cookTime: '0 min',
      servings: 2,
      dietaryRestrictions: ['Vegetariano'],
    },
  ];
}
