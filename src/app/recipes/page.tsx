"use client";
import RecipeForm from "@/components/RecipeForm";
import { api } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([
    {
      name: "Banana Bread",
      ingredients: [{ name: "Bananas", amount: 6, units: "individual" }],
      steps: ["Smush bananas", "2. Eat bread"],
    },
    {
      name: "Banana Bread",
      ingredients: [{ name: "Bananas", amount: 6, units: "individual" }],
      steps: ["Smush bananas", "2. Eat bread"],
    },
    {
      name: "Banana Bread",
      ingredients: [{ name: "Bananas", amount: 6, units: "individual" }],
      steps: ["Smush bananas", "2. Eat bread"],
    },
  ]);
  const loadData = () => {
    fetch(`${api}/recipes`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  };
  let saveData = (data) => {
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
  // useEffect(() => {
  //   loadData();
  // }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={`mb-3 text-2xl font-semibold`}>Look at these recipes!</h1>
      <RecipeForm onSubmit={saveData} />
      <ul class="list-disc list-inside">
        {recipes.map((recipe, index) => {
          return (
            <li key={index}>
              <span class="bold">{recipe.name}</span>
              <ul class="list-disc list-inside pl-4">
                {recipe.ingredients.map((ingredient, ingredientIndex) => {
                  return (
                    <li key={ingredientIndex}>
                      <span class="font-bold">{ingredient.name}</span>:{" "}
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
