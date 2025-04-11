import { DIFFICULTY_LEVELS } from '../constants/app';

export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;

export const getDifficultyLabel = (
  value: string,
  defaultValue: DifficultyLevel = 'medium',
) =>
  DIFFICULTY_LEVELS[value as DifficultyLevel] ||
  DIFFICULTY_LEVELS[defaultValue];
