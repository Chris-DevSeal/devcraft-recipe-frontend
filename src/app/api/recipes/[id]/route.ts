import { NextRequest, NextResponse } from 'next/server';
import recipeService from '@/utils/RecipeService';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const recipe = await recipeService.loadRecipeById(parseInt(id));

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error loading recipe:", error);  
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
