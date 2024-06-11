"use client";
import RecipeForm from "@/components/RecipeForm";
import { api } from "@/utils/api";
import prismaClient from "@/utils/prisma";
import { RecipeWithIngredients } from "@/utils/types";
import { Recipe } from "@prisma/client";

import { pages } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function RecipePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Recipes />
    </Suspense>
  );
}

function Recipes() {
  const [recipes, setRecipes] = useState<RecipeWithIngredients[]>([]);
  const searchParams = useSearchParams();

  const loadData = useCallback(() => {
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page-size") || "10";

    fetch(`${api}/recipes?page=${page}&page-size=${pageSize}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, [searchParams]);
  const saveData = async (data: RecipeWithIngredients) => {
    // Uncomment this to activate API access:
    const res = await fetch(`${api}/recipes`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 201) {
      return;
    }
    const newRecipe = (await res.json()) as RecipeWithIngredients;

    // Comment the following line to enable API access
    setRecipes((currentRecipes) => [...currentRecipes, newRecipe]);
  };

  const deleteRecipe = async (id: number) => {
    const res = await fetch(`${api}/recipes/${id}`, { method: "Delete" });
    if (res.status !== 200) {
      throw Error(`Couldnt delete recipe ${id}`);
    }
    loadData();
  };
  // Uncomment this to activate API access:
  // load data on start
  useEffect(() => {
    loadData();
  }, [loadData]);
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
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
