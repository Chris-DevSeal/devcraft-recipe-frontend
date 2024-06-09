import { Recipe } from "@prisma/client";
import prismaClient from "./prisma";

class RecipeService {
  async loadRecipes(page: number = 1, pageSize: number = 10) {
    const recipes = await prismaClient.recipe.findMany({
      include: { ingredients: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return recipes;
  }

 async loadRecipeById(id: number): Promise<Recipe | null> {
    const recipe = await prismaClient.recipe.findUnique({
      where: { id: id },
      include: { ingredients: true },
    });

    return recipe;
  }
}

const recipeService = new RecipeService();
export default recipeService;
