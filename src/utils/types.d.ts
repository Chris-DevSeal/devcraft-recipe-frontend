import { Ingredient } from "@prisma/client";
import { Recipe } from "@prisma/client";

export type RecipeWithIngredients = Recipe & {
  ingredients: Ingredient[];
};
