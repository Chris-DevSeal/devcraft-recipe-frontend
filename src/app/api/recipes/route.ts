import recipeService from "@/utils/RecipeService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const page = parseInt(queryParams.get("page")!);
  const pageSize = parseInt(queryParams.get("page-size")!);
  let recipes;
  if (isNaN(page) || isNaN(pageSize)) {
    recipes = await recipeService.loadRecipes();
  } else {
    recipes = await recipeService.loadRecipes(page, pageSize);
  }
  return Response.json(recipes);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, steps, ingredients } = data;

    if (!name || !steps || !Array.isArray(ingredients)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const newRecipe = await recipeService.createRecipe(
      name,
      steps,
      ingredients
    );

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
