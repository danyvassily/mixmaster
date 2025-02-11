import { z } from 'zod';

export const CocktailSchema = z.object({
  name: z.string().min(1, "Le nom du cocktail est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  isAlcoholic: z.boolean(),
  image: z.string().optional(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Le nom de l'ingrédient est requis"),
      quantity: z.string().optional(),
      unit: z.string().optional(),
    })
  ).min(1, "Au moins un ingrédient est requis"),
  glassType: z.string().optional(),
});

export type CocktailType = z.infer<typeof CocktailSchema>;

export const ingredientSchema = z.object({
  name: z.string().min(2, 'Le nom de l\'ingrédient doit contenir au moins 2 caractères'),
  quantity: z.string().min(1, 'La quantité est requise'),
  unit: z.string().min(1, 'L\'unité est requise')
});

export const cocktailSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
  ingredients: z.array(ingredientSchema)
    .min(1, 'Au moins un ingrédient est requis'),
  instructions: z.string()
    .min(10, 'Les instructions doivent contenir au moins 10 caractères'),
  category: z.string()
    .min(2, 'La catégorie est requise'),
  image: z.string().url('L\'URL de l\'image n\'est pas valide').optional(),
  isCustom: z.boolean().default(false),
  description: z.string().optional(),
  glassType: z.string().optional(),
  isAlcoholic: z.boolean().default(true),
  youtube: z.object({
    videoId: z.string(),
    title: z.string(),
    thumbnailUrl: z.string().url()
  }).optional()
});

export type CocktailFormData = z.infer<typeof cocktailSchema>;

export const cocktailValidationMessages = {
  required: 'Ce champ est requis',
  minLength: (min: number) => `Ce champ doit contenir au moins ${min} caractères`,
  maxLength: (max: number) => `Ce champ ne doit pas dépasser ${max} caractères`,
  url: 'Veuillez entrer une URL valide',
  ingredients: {
    min: 'Au moins un ingrédient est requis'
  }
}; 