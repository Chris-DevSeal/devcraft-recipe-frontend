import recipeService from "@/utils/RecipeService";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id) || id < 1) {
    return NextResponse.json(
      { error: `${id} is not a valid recipe id` },
      { status: 400 }
    );
  }
  const recipe = await recipeService.loadRecipeById(id);
  if (!recipe) {
    return NextResponse.json(
      { error: `Recipe with id ${id} could not be found` },
      { status: 404 }
    );
  }
  return NextResponse.json(recipe, { status: 200 });
}
