export const DIFFICULTY_LEVELS = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
} as const;

/**
 * Tipos de restricciones dietéticas predefinidas
 */
export const DIETARY_RESTRICTIONS = {
  GLUTEN_FREE: 'Sin TACC',
  VEGAN: 'Vegano',
  VEGETARIAN: 'Vegetariano',
  LACTOSE_FREE: 'Sin lactosa',
  NUT_FREE: 'Sin frutos secos',
} as const;

export type DietaryRestrictionType = typeof DIETARY_RESTRICTIONS[keyof typeof DIETARY_RESTRICTIONS];
