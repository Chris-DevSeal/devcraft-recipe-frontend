import recipeService from "@/utils/RecipeService";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const page = parseInt(queryParams.get("page")!);
  const pageSize = parseInt(queryParams.get("page-size")!);
  const recipes = await recipeService.loadRecipes(page, pageSize);
  return Response.json(recipes);
}
