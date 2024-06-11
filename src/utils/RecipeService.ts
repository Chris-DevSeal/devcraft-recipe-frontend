import { Ingredient, Recipe } from "@prisma/client";
import prismaClient from "./prisma";
import { RecipeWithIngredients } from "./types";

class RecipeService {
  async loadRecipes(page: number = 1, pageSize: number = 10) {
    const recipes = await prismaClient.recipe.findMany({
      include: { ingredients: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return recipes;
  }

  async loadRecipeById(id: number): Promise<RecipeWithIngredients | null> {
    const recipe = await prismaClient.recipe.findFirst({
      where: { id: id },
      include: { ingredients: true },
    });
    return recipe;
  }

  async createRecipe(
    name: string,
    steps: string,
    ingredients: Ingredient[]
  ): Promise<Recipe> {
    try {
      const newRecipe = await prismaClient.recipe.create({
        data: {
          name,
          steps,
          ingredients: {
            create: ingredients,
          },
        },
        include: {
          ingredients: true,
        },
      });
      return newRecipe;
    } catch (error) {
      console.error("Error in createRecipe:", error); // Debugging
      throw error;
    }
  }

  async deleteRecipeById(id: number) {
    return await prismaClient.recipe.delete({
      where: { id: id },
      include: { ingredients: true },
    });
  }
}

const recipeService = new RecipeService();
export default recipeService;
