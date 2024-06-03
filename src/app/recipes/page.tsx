"use client";
import RecipeForm from "@/components/RecipeForm";
import { api } from "@/utils/api";
import { Recipe } from "@prisma/client";
import { pages } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const searchParams = useSearchParams();
  const loadData = () => {
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page-size") || "10";

    fetch(`${api}/recipes?page=${page}&page-size=${pageSize}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  };
  let saveData = (data: {
    name: string;
    ingredients: { name: string; amount: number; units: string }[];
    steps: string[];
  }) => {
    // Uncomment this to activate API access:
    // fetch(`${api}/recipes`, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // }).then((response) => loadData());

    // Comment the following line to enable API access
    setRecipes((currentRecipes) => [...currentRecipes, data]);
  };

  // Uncomment this to activate API access:
  // load data on start
  useEffect(() => {
    loadData();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={`mb-3 text-2xl font-semibold`}>Look at these recipes!</h1>
      <RecipeForm onSubmit={saveData} />
      <ul className="list-disc list-inside">
        {recipes &&
          recipes.map((recipe, index) => {
            return (
              <li key={index}>
                <span className="bold">{recipe.name}</span>
                <ul className="list-disc list-inside pl-4">
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, ingredientIndex) => {
                      return (
                        <li key={ingredientIndex}>
                          <span className="font-bold">{ingredient.name}</span>:{" "}
                          {ingredient.amount} {ingredient.units}
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
