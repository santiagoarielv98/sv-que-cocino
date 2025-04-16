export interface Recipe {
  id?: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  ingredients: string[];
  steps: string[];
  restrictions: string[];
  tags: string[];
  image?: string;
}
