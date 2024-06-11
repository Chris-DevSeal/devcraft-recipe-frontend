import recipeService from "@/utils/RecipeService";
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

export async function DELETE(
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
  if (!(await recipeService.loadRecipeById(id))) {
    return NextResponse.json(
      { error: `Recipe with id ${id} could not be found` },
      { status: 404 }
    );
  }
  const recipe = await recipeService.deleteRecipeById(id);
  return NextResponse.json(recipe, { status: 200 });
}
